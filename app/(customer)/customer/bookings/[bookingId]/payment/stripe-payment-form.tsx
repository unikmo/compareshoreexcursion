"use client";

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";

type StripePaymentFormProps = {
  bookingId: string;
};

export function StripePaymentForm({ bookingId }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "processing">("idle");
  const isProcessing = status === "processing";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!stripe || !elements) return;

    setStatus("processing");
    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/customer/bookings/${bookingId}/payment/return`,
      },
    });

    if (stripeError) {
      setStatus("idle");
      setError(stripeError.message ?? "Payment failed. Please try again.");
    }
  }

  return (
    <form className="payment-details-form" onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <p className="payment-error">{error}</p>}
      {isProcessing && <p className="payment-processing">Processing payment...</p>}
      <button className="payment-submit" type="submit" disabled={!stripe || !elements || isProcessing}>
        {isProcessing ? "Processing..." : "Complete payment"}
      </button>
    </form>
  );
}
