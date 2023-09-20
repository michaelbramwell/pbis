"use client";
import React from "react";

export default function Checkout() {
  return (
    <>
      <script async src="https://js.stripe.com/v3/buy-button.js"></script>

      <stripe-buy-button
        buy-button-id="buy_btn_1NsFiRLSbI9u381J6UAQBh65"
        publishable-key="pk_test_51MXcfULSbI9u381JHnu1IJYBrDaYkX6lcDvbUMTW6ZdAp9WGd5hdL4ZsEXtTKVNfgCWPu2x3ZtRoqRKrdtvWHgNW00zDjViswl"
      ></stripe-buy-button>
    </>
  )
}
