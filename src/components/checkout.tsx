"use client";
import React from "react";

export default function Checkout() {
  return (
    <>
      <script async src="https://js.stripe.com/v3/buy-button.js"></script>

      <stripe-buy-button
        buy-button-id="buy_btn_1NsFiRLSbI9u381J6UAQBh65"
        publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      ></stripe-buy-button>
    </>
  )
}
