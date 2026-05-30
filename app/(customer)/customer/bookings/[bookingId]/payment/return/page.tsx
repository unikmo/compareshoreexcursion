import { requireRole } from "@/lib/auth/session";
import { queueBookingConfirmationEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { ensureBookingTicketNumber } from "@/lib/tickets";
import Link from "next/link";
import { redirect } from "next/navigation";

type StripePaymentReturnPageProps = {
  params: Promise<{
    bookingId: string;
  }>;
  searchParams?: Promise<{
    payment_intent?: string;
  }>;
};

export default async function StripePaymentReturnPage({ params, searchParams }: StripePaymentReturnPageProps) {
  await requireRole(["CUSTOMER", "ADMIN"]);
  const { bookingId } = await params;
  const query = await searchParams;
  const paymentIntentId = query?.payment_intent ?? "";
  const stripe = getStripe();

  if (!stripe || !paymentIntentId) {
    return <PaymentFailed bookingId={bookingId} />;
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  const metadataBookingId = paymentIntent.metadata.bookingId;

  if (metadataBookingId !== bookingId || paymentIntent.status !== "succeeded") {
    return <PaymentFailed bookingId={bookingId} />;
  }

  const payment = await prisma.payment.findFirst({
    where: { bookingId, providerReference: paymentIntent.id },
    include: {
      booking: {
        include: {
          route: {
            include: {
              origin: { include: { city: true } },
              destination: true,
            },
          },
          passengers: { orderBy: { passengerNumber: "asc" } },
        },
      },
    },
  });

  if (!payment) return <PaymentFailed bookingId={bookingId} />;

  await prisma.payment.update({
    where: { id: payment.id },
    data: { status: "PAID", provider: "stripe", providerReference: paymentIntent.id },
  });
  await prisma.booking.update({
    where: { id: bookingId },
    data: { bookingStatus: "CONFIRMED" },
  });
  const ticketNumber = await ensureBookingTicketNumber(payment.booking);
  await Promise.all(
    payment.booking.passengers.map((passenger) =>
      prisma.bookingPassenger.update({
        where: { id: passenger.id },
        data: { qrCodeToken: `${ticketNumber}P${passenger.passengerNumber}` },
      }),
    ),
  );
  await queueBookingConfirmationEmail({ ...payment.booking, ticketNumber });

  redirect(`/customer/bookings/${bookingId}/confirmed`);
}

function PaymentFailed({ bookingId }: { bookingId: string }) {
  return (
    <main className="payment-page">
      <section className="payment-card centered">
        <p className="checkout-brand">ShuttleFlow</p>
        <h1>Payment failed. Please try again.</h1>
        <Link href={`/customer/bookings/${bookingId}/payment`}>Back to payment</Link>
      </section>
    </main>
  );
}
