import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51MjvX6HrkACoVWSG7ReTXWYU5dpx2WLcOMcgCUIe16DyAzwlR4LIykMqr4opzDdJk67EuGfkgjyQCpNQV1Jf4NK0008hn46WAW"
);

const StripeContainer: React.FC = () => {
  const location = useLocation();
  const { state } = location;
  console.log(state.totalPrice);

  const convertNumber: number = Math.ceil(state.totalPrice * 100);

  return (
    <Elements stripe={stripePromise} options={{ appearance: { theme: "stripe" } }}>
      <PaymentForm price={convertNumber} />
    </Elements>
  );
};

export default StripeContainer;
