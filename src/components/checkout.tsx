"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process?.env?.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

console.log("env varssssss", process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Checkout() {
  const [clientSecret, setClientSecret] = React.useState("");

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "prod_NIDHBgQLJeY5Mt" }] }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("intent", data)
        return setClientSecret(data.clientSecret)
      });
  }, []);

  const options = {
    clientSecret,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
