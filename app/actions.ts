"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { queueBoardingPassEmailIfReady } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { ensureTicketNumberStorage } from "@/lib/tickets";

const platformFeeRate = 0.15;
const adminFallbackPriceCents = 5000;

function requiredString(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string" || !value.trim()) throw new Error(`${key} is required.`);
  return value.trim();
}

function optionalString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function integerFromForm(formData: FormData, key: string, fallback = 0) {
  const value = formData.get(key);
  if (typeof value !== "string" || !value.trim()) return fallback;
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 0) throw new Error(`${key} must be a positive number.`);
  return parsed;
}

function amounts(basePriceCents: number, passengers: number) {
  const totalAmountCents = basePriceCents * passengers;
  const marketplaceFeeCents = Math.round(totalAmountCents * platformFeeRate);
  const operatorPayoutCents = totalAmountCents - marketplaceFeeCents;
  return { totalAmountCents, marketplaceFeeCents, operatorPayoutCents, platformRevenueCents: marketplaceFeeCents };
}

function hoursUntil(value: Date) {
  return (value.getTime() - Date.now()) / 36e5;
}

function policyWindow(value: Date) {
  const hours = hoursUntil(value);
  return {
    hours,
    fullModificationAllowed: hours >= 6,
    limitedModificationAllowed: hours >= 4,
    freeCancellationAllowed: hours >= 24,
    creditCancellationAllowed: hours >= 6 && hours < 24,
    locked: hours < 4,
  };
}

function eventValue(value: unknown) {
  return JSON.stringify(value);
}

async function getMvpCustomer() {
  return prisma.customerProfile.findFirstOrThrow({
    where: { user: { email: "customer@shuttleflow.local" } },
    include: { user: true },
  });
}

async function getMvpOperator() {
  return prisma.operatorProfile.findFirstOrThrow({
    where: { status: "VERIFIED" },
    include: { user: true },
    orderBy: { createdAt: "asc" },
  });
}

export async function createBookingAction(formData: FormData) {
  await ensureTicketNumberStorage();

  const routeId = requiredString(formData, "routeId");
  const departureId = requiredString(formData, "departureId");
  const fareType = requiredString(formData, "fareType");
  const travelDate = requiredString(formData, "travelDate");
  const passengerCount = Math.max(integerFromForm(formData, "passengerCount", 1), 1);
  const luggageCount = integerFromForm(formData, "luggageCount", 0);
  const childSeats = integerFromForm(formData, "childSeats", 0);
  const leadPassengerName = requiredString(formData, "leadPassengerName");
  const leadPassengerEmail = requiredString(formData, "leadPassengerEmail");
  const leadPassengerPhone = requiredString(formData, "leadPassengerPhone");
  const flightNumber = optionalString(formData, "flightNumber");
  const cruiseNumber = optionalString(formData, "cruiseNumber");
  const specialNotes = optionalString(formData, "specialNotes");

  if (fareType !== "STANDARD" && fareType !== "FLEX") throw new Error("Invalid fare type.");

  const route = await prisma.route.findFirst({
    where: { id: routeId, active: true },
    include: {
      departures: { where: { id: departureId, active: true } },
      operatorRoutes: { where: { enabled: true, operator: { status: "VERIFIED" } }, include: { operator: true }, take: 1 },
      pricingRules: { where: { fareType, active: true } },
    },
  });
  if (!route) redirect("/customer");

  const departure = route.departures[0];
  const enabledOperator = route.operatorRoutes[0]?.operator;
  if (!departure) redirect(`/customer/routes/${route.id}?travelDate=${encodeURIComponent(travelDate)}&passengerCount=${passengerCount}`);
  if (!enabledOperator) throw new Error("No verified operator is enabled for this route.");
  if (!sameCalendarDay(departure.departureAt, new Date(`${travelDate}T00:00:00`))) {
    throw new Error("Selected departure must match the selected travel date.");
  }
  if (departure.seatsBooked + passengerCount > departure.seatsTotal) throw new Error("Not enough seats remain on this scheduled departure.");

  const customer = await getMvpCustomer();
  const resolvedPrice = resolvePrice(route, enabledOperator.id, fareType);
  const paymentAmounts = amounts(resolvedPrice.basePriceCents, passengerCount);

  const booking = await prisma.$transaction(async (tx) => {
    const createdBooking = await tx.booking.create({
      data: {
        customerId: customer.id,
        operatorId: enabledOperator.id,
        routeId: route.id,
        departureId: departure.id,
        fareType,
        priceSource: resolvedPrice.priceSource,
        scheduledPickupTime: departure.departureAt,
        estimatedArrivalWindow: windowForDeparture(departure.departureAt),
        leadPassengerName,
        leadPassengerEmail,
        leadPassengerPhone,
        passengerCount,
        luggageCount,
        flightNumber,
        cruiseNumber,
        childSeats,
        specialNotes,
        travelDetails: [flightNumber && `Flight ${flightNumber}`, cruiseNumber && `Cruise ${cruiseNumber}`, specialNotes].filter(Boolean).join(" / ") || null,
        bookingSource: "MARKETPLACE",
        bookingStatus: "REQUESTED",
        ...paymentAmounts,
        passengers: { create: passengerRecords(passengerCount, leadPassengerName) },
        payments: {
          create: {
            amountCents: paymentAmounts.totalAmountCents,
            marketplaceFeeCents: paymentAmounts.marketplaceFeeCents,
            operatorPayoutCents: paymentAmounts.operatorPayoutCents,
            platformRevenueCents: paymentAmounts.platformRevenueCents,
            status: "PENDING",
            provider: "placeholder",
          },
        },
      },
    });

    await tx.routeDeparture.update({ where: { id: departure.id }, data: { seatsBooked: { increment: passengerCount } } });
    await tx.bookingMessage.create({
      data: {
        senderId: enabledOperator.userId,
        receiverId: customer.userId,
        bookingId: createdBooking.id,
        message: "Booking request received. The operator will accept or decline it from ShuttleFlow.",
        messageType: "SYSTEM",
      },
    });

    return createdBooking;
  });

  redirect(`/customer/bookings/${booking.id}/payment`);
}

