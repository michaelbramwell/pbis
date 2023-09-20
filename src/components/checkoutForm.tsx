import React from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAppContext } from "@/context/appState";
import { PaymentStatus, StatusType } from "@/app/model";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { context, update } = useAppContext();

  React.useEffect(() => {
    function updateContext(
      paymentStatus: PaymentStatus,
      statusType: StatusType
    ) {
      update({
        ...context,
        paymentStatus: paymentStatus,
        status: statusType,
      });
    }

    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          updateContext(PaymentStatus.payed, StatusType.booked);
          break;
        case "processing":
          setMessage("Your payment is processing.");
          updateContext(PaymentStatus.pending, StatusType.pending);
          break;
        case "requires_payment_method":
          setMessage(
            "Your payment was not successful, please try again."
          );
          updateContext(PaymentStatus.declined, StatusType.pending);
          break;
        default:
          setMessage("Something went wrong.");
          updateContext(PaymentStatus.declined, StatusType.pending);
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error?.message ?? "");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.value.email)}
      />
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
