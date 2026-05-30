import { formatTime, locationDisplayName } from "@/lib/display";
import { getStoredTicketNumber, passengerBoardingReference } from "@/lib/tickets";
import { Resend } from "resend";

type EmailBooking = {
  id: string;
  ticketNumber?: string | null;
  leadPassengerEmail: string;
  passengerCount: number;
  scheduledPickupTime: Date;
  route: {
    origin: Parameters<typeof locationDisplayName>[0];
    destination: Parameters<typeof locationDisplayName>[0];
  };
};

type BoardingPassBooking = EmailBooking & {
  assignedDriver?: { user?: { fullName: string | null } } | null;
  vehicle?: { color: string | null; make: string; model: string; plateNumber: string } | null;
  passengers: { passengerNumber: number }[];
};

function formatTravelDate(value: Date) {
  return value.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function routeLabel(booking: EmailBooking) {
  return `${locationDisplayName(booking.route.origin)} \u2192 ${locationDisplayName(booking.route.destination)}`;
}

async function sendEmail(payload: { to: string; subject: string; text: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "Waylo <onboarding@resend.dev>";

  if (!apiKey) {
    console.log("[Waylo email not sent: RESEND_API_KEY missing]", payload);
    return { sent: false, provider: "resend", payload };
  }

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to: payload.to,
    subject: payload.subject,
    text: payload.text,
  });

  if (result.error) {
    console.error("[Waylo email failed]", result.error);
    console.error("[Waylo email payload]", payload);
    return { sent: false, provider: "resend", payload, error: result.error };
  }

  console.log("[Waylo email sent]", { to: payload.to, subject: payload.subject, id: result.data?.id });
  return { sent: true, provider: "resend", id: result.data?.id, payload };
}

export async function queueBookingConfirmationEmail(booking: EmailBooking) {
  if (!booking.ticketNumber) throw new Error("Cannot send confirmation email before ticket number is generated.");
  const ticketNumber = booking.ticketNumber;
  const payload = {
    to: booking.leadPassengerEmail,
    subject: `Your Waylo booking is confirmed \u2014 ${ticketNumber}`,
    text: [
      "Booking confirmed",
      "",
      `Ref: ${ticketNumber}`,
      "",
      `Route: ${routeLabel(booking)}`,
      `Departure: ${formatTravelDate(booking.scheduledPickupTime)} \u00b7 ${formatTime(booking.scheduledPickupTime)}`,
      `Passengers: ${booking.passengerCount}`,
      "Luggage: Up to 2 bags included per passenger",
      "",
      "Important: Your boarding pass, qr code, and pickup details will be sent 1-2 hours before departure.",
      "",
      `View trip: /customer/bookings/${booking.id}`,
    ].join("\n"),
  };

  return sendEmail(payload);
}

export async function queueBoardingPassReadyEmail(booking: BoardingPassBooking) {
  const ticketNumber = booking.ticketNumber ?? (await getStoredTicketNumber(booking.id));
  if (!ticketNumber) throw new Error("Cannot send boarding pass email before ticket number is generated.");
  const payload = {
    to: booking.leadPassengerEmail,
    subject: `Your Waylo boarding pass is ready \u2014 ${ticketNumber}`,
    text: [
      "Boarding pass ready",
      "",
      `Ref: ${ticketNumber}`,
      "",
      `Route: ${routeLabel(booking)}`,
      `Departure: ${formatTravelDate(booking.scheduledPickupTime)} \u00b7 ${formatTime(booking.scheduledPickupTime)}`,
      "Pickup: Assigned pickup details will appear in your trip.",
      `Driver: ${booking.assignedDriver?.user?.fullName ?? "Assigned driver"}`,
      `Vehicle: ${booking.vehicle ? `${booking.vehicle.color ?? ""} ${booking.vehicle.make} ${booking.vehicle.model}`.trim() : "Assigned vehicle"}`,
      "",
      "Passenger boarding passes:",
      ...booking.passengers.map((passenger) => `Passenger ${passenger.passengerNumber} \u2014 ${passengerBoardingReference(ticketNumber, passenger.passengerNumber)}`),
      "",
      `Download boarding pass: /customer/bookings/${booking.id}`,
      `View trip: /customer/bookings/${booking.id}`,
    ].join("\n"),
  };

  return sendEmail(payload);
}

export async function queueBoardingPassEmailIfReady(booking: BoardingPassBooking) {
  const hoursUntilDeparture = (booking.scheduledPickupTime.getTime() - Date.now()) / 36e5;
  if (!booking.assignedDriver || hoursUntilDeparture < 0 || hoursUntilDeparture > 2) return null;
  return queueBoardingPassReadyEmail(booking);
}