export async function acceptBookingAction(formData: FormData) {
  const bookingId = requiredString(formData, "bookingId");
  const operator = await getMvpOperator();
  const booking = await prisma.booking.findFirstOrThrow({ where: { id: bookingId }, include: { route: { include: { operatorRoutes: true } } } });
  const canOperateRoute = booking.route.operatorRoutes.some((operatorRoute) => operatorRoute.operatorId === operator.id && operatorRoute.enabled);
  if (!canOperateRoute) throw new Error("Operator can only accept bookings for enabled routes.");
  await prisma.booking.update({ where: { id: booking.id }, data: { bookingStatus: "ACCEPTED" } });
  revalidatePath("/operator");
  revalidatePath(`/customer/bookings/${booking.id}`);
}

export async function declineBookingAction(formData: FormData) {
  const bookingId = requiredString(formData, "bookingId");
  const operator = await getMvpOperator();
  const booking = await prisma.booking.findFirstOrThrow({ where: { id: bookingId, operatorId: operator.id } });
  await prisma.booking.update({ where: { id: booking.id }, data: { bookingStatus: "DECLINED" } });
  revalidatePath("/operator");
  revalidatePath(`/customer/bookings/${booking.id}`);
}

export async function cancelCustomerBookingAction(formData: FormData) {
  const bookingId = requiredString(formData, "bookingId");
  const cancellationReason = optionalString(formData, "cancellationReason");
  const booking = await prisma.booking.findFirst({ where: { id: bookingId }, include: { passengers: true } });
  if (!booking) redirect("/customer");
  if (["CANCELLED", "CANCELLED_WITH_CREDIT", "NO_SHOW", "COMPLETED"].includes(booking.bookingStatus)) {
    redirect(`/customer/bookings/${booking.id}`);
  }

  const policy = policyWindow(booking.scheduledPickupTime);
  if (!policy.freeCancellationAllowed && !policy.creditCancellationAllowed) {
    throw new Error("This booking is now being prepared for departure.");
  }

  const status = policy.freeCancellationAllowed ? "CANCELLED" : "CANCELLED_WITH_CREDIT";
  const eventType = policy.freeCancellationAllowed ? "BOOKING_CANCELLED" : "BOOKING_CANCELLED_WITH_CREDIT";
  const refundEligibleAmountCents = policy.freeCancellationAllowed ? booking.totalAmountCents : 0;
  const creditAmountCents = policy.creditCancellationAllowed ? booking.totalAmountCents : 0;

  await prisma.$transaction(async (tx) => {
    await tx.booking.update({
      where: { id: booking.id },
      data: {
        bookingStatus: status,
        refundEligibleAmountCents,
        creditAmountCents,
        cancellationReason,
        cancelledAt: new Date(),
      },
    });
    await tx.bookingPassenger.updateMany({
      where: { bookingId: booking.id },
      data: { status: "CANCELLED" },
    });
    await tx.routeDeparture.update({
      where: { id: booking.departureId },
      data: { seatsBooked: { decrement: booking.passengerCount } },
    });
    await tx.bookingEvent.create({
      data: {
        bookingId: booking.id,
        eventType,
        oldValue: eventValue({ bookingStatus: booking.bookingStatus }),
        newValue: eventValue({ bookingStatus: status, refundEligibleAmountCents, creditAmountCents }),
        performedBy: "CUSTOMER",
      },
    });
  });

  revalidatePath(`/customer/bookings/${booking.id}`);
  redirect(`/customer/bookings/${booking.id}`);
}

