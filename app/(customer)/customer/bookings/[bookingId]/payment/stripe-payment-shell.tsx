"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { StripePaymentForm } from "./stripe-payment-form";

type StripePaymentShellProps = {
  bookingId: string;
  clientSecret: string;
  publishableKey: string;
};

export function StripePaymentShell({ bookingId, clientSecret, publishableKey }: StripePaymentShellProps) {
  const stripePromise = loadStripe(publishableKey);

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#0f8b8d",
            borderRadius: "10px",
            fontFamily: "Inter, system-ui, sans-serif",
          },
        },
      }}
    >
      <StripePaymentForm bookingId={bookingId} />
    </Elements>
  );
}
