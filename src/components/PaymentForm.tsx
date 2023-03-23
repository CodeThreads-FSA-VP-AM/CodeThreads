import React, { FormEvent, useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

type Prop = {
  price: any;
};

const PaymentForm: React.FC<Prop> = (price) => {
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState<any>(0);
  const [loading, setLoading] = useState<Boolean>(false);
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

    setLoading(true);
    if (!error) {
      try {
        const { id } = paymentMethod;
        const res = await axios.post(
          "https://codethreads.onrender.com/payment",
          {
            amount: amount?.price,
            id,
          }
        );

        console.log("loading");
        if (res.data.success) {
          console.log("Payment successful");
          setSuccess(true);
        }
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {!success ? (
            <div className="py-6 bg-white sm:py-8 lg:py-12">
              <div className="px-4 mx-auto max-w-screen-2xl md:px-8">
                <div className="flex flex-col items-center">
                  <h1 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                    Checkout
                  </h1>

                  <p className="max-w-screen-md mb-12 text-center text-slate-800 md:text-md">
                    Enter Card: 4242 4242 4242 4242 date: 02/24 CVC: 424 Zip:
                    11111
                  </p>
                  <form id="form" onSubmit={handleSubmit}>
                    <div className="p-3">
                      <CardElement />
                    </div>
                    <button className="inline-block px-8 py-2 text-sm font-semibold text-center text-white transition duration-100 bg-indigo-500 rounded outline-none ring-indigo-300 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
                      Pay
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <section className="py-24">
              <div className="container px-4 mx-auto">
                <div className="max-w-2xl mx-auto text-center">
                  <span className="inline-block mx-auto mb-6">
                    <svg
                      width="54"
                      height="54"
                      viewBox="0 0 54 54"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M26.9999 0.333374C12.3066 0.333374 0.333252 12.3067 0.333252 27C0.333252 41.6934 12.3066 53.6667 26.9999 53.6667C41.6933 53.6667 53.6666 41.6934 53.6666 27C53.6666 12.3067 41.6933 0.333374 26.9999 0.333374ZM39.7466 20.8667L24.6266 35.9867C24.2532 36.36 23.7466 36.5734 23.2133 36.5734C22.6799 36.5734 22.1733 36.36 21.7999 35.9867L14.2533 28.44C13.4799 27.6667 13.4799 26.3867 14.2533 25.6134C15.0266 24.84 16.3066 24.84 17.0799 25.6134L23.2133 31.7467L36.9199 18.04C37.6933 17.2667 38.9733 17.2667 39.7466 18.04C40.5199 18.8134 40.5199 20.0667 39.7466 20.8667Z"
                        fill="#AFFF0F"
                      ></path>
                    </svg>
                  </span>
                  <span className="block mb-1 text-sm font-bold text-indigo-500">
                    SUCCESS
                  </span>
                  <h3 className="mb-5 text-2xl font-black">
                    Your order has been placed
                  </h3>
                  <p className="mb-12 text-lg font-bold">
                    Congratulations! Your order has been successfully placed.
                    We'll keep you updated on the shipping status and provide
                    tracking information once your package is on its way.
                  </p>
                  <Link
                    to="/products"
                    className="relative inline-block w-full h-12 rounded-md group xs:w-60 bg-blueGray-900"
                  >
                    <div className="absolute top-0 left-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 group-hover:translate-y-0 group-hover:translate-x-0">
                      <div className="flex items-center justify-center w-full h-full bg-green-600 border-2 border-black rounded-md">
                        <span className="text-base font-black text-black">
                          Continue Shopping
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );
};

export default PaymentForm;