export async function updateCustomerBookingDetailsAction(formData: FormData) {
  const bookingId = requiredString(formData, "bookingId");
  const routeId = optionalString(formData, "routeId");
  const departureId = optionalString(formData, "departureId");
  const passengerCount = Math.max(integerFromForm(formData, "passengerCount", 0), 0);
  const leadPassengerName = requiredString(formData, "leadPassengerName");
  const leadPassengerEmail = requiredString(formData, "leadPassengerEmail");
  const leadPassengerPhone = requiredString(formData, "leadPassengerPhone");
  const specialNotes = optionalString(formData, "specialNotes");

  const booking = await prisma.booking.findFirst({
    where: { id: bookingId },
    include: {
      passengers: { orderBy: { passengerNumber: "asc" } },
      route: { include: { origin: true, destination: true } },
    },
  });
  if (!booking) redirect("/customer");
  if (["CANCELLED", "CANCELLED_WITH_CREDIT", "NO_SHOW", "COMPLETED"].includes(booking.bookingStatus)) {
    throw new Error("This booking can no longer be modified.");
  }

  const policy = policyWindow(booking.scheduledPickupTime);
  if (policy.locked) {
    await prisma.bookingEvent.create({
      data: {
        bookingId: booking.id,
        eventType: "BOOKING_LOCKED",
        oldValue: eventValue({ bookingStatus: booking.bookingStatus }),
        newValue: eventValue({ locked: true }),
        performedBy: "CUSTOMER",
      },
    });
    throw new Error("Your ride is being prepared for departure. Changes are no longer available.");
  }

  const requestedPassengerCount = passengerCount || booking.passengerCount;
  const requestedDepartureId = departureId || booking.departureId;
  const fullChangeRequested =
    requestedPassengerCount !== booking.passengerCount ||
    requestedDepartureId !== booking.departureId ||
    (routeId ? routeId !== booking.routeId : false);

  if (fullChangeRequested && !policy.fullModificationAllowed) {
    throw new Error("Only passenger names, phone, email, and notes can be changed close to departure.");
  }

  await prisma.$transaction(async (tx) => {
    let newDeparture = null as Awaited<ReturnType<typeof tx.routeDeparture.findFirst>>;
    if (fullChangeRequested) {
      newDeparture = await tx.routeDeparture.findFirst({
        where: {
          id: requestedDepartureId,
          active: true,
          route: {
            active: true,
            origin: { cityId: booking.route.origin.cityId },
            destination: { cityId: booking.route.destination.cityId },
          },
        },
        include: { route: true },
      });
      if (!newDeparture) throw new Error("Selected departure is no longer available.");
      if (newDeparture.seatsBooked + requestedPassengerCount > newDeparture.seatsTotal) throw new Error("Not enough seats remain.");
    }

    if (newDeparture && newDeparture.id !== booking.departureId) {
      await tx.routeDeparture.update({ where: { id: booking.departureId }, data: { seatsBooked: { decrement: booking.passengerCount } } });
      await tx.routeDeparture.update({ where: { id: newDeparture.id }, data: { seatsBooked: { increment: requestedPassengerCount } } });
    } else if (requestedPassengerCount !== booking.passengerCount) {
      const seatDelta = requestedPassengerCount - booking.passengerCount;
      await tx.routeDeparture.update({ where: { id: booking.departureId }, data: { seatsBooked: { increment: seatDelta } } });
    }

    const updatedBooking = await tx.booking.update({
      where: { id: booking.id },
      data: {
        routeId: newDeparture?.routeId ?? booking.routeId,
        departureId: newDeparture?.id ?? booking.departureId,
        scheduledPickupTime: newDeparture?.departureAt ?? booking.scheduledPickupTime,
        leadPassengerName,
        leadPassengerEmail,
        leadPassengerPhone,
        passengerCount: requestedPassengerCount,
        specialNotes,
        modifiedAt: new Date(),
      },
    });

    for (const passenger of booking.passengers) {
      const value = passenger.passengerNumber === 1 ? leadPassengerName : formData.get(`passenger${passenger.passengerNumber}Name`);
      if (typeof value !== "string" || !value.trim()) continue;
      if (passenger.status === "CHECKED_IN" || passenger.status === "CANCELLED") continue;
      await tx.bookingPassenger.update({
        where: { id: passenger.id },
        data: { passengerName: value.trim(), status: "READY" },
      });
    }

    if (requestedPassengerCount > booking.passengers.length) {
      for (let index = booking.passengers.length + 1; index <= requestedPassengerCount; index += 1) {
        const value = formData.get(`passenger${index}Name`);
        await tx.bookingPassenger.create({
          data: {
            bookingId: booking.id,
            passengerNumber: index,
            passengerName: typeof value === "string" && value.trim() ? value.trim() : null,
            status: typeof value === "string" && value.trim() ? "READY" : "PENDING_NAME",
            qrCodeToken: `TEMP-${randomUUID()}`,
          },
        });
      }
    } else if (requestedPassengerCount < booking.passengers.length) {
      await tx.bookingPassenger.updateMany({
        where: { bookingId: booking.id, passengerNumber: { gt: requestedPassengerCount } },
        data: { status: "CANCELLED" },
      });
    }

    await tx.bookingEvent.create({
      data: {
        bookingId: booking.id,
        eventType: "BOOKING_MODIFIED",
        oldValue: eventValue({
          routeId: booking.routeId,
          departureId: booking.departureId,
          passengerCount: booking.passengerCount,
          leadPassengerName: booking.leadPassengerName,
          leadPassengerEmail: booking.leadPassengerEmail,
          leadPassengerPhone: booking.leadPassengerPhone,
          specialNotes: booking.specialNotes,
        }),
        newValue: eventValue({
          routeId: updatedBooking.routeId,
          departureId: updatedBooking.departureId,
          passengerCount: updatedBooking.passengerCount,
          leadPassengerName,
          leadPassengerEmail,
          leadPassengerPhone,
          specialNotes,
        }),
        performedBy: "CUSTOMER",
      },
    });
  });

  revalidatePath(`/customer/bookings/${booking.id}`);
  redirect(`/customer/bookings/${booking.id}`);
}

