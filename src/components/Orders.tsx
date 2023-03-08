import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HighlightSpanKind } from "typescript";
import { fetchOrder, deleteOrder, fetchUser, createOrder } from "../api/api";
import Highlights from "./HighLights";
import { OrderData, Order, User } from "./Interfaces";

const Orders = () => {
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState("");
  let navigate = useNavigate();
  const totalPrice = orders.reduce((total, order) => total + order.price * order.quantity, 0);

  const handleDeleteOrder = async (product_id: number) => {
    try {
      const res = await deleteOrder({
        product_id,
        token: token,
      });
      console.log(res);
      setOrders(orders.filter((order) => order.product_id !== product_id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getUser = async (data: User) => {
      const { token } = data;
      try {
        const user = await fetchUser({ token });
        setUserId(user.id);
      } catch (error) {
        console.error(error);
      }
    };

    const token = localStorage.getItem("token") ?? "";
    setToken(token);
    getUser({ token });

    try {
      const fetchOrders = async (userId: number) => {
        const orders = await fetchOrder(userId);
        const filteredOrders = orders.filter(
          (order: { users_id: number }) => order.users_id === userId
        );
        setOrders(filteredOrders);
      };
      fetchOrders(userId);
    } catch (error) {
      console.error(error);
    }
  }, [token, userId]);

  //checkout function
  //needs to close or create a new row in the orders table
  //onclick function on the checkout button

  const checkout = async () => {
    try {
      setOrders([]);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(orders);
  console.log(userId);
  return (
    <>
      <div>
        <div
          className="fixed top-0 w-full h-full overflow-x-hidden overflow-y-auto bg-black bg-opacity-90 sticky-0"
          id="chec-div">
          <div
            className="absolute right-0 z-10 w-full h-full overflow-x-hidden transition duration-700 ease-in-out transform translate-x-0"
            id="checkout">
            <div className="flex flex-col justify-end md:flex-row" id="cart">
              <div
                className="w-full h-screen py-8 pl-4 pr-10 overflow-x-hidden overflow-y-auto bg-white lg:w-1/2 md:pl-10 md:pr-4 md:py-12"
                id="scroll">
                <div
                  className="flex items-center text-gray-500 cursor-pointer hover:text-gray-600"
                  onClick={() => setShow(!show)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-left"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                  <button className="pl-2 text-sm leading-none" onClick={() => navigate(-1)}>
                    Back
                  </button>
                </div>
                <p className="pt-3 text-5xl font-black leading-10 text-gray-800">Cart</p>

                {/* Map over the orders here */}
                {orders
                  .filter((o) => o.users_id === userId)
                  .map((o: Order, idx) => (
                    <div
                      className="items-center py-8 border-t border-gray-200 md:flex mt-14"
                      key={idx}>
                      <div className="w-1/4">
                        <img
                          src={o.front_url}
                          alt="..."
                          className="object-cover object-center w-full h-full"
                        />
                      </div>
                      <div className="md:pl-3 md:w-3/4">
                        <p className="pt-4 text-xs leading-3 text-gray-800 md:pt-0">{1 + idx++}</p>
                        <div className="flex items-center justify-between w-full pt-1">
                          <p className="text-base font-black leading-none text-gray-800 capitalize">
                            {o.title}
                          </p>
                          <label className="p-1 border border-gray-200 focus:outline-none">
                            <input
                              type="number"
                              min="1"
                              max="10"
                              defaultValue={o.quantity}
                              className="border-2 border-gray-500 "></input>
                          </label>
                        </div>

                        <p className="pt-2 text-xs leading-3 text-gray-600 capitalize">
                          {o.description}
                        </p>
                        <p className="py-4 text-xs leading-3 text-gray-600">Color: Black</p>
                        <p className="text-xs leading-3 text-gray-600 capitalize w-96">
                          {o.status}
                        </p>
                        <div className="flex items-center justify-between pt-5 pr-6">
                          <div className="flex itemms-center">
                            <p className="text-xs leading-3 text-gray-800 underline cursor-pointer">
                              Add to favorites
                            </p>
                            <button
                              className="pl-5 text-xs leading-3 text-red-500 underline cursor-pointer"
                              onClick={() => handleDeleteOrder(o.product_id)}>
                              Remove
                            </button>
                          </div>
                          <p className="text-base font-black leading-none text-gray-800">
                            ${o.price * o.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              {/* //Summary starts here */}
              <div className="w-full h-full bg-gray-100 xl:w-1/2 md:w-1/3">
                <div className="flex flex-col justify-between py-20 overflow-y-auto md:h-screen px-14">
                  <div>
                    <p className="text-4xl font-black leading-9 text-gray-800">Summary</p>
                    <div className="flex items-center justify-between pt-16">
                      <p className="text-base leading-none text-gray-800">Subtotal</p>
                      <p className="text-base leading-none text-gray-800">
                        ${totalPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <p className="text-base leading-none text-gray-800">Shipping</p>
                      <p className="text-base leading-none text-gray-800">Free</p>
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <p className="text-base leading-none text-gray-800">Tax</p>
                      <p className="text-base leading-none text-gray-800">Calculated at checkout</p>
                    </div>
                    <Highlights />
                  </div>
                  <div>
                    <div className="flex items-center justify-between pt-20 pb-6 lg:pt-5">
                      <p className="text-2xl leading-normal text-gray-800">Total</p>
                      <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                        ${totalPrice.toFixed(2)}
                      </p>
                    </div>
                    <button
                      // onClick={() => setShow(!show)}
                      onClick={() => checkout()}
                      className="w-full py-5 text-base leading-none text-white bg-gray-800 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
