import { requireRole } from "@/lib/auth/session";
import { formatTime, locationDisplayName } from "@/lib/display";
import { prisma } from "@/lib/prisma";
import { getStoredTicketNumber } from "@/lib/tickets";
import Link from "next/link";

type ConfirmedPageProps = {
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

function ConfirmationUnavailable() {
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

export default async function ConfirmedPage({ params }: ConfirmedPageProps) {
  await requireRole(["CUSTOMER", "ADMIN"]);
  const { bookingId } = await params;

  const booking = await prisma.booking.findFirst({
    where: { id: bookingId },
    include: {
      route: { include: { origin: true, destination: true } },
    },
  });

  if (!booking) return <ConfirmationUnavailable />;

  const routeLabel = `${locationDisplayName(booking.route.origin)} \u2192 ${locationDisplayName(booking.route.destination)}`;
  const ticketNumber = (await getStoredTicketNumber(booking.id)) ?? "Pending";

  return (
    <main className="payment-page">
      <section className="confirmation-card" aria-label="Booking confirmed">
        <div className="confirmation-check" aria-hidden="true">{"\u2713"}</div>
        <h1>Booking confirmed</h1>
        <div className="confirmation-summary">
          <strong>{routeLabel}</strong>
          <span>{formatTravelDate(booking.scheduledPickupTime)} {"\u00b7"} {formatTime(booking.scheduledPickupTime)}</span>
          <span>{booking.passengerCount} passengers</span>
        </div>

        <div className="ticket-number-block">
          <span>Ref: {ticketNumber}</span>
        </div>

        <ul className="confirmation-copy">
          <li>Your booking confirmation has been sent to {booking.leadPassengerEmail}.</li>
          <li>Your boarding pass, qr code, and pickup details will be sent 1-2 hours prior departure.</li>
        </ul>

        <div className="confirmation-actions">
          <Link className="primary" href={`/customer/bookings/${booking.id}`}>View trip</Link>
          <Link href={`/customer/bookings/${booking.id}/ticket`}>Download ticket</Link>
          <Link href="/customer">Back to home</Link>
        </div>
      </section>
    </main>
  );
}