export async function updateOperatorBookingAction(formData: FormData) {
  const bookingId = requiredString(formData, "bookingId");
  const driverId = requiredString(formData, "driverId");
  const vehicleId = requiredString(formData, "vehicleId");
  const rideStatus = requiredString(formData, "rideStatus");
  const estimatedArrivalWindow = requiredString(formData, "estimatedArrivalWindow");
  const operator = await getMvpOperator();
  const booking = await prisma.booking.findFirstOrThrow({ where: { id: bookingId, operatorId: operator.id }, include: { customer: true } });
  const driver = await prisma.driverProfile.findFirstOrThrow({ where: { id: driverId, operatorId: operator.id } });
  const vehicle = await prisma.vehicle.findFirstOrThrow({ where: { id: vehicleId, operatorId: operator.id } });

  await prisma.booking.update({
    where: { id: booking.id },
    data: { assignedDriverId: driver.id, vehicleId: vehicle.id, rideStatus, estimatedArrivalWindow, bookingStatus: booking.bookingStatus === "REQUESTED" ? "ACCEPTED" : booking.bookingStatus },
  });
  const updatedBooking = await prisma.booking.findFirst({
    where: { id: booking.id },
    include: {
      route: { include: { origin: true, destination: true } },
      assignedDriver: { include: { user: true } },
      vehicle: true,
      passengers: { orderBy: { passengerNumber: "asc" } },
    },
  });
  if (updatedBooking) await queueBoardingPassEmailIfReady(updatedBooking);
  await prisma.bookingMessage.create({
    data: { senderId: operator.userId, receiverId: booking.customer.userId, bookingId: booking.id, message: `Ride status updated to ${rideStatus}.`, messageType: "SYSTEM" },
  });
  revalidatePath("/operator");
  revalidatePath(`/customer/bookings/${booking.id}`);
}

