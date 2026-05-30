import { requireRole } from "@/lib/auth/session";
import { formatMoney, formatTime, locationDisplayName } from "@/lib/display";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import Link from "next/link";
import { redirect } from "next/navigation";
import { StripePaymentShell } from "./stripe-payment-shell";

type PaymentPageProps = {
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

function PaymentUnavailable() {
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

function PaymentSetupUnavailable({ bookingId }: { bookingId: string }) {
  return (
    <main className="payment-page">
      <section className="payment-card centered">
        <p className="checkout-brand">ShuttleFlow</p>
        <h1>Payment is temporarily unavailable.</h1>
        <p>Please try again in a moment.</p>
        <Link href={`/customer/bookings/${bookingId}`}>Back to booking</Link>
      </section>
    </main>
  );
}

async function stripeRequest<T>(request: Promise<T>) {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("Stripe request timed out.")), 12000);
  });

  return Promise.race([request, timeout]);
}

export default async function PaymentPage({ params }: PaymentPageProps) {
  await requireRole(["CUSTOMER", "ADMIN"]);
  const { bookingId } = await params;

  const booking = await prisma.booking.findFirst({
    where: { id: bookingId },
    include: {
      route: { include: { origin: true, destination: true } },
      payments: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  if (!booking) return <PaymentUnavailable />;

  const routeLabel = `${locationDisplayName(booking.route.origin)} \u2192 ${locationDisplayName(booking.route.destination)}`;
  const payment = booking.payments[0];
  const totalCents = payment?.amountCents ?? booking.totalAmountCents;
  const stripe = getStripe();
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (payment?.status === "PAID") redirect(`/customer/bookings/${booking.id}/confirmed`);

  if (!stripe || !publishableKey) {
    return (
      <main className="payment-page">
        <section className="payment-card centered">
          <p className="checkout-brand">ShuttleFlow</p>
          <h1>Stripe test mode is not configured.</h1>
          <p>Add Stripe test keys to your environment to continue.</p>
          <Link href={`/customer/bookings/${booking.id}`}>Back to booking</Link>
        </section>
      </main>
    );
  }

  let clientSecret = "";
  let paymentAlreadySucceeded = false;

  try {
    if (payment?.providerReference) {
      const existingIntent = await stripeRequest(stripe.paymentIntents.retrieve(payment.providerReference));
      if (existingIntent.status === "succeeded" && payment) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: "PAID", provider: "stripe", providerReference: existingIntent.id },
        });
        paymentAlreadySucceeded = true;
      }
      clientSecret = existingIntent.client_secret ?? "";
    }

    if (!clientSecret) {
      const paymentIntent = await stripeRequest(
        stripe.paymentIntents.create({
          amount: totalCents,
          currency: (payment?.currency ?? "USD").toLowerCase(),
          automatic_payment_methods: { enabled: true },
          metadata: { bookingId: booking.id },
        }),
      );

      clientSecret = paymentIntent.client_secret ?? "";

      if (payment) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: { provider: "stripe", providerReference: paymentIntent.id, status: "PENDING" },
        });
      }
    }
  } catch {
    return <PaymentSetupUnavailable bookingId={booking.id} />;
  }

  if (!clientSecret) {
    return <PaymentSetupUnavailable bookingId={booking.id} />;
  }

  if (paymentAlreadySucceeded) redirect(`/customer/bookings/${booking.id}/confirmed`);

  return (
    <main className="payment-page">
      <header className="checkout-header payment-header">
        <p className="checkout-brand">ShuttleFlow</p>
        <h1>Secure checkout</h1>
        <p>{routeLabel}</p>
      </header>

      <section className="payment-card" aria-label="Payment">
        <div className="payment-divider" aria-hidden="true" />

        <div className="payment-summary-row">
          <div className="payment-summary compact">
            <p>{formatTravelDate(booking.scheduledPickupTime)} {"\u00b7"} {formatTime(booking.scheduledPickupTime)}</p>
            <p>{booking.passengerCount} passengers {"\u00b7"} {booking.fareType === "FLEX" ? "Flex" : "Standard"}</p>
            <p>Up to 2 bags included</p>
          </div>

          <div className="payment-total-block">
            <span>TOTAL</span>
            <strong>{formatMoney(totalCents)}</strong>
          </div>
        </div>

        <div className="payment-divider" aria-hidden="true" />

        <p className="payment-method-title">Payment method</p>
        <StripePaymentShell bookingId={booking.id} clientSecret={clientSecret} publishableKey={publishableKey} />

        <p className="payment-security">
          <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
            <rect x="5" y="10" width="14" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
          Secure payment {"\u00b7"} encrypted checkout
        </p>

        <Link className="payment-back-link" href={`/customer/bookings/${booking.id}`}>
          <span aria-hidden="true">{"\u2190"}</span> Back to booking
        </Link>
      </section>
    </main>
  );
}
