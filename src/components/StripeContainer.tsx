import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import PaymentForm from "./PaymentForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51MjvX6HrkACoVWSG7ReTXWYU5dpx2WLcOMcgCUIe16DyAzwlR4LIykMqr4opzDdJk67EuGfkgjyQCpNQV1Jf4NK0008hn46WAW"
);

const StripeContainer: React.FC = () => {
  // const [clientSecret, setClientSecret] = useState("");
  const location = useLocation();
  const { state } = location;
  console.log(state.totalPrice);

  const convertNumber: number = Math.ceil(state.totalPrice * 100);

  // useEffect(() => {
  //   fetch("http://localhost:4000/create-payment-intent", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({}),
  //   }).then(async (r) => {
  //     const { clientSecret } = await r.json();
  //     console.log({ clientSecret });
  //     setClientSecret(clientSecret);
  //   });
  // }, []);

  // const options = {
  //   clientSecret,
  // };

  return (
    <Elements stripe={stripePromise} options={{ appearance: { theme: "stripe" } }}>
      <PaymentForm price={convertNumber} />
    </Elements>
    // <>
    //   {clientSecret && (
    //     <Elements options={options} stripe={stripeTestPromise}>
    //       <CheckoutForm />
    //     </Elements>
    //   )}
    // </>
  );
};

export default StripeContainer;
