import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { HighlightSpanKind } from "typescript";

import {
  fetchOrder,
  deleteOrder,
  fetchUser,
  checkoutOrder,
  fetchProductById,
} from "../api/api";

import Highlights from "./HighLights";
import { OrderData, Order, User, Product, CartItem } from "./Interfaces";
import Loader from "./Loader";
import Steps from "./Steps";
import WishList from "./WishList";

type Props = {
  setProductsLength: (products: number) => void;
  wishlist: any;
  setWishlist: any;
  setSuccess: any;
  setSuccessTitle: any;
  setSuccessMsg: any;
  orders: any;
  setOrders: any;
};

const Orders: React.FC<Props> = ({
  setProductsLength,
  wishlist,
  setWishlist,
  setSuccess,
  setSuccessMsg,
  setSuccessTitle,
  orders,
  setOrders,
}) => {
  const [show, setShow] = useState(false);

  const [userId, setUserId] = useState(0);
  const [orderId, setOrderId] = useState(2);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState<Boolean>(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [product, setProduct] = useState<Product[]>();
  let navigate = useNavigate();
  const totalPrice = orders.reduce(
    (total: number, order: { price: number; quantity: number }) =>
      total + order.price * order.quantity,
    0
  );

  const handleDeleteOrder = async (product_id: number) => {
    try {
      const res = await deleteOrder({
        product_id,
        token: token,
      });

      setOrders(
        orders.filter(
          (order: { product_id: number }) => order.product_id !== product_id
        )
      );
      setSuccess(true);
      setSuccessMsg("Item removed.");
      // Update productsLength
      const updatedOrders = await fetchOrder(userId);
      const addedOrders = updatedOrders.filter(
        (o: { status: string }) => o.status === "added"
      );
      setProductsLength(addedOrders.length);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteCartItem = async (productId: number) => {
    try {
      const updatedCart = cart.filter((item) => item.id !== productId);
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
      const updatedProducts = await Promise.all(
        updatedCart.map((item) => fetchProductById(item.id))
      );
      setProduct(updatedProducts);
      setSuccess(true);
      setSuccessMsg("Item removed.");
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
  }, [token]);

  useEffect(() => {
    const fetchOrders = async (userId: number) => {
      const orders = await fetchOrder(userId);

      const getorderid = orders.filter(
        (o: { status: string }) => o.status === "added"
      );

      setProductsLength(getorderid.length);

      const orderid = getorderid[0];
      if (orderid?.order_id !== undefined) {
        setOrderId(orderid.order_id);
      }

      const filteredOrders = orders.filter(
        (order: { users_id: number; status: string }) =>
          order.users_id === userId && order.status === "added"
      );
      setOrders(filteredOrders);
      setLoading(false);
    };

    if (userId !== undefined) {
      fetchOrders(userId);
    }
  }, [token, userId, orderId]);

  const checkout = async () => {
    try {
      const order = await checkoutOrder(userId, orderId, token);

      if (order) {
        setOrders([]);
        setProduct([]);
        setCart([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const cartData = JSON.parse(sessionStorage.getItem("cart") || "[]");
    setCart(cartData);
  }, []);
  useEffect(() => {
    if (cart.length > 0) {
      const productIds = cart.map((item) => item.id);
      const fetchProducts = async () => {
        try {
          const fetchedProducts = await Promise.all(
            productIds.map((id) => fetchProductById(id))
          );
          setProduct(fetchedProducts);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      fetchProducts();
    }
  }, [cart]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div
            className="fixed top-0 w-full h-full overflow-x-hidden overflow-y-auto bg-black bg-opacity-90 sticky-0"
            id="chec-div"
          >
            <div
              className="absolute right-0 z-10 w-full h-full overflow-x-hidden transition duration-700 ease-in-out transform translate-x-0"
              id="checkout"
            >
              <div className="flex flex-col justify-end md:flex-row" id="cart">
                <div
                  className="w-full h-screen py-8 pl-4 pr-10 overflow-x-hidden overflow-y-auto bg-white lg:w-1/2 md:pl-10 md:pr-4 md:py-12"
                  id="scroll"
                >
                  <div
                    className="flex items-center text-gray-500 cursor-pointer hover:text-gray-600"
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
                      className="pl-2 text-sm leading-none"
                      onClick={() => navigate(-1)}
                    >
                      Back
                    </button>
                  </div>
                  <p className="pt-3 text-5xl font-black leading-10 text-gray-800">
                    Cart
                  </p>
                  <Steps />
                  {/* Map over the orders here */}
                  {orders
                    .filter(
                      (o: { users_id: number; status: string }) =>
                        o.users_id === userId && o.status === "added"
                    )
                    .map((o: Order, idx: any) => (
                      <div
                        className="items-center py-8 border-t border-gray-200 md:flex mt-14"
                        key={idx}
                      >
                        <div className="w-1/4">
                          <img
                            src={o.front_url}
                            alt="..."
                            className="object-cover object-center w-full h-full shadow-2xl rounded-xl"
                          />
                        </div>
                        <div className="md:pl-3 md:w-3/4">
                          <p className="pt-4 text-xs leading-3 text-gray-800 md:pt-0">
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
                                disabled
                                defaultValue={o.quantity}
                                className="border-2 border-gray-500 "
                              ></input>
                            </label>
                          </div>

                          <p className="pt-2 text-xs leading-3 text-gray-600 capitalize">
                            {o.description}
                          </p>
                          <p className="py-4 text-xs leading-3 text-gray-600">
                            Color: Black
                          </p>
                          <p className="text-xs leading-3 text-gray-600 capitalize w-96">
                            {o.status}
                          </p>
                          <div className="flex items-center justify-between pt-5 pr-6">
                            <div className="">
                              <button
                                className="text-xs leading-3 text-red-500 underline cursor-pointer "
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
                  {product?.map((p: Product, idx) => {
                    const cartItem = cart.find(
                      (item: CartItem) => item.id === p.id
                    );
                    const quantity = cartItem ? cartItem.quantity : 0;

                    return (
                      <div
                        className="items-center py-8 border-t border-gray-200 md:flex mt-14"
                        key={idx}
                      >
                        <div className="w-1/4">
                          <img
                            src={p.front_url}
                            alt="..."
                            className="object-cover object-center w-full h-full"
                          />
                        </div>
                        <div className="md:pl-3 md:w-3/4">
                          <p className="pt-4 text-xs leading-3 text-gray-800 md:pt-0">
                            {1 + idx}
                          </p>
                          <div className="flex items-center justify-between w-full pt-1">
                            <p className="text-base font-black leading-none text-gray-800 capitalize">
                              {p.title}
                            </p>
                            <label className="p-1 border border-gray-200 focus:outline-none">
                              <input
                                type="number"
                                min="1"
                                max="10"
                                defaultValue={quantity}
                                className="border-2 border-gray-500 "
                              ></input>
                            </label>
                          </div>

                          <p className="pt-2 text-xs leading-3 text-gray-600 capitalize">
                            {p.description}
                          </p>
                          <p className="py-4 text-xs leading-3 text-gray-600">
                            Color: Black
                          </p>
                          <p className="text-xs leading-3 text-gray-600 capitalize w-96">
                            {p.status}
                          </p>
                          <div className="flex items-center justify-between pt-5 pr-6">
                            <div className="flex itemms-center">
                              <button
                                className="pl-5 text-xs leading-3 text-red-500 underline cursor-pointer"
                                onClick={() => handleDeleteCartItem(p.id)}
                              >
                                Remove
                              </button>
                            </div>
                            <p className="text-base font-black leading-none text-gray-800">
                              ${(p.price * quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="hidden sm:block">
                    {wishlist ? (
                      <WishList
                        token={token}
                        quantity={0}
                        setSuccess={setSuccess}
                        setSuccessTitle={setSuccessTitle}
                        setSuccessMsg={setSuccessMsg}
                        wishlist={wishlist}
                        setWishlist={setWishlist}
                      />
                    ) : null}
                  </div>
                </div>
                {/* //Summary starts here */}
                {token ? (
                  <div className="w-full h-full bg-gray-100 xl:w-1/2 md:w-1/3">
                    <div className="flex flex-col justify-between py-20 overflow-y-auto md:h-screen px-14">
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
                        <Highlights />
                      </div>
                      <div>
                        <div className="flex items-center justify-between pt-20 pb-6 lg:pt-5">
                          <p className="text-2xl leading-normal text-gray-800">
                            Total
                          </p>
                          <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                            ${totalPrice.toFixed(2)}
                          </p>
                        </div>
                        {/* pass state down for the price */}
                        <NavLink
                          to={{ pathname: "/checkout" }}
                          state={{ totalPrice }}
                        >
                          <button
                            // onClick={() => setShow(!show)}
                            onClick={() => checkout()}
                            disabled={totalPrice === 0 ? true : false}
                            className="w-full py-5 text-base leading-none text-white bg-gray-800 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                          >
                            Checkout
                          </button>
                        </NavLink>
                      </div>
                    </div>
                    {/* might need to get rid of this div */}
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-100 xl:w-1/2 md:w-1/3">
                    <div className="flex flex-col justify-between py-20 overflow-y-auto md:h-screen px-14">
                      <div className="text-xl">
                        <h1>Please login/signup to checkout.</h1>
                      </div>
                      <Highlights />
                      <ul className="flex flex-col gap-8">
                        <li>
                          <NavLink
                            to="/login"
                            className="text-base text-gray-800 dark:text-black focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-gray-800 hover:underline"
                          >
                            <button className="w-full py-5 text-base leading-none text-white bg-gray-800 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                              Login
                            </button>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/register"
                            className="text-base text-gray-800 dark:text-black focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-gray-800 hover:underline"
                          >
                            <button className="w-full py-5 text-base leading-none text-white bg-gray-800 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                              Sign Up
                            </button>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;