export async function sendBookingMessageAction(formData: FormData) {
  const bookingId = requiredString(formData, "bookingId");
  const message = requiredString(formData, "message");
  const recipient = requiredString(formData, "recipient");
  const senderRole = requiredString(formData, "senderRole");
  const messageType = (formData.get("messageType")?.toString() || "TEXT") as "TEXT" | "CALL_REQUEST" | "SMS_RELAY";
  if (!["TEXT", "CALL_REQUEST", "SMS_RELAY"].includes(messageType)) throw new Error("Invalid message type.");

  const booking = await prisma.booking.findFirstOrThrow({ where: { id: bookingId }, include: { customer: true, operator: true, assignedDriver: true } });
  const customerUserId = booking.customer.userId;
  const operatorUserId = booking.operator.userId;
  const driverUserId = booking.assignedDriver?.userId;
  const driverContactAllowed = Boolean(driverUserId && booking.rideStatus);

  let senderId = customerUserId;
  let receiverId = operatorUserId;
  if (senderRole === "OPERATOR") {
    senderId = operatorUserId;
    receiverId = recipient === "driver" && driverContactAllowed ? driverUserId! : customerUserId;
  } else if (recipient === "driver") {
    if (!driverContactAllowed) throw new Error("Customer can message assigned driver only after DRIVER_ASSIGNED.");
    receiverId = driverUserId!;
  }

  await prisma.bookingMessage.create({ data: { senderId, receiverId, bookingId: booking.id, message, messageType } });
  revalidatePath("/operator");
  revalidatePath(`/customer/bookings/${booking.id}`);
}

export async function changeBookingDepartureAction(formData: FormData) {
  const bookingId = requiredString(formData, "bookingId");
  const departureId = requiredString(formData, "departureId");
  const booking = await prisma.booking.findFirstOrThrow({ where: { id: bookingId }, include: { departure: true } });
  if (booking.fareType === "STANDARD") throw new Error("Standard fare cannot be changed unless an admin/operator permits it.");
  if (booking.flexChangeCount >= 2) throw new Error("Flex changes are limited to 2.");
  if ((booking.scheduledPickupTime.getTime() - Date.now()) / 36e5 < 12) throw new Error("Flex changes require at least 12 hours before pickup.");

  const newDeparture = await prisma.routeDeparture.findFirstOrThrow({ where: { id: departureId, routeId: booking.routeId, active: true } });
  const daysDifference = Math.abs(startOfDay(newDeparture.departureAt).getTime() - startOfDay(booking.scheduledPickupTime).getTime()) / 86400000;
  if (daysDifference > 1) throw new Error("Flex changes must stay on the same day or within plus/minus 1 day.");
  if (newDeparture.seatsBooked + booking.passengerCount > newDeparture.seatsTotal) throw new Error("Not enough seats remain on this scheduled departure.");

  await prisma.$transaction(async (tx) => {
    await tx.routeDeparture.update({ where: { id: booking.departureId }, data: { seatsBooked: { decrement: booking.passengerCount } } });
    await tx.routeDeparture.update({ where: { id: newDeparture.id }, data: { seatsBooked: { increment: booking.passengerCount } } });
    await tx.booking.update({
      where: { id: booking.id },
      data: { departureId: newDeparture.id, scheduledPickupTime: newDeparture.departureAt, estimatedArrivalWindow: windowForDeparture(newDeparture.departureAt), flexChangeCount: { increment: 1 } },
    });
    await tx.bookingChange.create({ data: { bookingId: booking.id, previousDepartureId: booking.departureId, newDepartureId: newDeparture.id, changedByRole: "CUSTOMER" } });
  });

  revalidatePath(`/customer/bookings/${booking.id}`);
}

export async function updatePassengerNameAction(formData: FormData) {
  const passengerId = requiredString(formData, "passengerId");
  const passengerName = requiredString(formData, "passengerName");
  const passenger = await prisma.bookingPassenger.findFirstOrThrow({ where: { id: passengerId } });
  if (passenger.status === "CHECKED_IN") throw new Error("Checked-in passengers cannot be edited without admin/operator override.");
  if (passenger.status === "CANCELLED") throw new Error("Cancelled passengers cannot be edited.");
  await prisma.bookingPassenger.update({ where: { id: passenger.id }, data: { passengerName, status: "READY" } });
  revalidatePath(`/customer/bookings/${passenger.bookingId}`);
  revalidatePath("/operator/boarding");
}

