import { cancelCustomerBookingAction, updateCustomerBookingDetailsAction } from "@/app/actions";
import { requireRole } from "@/lib/auth/session";
import { formatTime, locationDisplayName } from "@/lib/display";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PolicyPopover } from "./policy-popover";

type ModifyBookingPageProps = {
  params: Promise<{
    bookingId: string;
  }>;
};

function formatTravelDate(value: Date) {
  return value.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function hoursUntil(value: Date) {
  return (value.getTime() - Date.now()) / 36e5;
}

function ModifyUnavailable() {
  return (
    <main className="payment-page">
      <section className="payment-card centered">
        <p className="checkout-brand">ShuttleFlow</p>
        <h1>This booking could not be found.</h1>
        <Link href="/customer">Back to search</Link>
      </section>
    </main>
  );
}

export default async function ModifyBookingPage({ params }: ModifyBookingPageProps) {
  await requireRole(["CUSTOMER", "ADMIN"]);
  const { bookingId } = await params;

  const booking = await prisma.booking.findFirst({
    where: { id: bookingId },
    include: {
      route: { include: { origin: true, destination: true } },
      passengers: { orderBy: { passengerNumber: "asc" } },
    },
  });

  if (!booking) return <ModifyUnavailable />;

  const routeLabel = `${locationDisplayName(booking.route.origin)} \u2192 ${locationDisplayName(booking.route.destination)}`;
  const hoursToDeparture = hoursUntil(booking.scheduledPickupTime);
  const fullChangesAllowed = hoursToDeparture >= 6;
  const limitedChangesAllowed = hoursToDeparture >= 4;
  const cancelAllowed = hoursToDeparture >= 6;
  const availableDepartures = fullChangesAllowed
    ? await prisma.routeDeparture.findMany({
        where: {
          active: true,
          departureAt: { gt: new Date() },
          route: {
            active: true,
            origin: { cityId: booking.route.origin.cityId },
            destination: { cityId: booking.route.destination.cityId },
          },
        },
        include: { route: { include: { origin: true, destination: true } } },
        orderBy: { departureAt: "asc" },
        take: 80,
      })
    : [];

  return (
    <main className="checkout-page">
      <header className="checkout-header">
        <p className="checkout-brand">ShuttleFlow</p>
        <h1>Manage booking</h1>
        <p>{routeLabel}</p>
      </header>

      <section className="checkout-shell">
        <div className="checkout-form-card manage-booking-card" aria-label="Manage booking">
          <div className="manage-booking-summary">
            <strong>{formatTravelDate(booking.scheduledPickupTime)} {"\u00b7"} {formatTime(booking.scheduledPickupTime)}</strong>
            <span>{booking.passengerCount} passengers</span>
          </div>

          {!limitedChangesAllowed ? (
            <div className="locked-manage-state">
              <p className="booking-state-note">Your ride is being prepared for departure. Changes are no longer available.</p>
              <div className="manage-bottom-row">
                <Link href={`/customer/bookings/${booking.id}`}>← Back to trip</Link>
                <PolicyPopover />
              </div>
            </div>
          ) : (
            <form className="manage-booking-form" action={updateCustomerBookingDetailsAction}>
              <input type="hidden" name="bookingId" value={booking.id} />
              {fullChangesAllowed && (
                <div className="checkout-field-grid manage-ride-grid">
                  <label>
                    Departure
                    <select name="departureId" defaultValue={booking.departureId}>
                      {availableDepartures.map((departure) => (
                        <option key={departure.id} value={departure.id}>
                          {locationDisplayName(departure.route.origin)} to {locationDisplayName(departure.route.destination)} / {formatTravelDate(departure.departureAt)} {"\u00b7"} {formatTime(departure.departureAt)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Passengers
                    <input name="passengerCount" type="number" min="1" max="12" defaultValue={booking.passengerCount} />
                  </label>
                </div>
              )}

              <div className="checkout-field-grid">
                <label>
                  Lead passenger*
                  <input name="leadPassengerName" defaultValue={booking.leadPassengerName} required />
                </label>
                <label>
                  Email*
                  <input name="leadPassengerEmail" type="email" defaultValue={booking.leadPassengerEmail} required />
                </label>
                <label>
                  Phone*
                  <input name="leadPassengerPhone" defaultValue={booking.leadPassengerPhone} required />
                </label>
              </div>

              {booking.passengers.length > 1 && (
                <div className="checkout-field-grid additional-passengers">
                  {booking.passengers.slice(1).map((passenger) => (
                    <label key={passenger.id}>
                      Passenger {passenger.passengerNumber}
                      <input name={`passenger${passenger.passengerNumber}Name`} defaultValue={passenger.passengerName ?? ""} placeholder="Passenger name" />
                    </label>
                  ))}
                </div>
              )}

              <div className="checkout-section">
                <h2>Notes</h2>
                <label>
                  <textarea name="specialNotes" defaultValue={booking.specialNotes ?? ""} placeholder="Accessibility needs or pickup notes" />
                </label>
              </div>

            <div className="manage-booking-actions">
              <button className="primary" type="submit">Save changes</button>
              <Link href={`/customer/bookings/${booking.id}`}>Back to trip</Link>
            </div>
            <div className="manage-bottom-row">
              <span aria-hidden="true" />
              <PolicyPopover />
            </div>
          </form>
          )}

          <div className="manage-booking-secondary">
            {cancelAllowed && (
              <form action={cancelCustomerBookingAction}>
                <input type="hidden" name="bookingId" value={booking.id} />
                <button type="submit">Cancel trip</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
