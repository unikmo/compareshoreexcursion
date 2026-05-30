import { requireRole } from "@/lib/auth/session";
import { formatTime, locationDisplayName } from "@/lib/display";
import { prisma } from "@/lib/prisma";
import { getStoredTicketNumber } from "@/lib/tickets";
import Link from "next/link";

type CustomerBookingPageProps = {
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

function TripUnavailable() {
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

export default async function CustomerBookingPage({ params }: CustomerBookingPageProps) {
  await requireRole(["CUSTOMER", "ADMIN"]);
  const { bookingId } = await params;

  const booking = await prisma.booking.findFirst({
    where: { id: bookingId },
    include: {
      route: { include: { origin: true, destination: true } },
    },
  });

  if (!booking) return <TripUnavailable />;

  const routeLabel = `${locationDisplayName(booking.route.origin)} \u2192 ${locationDisplayName(booking.route.destination)}`;
  const ticketNumber = (await getStoredTicketNumber(booking.id)) ?? "Pending";
  const bookingCancelled = ["CANCELLED", "CANCELLED_WITH_CREDIT"].includes(booking.bookingStatus);
  const statusLabel =
    booking.bookingStatus === "CANCELLED_WITH_CREDIT" ? "Cancelled with credit" :
    bookingCancelled ? "Booking cancelled" :
    booking.bookingStatus === "NO_SHOW" ? "No-show" :
    booking.bookingStatus === "COMPLETED" ? "Completed" :
    "Booking confirmed";

  return (
    <main className="payment-page">
      <section className="trip-card" aria-label="Trip details">
        <div className="trip-topline">
          <p className="checkout-brand">ShuttleFlow</p>
          <span>{statusLabel}</span>
        </div>
        <div className="trip-header">
          <div>
            <h1 className="trip-title-line">
              <strong>{routeLabel}</strong>
            </h1>
          </div>
        </div>

        <div className="trip-reference-row">
          <span>Ref:</span>
          <div><strong>{ticketNumber}</strong></div>
        </div>

        <div className="trip-itinerary">
          <div>
            <span>Lead passenger</span>
            <strong>{booking.leadPassengerName}</strong>
          </div>
          <div>
            <span>Departure</span>
            <strong>{formatTravelDate(booking.scheduledPickupTime)} {"\u00b7"} {formatTime(booking.scheduledPickupTime)}</strong>
          </div>
          <div>
            <span>Passengers</span>
            <strong>{booking.passengerCount}</strong>
          </div>
          <div>
            <span>Pickup</span>
            <strong>Pickup details will be confirmed closer to departure.</strong>
          </div>
        </div>

        {!bookingCancelled && (
          <Link className="manage-trip-link" href={`/customer/bookings/${booking.id}/modify`}>
            Manage booking
          </Link>
        )}

        <div className="confirmation-actions">
          <Link className="primary" href="/customer">Back to home</Link>
          <Link href={`/customer/bookings/${booking.id}/confirmed`}>View confirmation</Link>
          <Link href={`/customer/bookings/${booking.id}/ticket`}>Download ticket</Link>
        </div>
      </section>
    </main>
  );
}
