import { requireRole } from "@/lib/auth/session";
import { formatTime, locationDisplayName } from "@/lib/display";
import { prisma } from "@/lib/prisma";
import { getStoredTicketNumber } from "@/lib/tickets";
import Link from "next/link";
import { PrintTicketButton } from "./print-button";

type TicketPageProps = {
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

function TicketUnavailable() {
  return (
    <main className="payment-page">
      <section className="payment-card centered">
        <p className="checkout-brand">ShuttleFlow</p>
        <h1>This ticket could not be found.</h1>
        <Link href="/customer">Back to search</Link>
      </section>
    </main>
  );
}

export default async function TicketPage({ params }: TicketPageProps) {
  await requireRole(["CUSTOMER", "ADMIN"]);
  const { bookingId } = await params;

  const booking = await prisma.booking.findFirst({
    where: { id: bookingId },
    include: { route: { include: { origin: true, destination: true } } },
  });

  if (!booking) return <TicketUnavailable />;

  const ticketNumber = await getStoredTicketNumber(booking.id);
  if (!ticketNumber) return <TicketUnavailable />;
  const routeLabel = `${locationDisplayName(booking.route.origin)} \u2192 ${locationDisplayName(booking.route.destination)}`;

  return (
    <main className="payment-page">
      <section className="ticket-card" aria-label="ShuttleFlow ticket">
        <p className="checkout-brand">ShuttleFlow</p>
        <h1>Ticket</h1>
        <div className="ticket-number-block">
          <span>Ref:</span>
          <strong>{ticketNumber}</strong>
        </div>
        <div className="trip-itinerary">
          <div>
            <span>Lead passenger</span>
            <strong>{booking.leadPassengerName}</strong>
          </div>
          <div>
            <span>Route</span>
            <strong>{routeLabel}</strong>
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
            <span>Luggage</span>
            <strong>Up to 2 bags included per passenger</strong>
          </div>
        </div>
        <p className="ticket-note">Your boarding pass, qr code, and pickup details will be sent 1-2 hours before departure.</p>
        <div className="confirmation-actions ticket-actions">
          <PrintTicketButton />
          <Link href={`/customer/bookings/${booking.id}`}>View trip</Link>
        </div>
      </section>
    </main>
  );
}
