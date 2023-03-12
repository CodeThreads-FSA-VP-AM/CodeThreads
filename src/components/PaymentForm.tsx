import React, { FormEvent, useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import axios from "axios";

const PaymentForm = (price: any) => {
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState<any>(0);
  const stripe: any = useStripe();
  const elements: any = useElements();

  useEffect(() => {
    setAmount(price);
  }, [amount]);
  console.log(amount?.price);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const res = await axios.post("http://localhost:4000/payment", {
          amount: amount?.price,
          id,
        });

        if (res.data.success) {
          console.log("Payment successful");
          setSuccess(true);
        }
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <div>
            <CardElement />
          </div>
          {/* <fieldset className='FormGroup'>
            <div className='FormRow'>
              <CardNumberElement />
            </div>
          </fieldset>
          <fieldset className='FormGroup'>
            <div className='FormRow'>
              <CardExpiryElement />
            </div>
          </fieldset>
          <fieldset className='FormGroup'>
            <div className='FormRow'>
              <CardCvcElement />
            </div>
          </fieldset> */}
          <button>Pay</button>
        </form>
      ) : (
        <div className="payment-success">
          <h2>Payment Successful</h2>
          <h3 className="Thank-you">Thank you for your purchase!</h3>
          <Link to="/orderhistory">
            <button>Order History</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
