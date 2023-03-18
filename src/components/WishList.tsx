import React, { FC, useEffect, useState } from "react";
import { createOrder, deleteWishlist, fetchUser, fetchWishlistByUser } from "../api/api";
import { User, WishlistData } from "./Interfaces";

type Props = {
  quantity: number;
  setSuccess: any;
  setSuccessTitle: any;
  setSuccessMsg: any;
  wishlist: any;
  setWishlist: any;
};
const WishList: FC<Props> = ({
  setSuccess,
  setSuccessMsg,
  setSuccessTitle,
  wishlist,
  setWishlist,
}) => {
  const [show, setShow] = useState(Array(wishlist.length).fill(false));
  const [userId, setUserId] = useState(0);
  const [wishlistId, setWishlistId] = useState(0);
  const [token, setToken] = useState("");

  const addProductToCart = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    product_id: number
  ) => {
    e.preventDefault();
    try {
      const res = await createOrder({
        product_id: product_id,
        quantity: 1,
        token: token,
      });
      console.log("got here from orders adding to cart");
      console.log(res);
      console.log(wishlist, "before filter upon adding", product_id);
      setWishlist(
        wishlist.filter((wish: { product_id: number }) => wish.product_id !== product_id)
      );
      console.log(wishlist, "After filter upon adding");
      handleDeletewishlist(product_id);
      console.log("got here from orders adding to cart");
      setSuccess(true);
      setSuccessTitle("Success!");
      setSuccessMsg("Item added to cart!");
    } catch (error) {
      console.error();
    }
  };

  const handleDeletewishlist = async (product_id: number) => {
    try {
      const res = await deleteWishlist({
        product_id,
        token: token,
      });
      console.log(res);
      setWishlist(
        wishlist.filter((wish: { product_id: number }) => wish.product_id !== product_id)
      );
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
    const fetchWishlist = async (userId: number) => {
      const wishlists = await fetchWishlistByUser(userId);
      console.log(wishlists);

      const filteredWishlist = wishlists.filter(
        (wishlist: { users_id: number; status: string }) => wishlist.users_id === userId
      );
      setWishlist(filteredWishlist);
    };

    if (userId !== undefined) {
      fetchWishlist(userId);
    }
  }, [token, userId, wishlistId]);
  useEffect(() => {
    setWishlist(wishlist);
  }, [wishlist]);
  return (
    <>
      <div className="py-5">
        <div className="border-t border-gray-900" />
      </div>
      <div className="h-screen mt-3">
        <h1 className="flex items-center justify-center text-3xl font-semibold leading-8 tracking-tight text-gray-800 lg:text-4xl lg:leading-9">
          Wishlist
        </h1>
        <div className="container flex flex-wrap gap-6 px-4 py-12 mx-auto md:px-6 2xl:px-0 ">
          <div className="flex flex-row items-start jusitfy-start"></div>
          {wishlist.map((w: WishlistData, idx: any) => (
            <div
              className="flex flex-row w-auto h-full mt-10 lg:mt-12 lg:flex-col gap-x-8 gap-y-10 lg:gap-y-0"
              key={idx}>
              <div className="flex flex-col h-full">
                <div className="relative block mb-2 overflow-hidden bg-gray-100 rounded-lg shadow-lg group h-[20rem] lg:mb-3">
                  <img
                    className="hidden h-full shadow-2xl lg:block rounded-xl "
                    src={w.front_url}
                    alt="product"
                  />
                  <img
                    className="hidden w-full h-full sm:block lg:hidden"
                    src={w.front_url}
                    alt="product"
                  />
                  <img className="w-full h-full  sm:hidden" src={w.front_url} alt="product" />
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center justify-center">
                    <p className="font-semibold leading-6 tracking-tight text-gray-800 capitalize text-md">
                      {w.title}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      aria-label="show menu"
                      onClick={() => {
                        const newShow = [...show];
                        newShow[idx] = !newShow[idx];
                        setShow(newShow);
                      }}
                      className="px-1 py-1 text-xs text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:text-gray-400">
                      {show[idx] ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div
                  id={`menu${idx}`}
                  className={` flex-col jusitfy-start items-start mt-12 ${
                    show[idx] ? "flex" : "hidden"
                  }`}>
                  <div>
                    <p className="text-xs leading-3 tracking-tight text-gray-800 capitalize">
                      {w.description}
                    </p>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-medium leading-4 tracking-tight text-gray-800">
                      ${w.price}
                    </p>
                  </div>
                  <div className="flex flex-col items-center w-full mt-10 space-y-4 jusitfy-between lg:flex-row lg:space-y-0 lg:space-x-4 xl:space-x-8">
                    <div className="w-full">
                      <button
                        onClick={() => handleDeletewishlist(w.product_id)}
                        className="w-full py-2 leading-4 tracking-tight text-black bg-gray-400 border border-gray-800 rounded-md  focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-md hover:bg-red-600 hover:text-white">
                        Remove
                      </button>
                    </div>
                    <div className="w-full">
                      <button
                        onClick={(e) => addProductToCart(e, Number(w.product_id))}
                        className="w-full py-2 leading-4 tracking-tight text-white bg-gray-800 border border-gray-800 rounded-md focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-md hover:bg-green-600">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WishList;
