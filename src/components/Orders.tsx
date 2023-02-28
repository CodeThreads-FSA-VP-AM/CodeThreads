import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrder, deleteOrder, fetchUser } from "../api/api";
import { OrderData, Order } from "./Interfaces";

const Orders = () => {
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState("");
  let navigate = useNavigate();
  const totalPrice = orders.reduce(
    (total, order) => total + order.price * order.quantity,
    0
  );

  const handleDeleteOrder = async (product_id: number) => {
    try {
      const res = await deleteOrder({
        product_id,
        token: token,
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  type User = {
    token: string;
  };

  const getUser = async (data: User) => {
    const { token } = data;
    try {
      const user = await fetchUser({ token });
      setUserId(user.id);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUser({ token });
  }, [userId]);

  useEffect(() => {
    try {
      const fetchOrders = async () => {
        const order = await fetchOrder();
        setOrders(order);
      };
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
    setToken(localStorage.getItem("token") ?? "");
  }, []);
  console.log(orders);
  console.log(userId);
  return (
    <>
      <div>
        <div
          className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0"
          id="chec-div"
        >
          <div
            className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
            id="checkout"
          >
            <div className="flex md:flex-row flex-col justify-end" id="cart">
              <div
                className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
                id="scroll"
              >
                <div
                  className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer"
                  onClick={() => setShow(!show)}
                >
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
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                  <button
                    className="text-sm pl-2 leading-none"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
                <p className="text-5xl font-black leading-10 text-gray-800 pt-3">
                  Cart
                </p>

                {/* Map over the orders here */}
                {orders
                  .filter((o) => o.users_id === userId)
                  .map((o: Order, idx) => (
                    <div
                      className="md:flex items-center mt-14 py-8 border-t border-gray-200"
                      key={idx}
                    >
                      <div className="w-1/4">
                        <img
                          src={o.front_url}
                          alt="..."
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="md:pl-3 md:w-3/4">
                        <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                          {1 + idx++}
                        </p>
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
                              className="border-gray-500 border-2 "
                            ></input>
                          </label>
                        </div>

                        <p className="text-xs leading-3 text-gray-600 pt-2 capitalize">
                          {o.description}
                        </p>
                        <p className="text-xs leading-3 text-gray-600 py-4">
                          Color: Black
                        </p>
                        <p className="w-96 text-xs leading-3 text-gray-600 capitalize">
                          {o.status}
                        </p>
                        <div className="flex items-center justify-between pt-5 pr-6">
                          <div className="flex itemms-center">
                            <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                              Add to favorites
                            </p>
                            <button
                              className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"
                              onClick={() => handleDeleteOrder(o.product_id)}
                            >
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
              <div className="xl:w-1/2 md:w-1/3 w-full bg-gray-100 h-full">
                <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                  <div>
                    <p className="text-4xl font-black leading-9 text-gray-800">
                      Summary
                    </p>
                    <div className="flex items-center justify-between pt-16">
                      <p className="text-base leading-none text-gray-800">
                        Subtotal
                      </p>
                      <p className="text-base leading-none text-gray-800">
                        ${totalPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <p className="text-base leading-none text-gray-800">
                        Shipping
                      </p>
                      <p className="text-base leading-none text-gray-800">
                        Free
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <p className="text-base leading-none text-gray-800">
                        Tax
                      </p>
                      <p className="text-base leading-none text-gray-800">
                        Calculated at checkout
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                      <p className="text-2xl leading-normal text-gray-800">
                        Total
                      </p>
                      <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                        ${totalPrice.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => setShow(!show)}
                      className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {` /* width */
                #scroll::-webkit-scrollbar {
                    width: 1px;
                }

                /* Track */
                #scroll::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                /* Handle */
                #scroll::-webkit-scrollbar-thumb {
                    background: rgb(133, 132, 132);
                }
`}
      </style>
    </>
  );
};

export default Orders;
