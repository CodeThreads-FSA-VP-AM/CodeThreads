import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const PUBLIC_KEY =
  "pk_test_51MjvX6HrkACoVWSG7ReTXWYU5dpx2WLcOMcgCUIe16DyAzwlR4LIykMqr4opzDdJk67EuGfkgjyQCpNQV1Jf4NK0008hn46WAW";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer: React.FC = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }).then(async (r) => {
      const { clientSecret } = await r.json();
      console.log({ clientSecret });
      setClientSecret(clientSecret);
    });
  }, []);

  const options = {
    clientSecret,
  };

  return (
    // <Elements stripe={stripeTestPromise}>
    //   <CheckoutForm />
    // </Elements>
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripeTestPromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default StripeContainer;