export async function passengerCheckInAction(formData: FormData) {
  const passengerId = requiredString(formData, "passengerId");
  const status = requiredString(formData, "status");
  const operator = await getMvpOperator();
  if (!["CHECKED_IN", "NO_SHOW"].includes(status)) throw new Error("Invalid boarding status.");
  const passenger = await prisma.bookingPassenger.findFirstOrThrow({
    where: { id: passengerId },
    include: { booking: { include: { route: { include: { operatorRoutes: true } } } } },
  });
  if (["CANCELLED", "DECLINED"].includes(passenger.booking.bookingStatus)) throw new Error("Cancelled or declined bookings cannot be checked in.");
  if (passenger.status === "CANCELLED") throw new Error("Cancelled passengers cannot be checked in.");
  if (!["BOOKED", "CONFIRMED", "COMPLETED"].includes(passenger.booking.bookingStatus)) throw new Error("Only confirmed bookings can be checked in.");
  const canOperateRoute = passenger.booking.route.operatorRoutes.some((operatorRoute) => operatorRoute.operatorId === operator.id && operatorRoute.enabled);
  if (!canOperateRoute || passenger.booking.operatorId !== operator.id) throw new Error("Operator can only check in passengers on assigned/accepted routes.");
  await prisma.$transaction(async (tx) => {
    await tx.bookingPassenger.update({
      where: { id: passenger.id },
      data: { status, checkedInAt: status === "CHECKED_IN" ? new Date() : null, checkedInByOperatorId: status === "CHECKED_IN" ? operator.id : null },
    });
    if (status === "NO_SHOW") {
      await tx.bookingEvent.create({
        data: {
          bookingId: passenger.bookingId,
          eventType: "PASSENGER_NO_SHOW",
          oldValue: eventValue({ passengerStatus: passenger.status }),
          newValue: eventValue({ passengerStatus: "NO_SHOW", passengerNumber: passenger.passengerNumber }),
          performedBy: "OPERATOR",
        },
      });
      const remaining = await tx.bookingPassenger.count({
        where: { bookingId: passenger.bookingId, id: { not: passenger.id }, status: { not: "NO_SHOW" } },
      });
      if (remaining === 0) {
        await tx.booking.update({ where: { id: passenger.bookingId }, data: { bookingStatus: "NO_SHOW" } });
      }
    }
  });
  revalidatePath("/operator/boarding");
  revalidatePath(`/customer/bookings/${passenger.bookingId}`);
}

export async function qrLookupAction(formData: FormData) {
  redirect(`/operator/boarding?qr=${encodeURIComponent(requiredString(formData, "qrCodeToken"))}`);
}

export async function operatorPlaceholderAction(formData: FormData) {
  const operatorId = requiredString(formData, "operatorId");
  const action = requiredString(formData, "action");
  await prisma.auditLog.create({ data: { action, entity: "operator_profiles", entityId: operatorId, metadata: JSON.stringify({ placeholder: true }) } });
  revalidatePath("/admin/operators");
}

function resolvePrice(
  route: { defaultPriceCents: number | null; adminFallbackPriceCents: number | null; pricingRules: Array<{ operatorId: string | null; fareType: string; basePriceCents: number; priceSource: string }> },
  operatorId: string,
  fareType: string,
) {
  const operatorRule = route.pricingRules.find((rule) => rule.operatorId === operatorId && rule.fareType === fareType);
  if (operatorRule) return { basePriceCents: operatorRule.basePriceCents, priceSource: "OPERATOR_RULE" };
  const routeRule = route.pricingRules.find((rule) => !rule.operatorId && rule.fareType === fareType);
  if (routeRule) return { basePriceCents: routeRule.basePriceCents, priceSource: "ROUTE_DEFAULT" };
  if (route.defaultPriceCents) return { basePriceCents: route.defaultPriceCents, priceSource: "ROUTE_DEFAULT" };
  return { basePriceCents: route.adminFallbackPriceCents ?? adminFallbackPriceCents, priceSource: "ADMIN_FALLBACK" };
}

function passengerRecords(count: number, leadPassengerName: string) {
  return Array.from({ length: count }, (_, index) => ({
    passengerNumber: index + 1,
    passengerName: index === 0 ? leadPassengerName : null,
    status: index === 0 ? "READY" : "PENDING_NAME",
    qrCodeToken: `TEMP-${randomUUID()}`,
  }));
}

function windowForDeparture(departureAt: Date) {
  const start = new Date(departureAt.getTime() - 15 * 60 * 1000);
  const end = departureAt;
  return `${start.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}-${end.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
}

function sameCalendarDay(left: Date, right: Date) {
  return startOfDay(left).getTime() === startOfDay(right).getTime();
}

function startOfDay(value: Date) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}
