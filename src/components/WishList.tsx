import React, { FC, useEffect, useState } from "react";
import {
  createOrder,
  deleteWishlist,
  fetchUser,
  fetchWishlistByUser,
} from "../api/api";
import { User, WishlistData } from "./Interfaces";
type Props = {
  quantity: number;
  setSuccess: any;
  setSuccessTitle: any;
  setSuccessMsg: any;
};
const WishList: FC<Props> = ({
  setSuccess,
  setSuccessMsg,
  setSuccessTitle,
}) => {
  const [wishlist, setWishlist] = useState<WishlistData[]>([]);
  const [show, setShow] = useState(Array(wishlist.length).fill(false));
  const [userId, setUserId] = useState(0);
  const [wishlistId, setWishlistId] = useState(0);
  const [token, setToken] = useState("");
  const removeItemFromWishlist = (productId: number) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.product_id !== productId
    );
    setWishlist(updatedWishlist);
  };
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
      setSuccess(true);
      setSuccessTitle("Success!");
      setSuccessMsg("Item added to cart!");
      removeItemFromWishlist(product_id);
      console.log(res);
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
      setWishlist(wishlist.filter((wish) => wish.product_id !== product_id));
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
      const getorderid = wishlists.filter(
        (o: { status: string }) => o.status === "added"
      );
      console.log(getorderid);

      const orderid = getorderid[0];
      if (orderid?.order_id !== undefined) {
        setWishlistId(orderid.order_id);
      }

      const filteredWishlist = wishlists.filter(
        (wishlist: { users_id: number; status: string }) =>
          wishlist.users_id === userId && wishlist.status === "added"
      );
      setWishlist(filteredWishlist);
    };

    if (userId !== undefined) {
      fetchWishlist(userId);
    }
  }, [token, userId, wishlistId]);
  return (
    <>
      <div className="py-5">
        <div className="border-t border-gray-900" />
      </div>
      <div className="mt-3 ">
        <h1 className="text-3xl lg:text-4xl flex justify-center items-center tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800">
          Wishlist
        </h1>
        <div className="mx-auto container gap-6 flex-wrap px-4 md:px-6 2xl:px-0 py-12 flex ">
          <div className="flex flex-row jusitfy-start items-start"></div>
          {wishlist.map((w: WishlistData, idx) => (
            <div
              className="mt-10 lg:mt-12 w-auto h-full flex flex-row lg:flex-col gap-x-8 gap-y-10 lg:gap-y-0"
              key={idx}
            >
              <div className="flex flex-col h-full">
                <div className="relative block mb-2 overflow-hidden bg-gray-100 rounded-lg shadow-lg group h-[20rem] lg:mb-3">
                  <img
                    className="hidden lg:block rounded-xl shadow-2xl h-full "
                    src={w.front_url}
                    alt="product"
                  />
                  <img
                    className="hidden sm:block lg:hidden w-full h-full"
                    src={w.front_url}
                    alt="product"
                  />
                  <img
                    className=" sm:hidden h-full w-full"
                    src={w.front_url}
                    alt="product"
                  />
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <div className="flex justify-center items-center">
                    <p className="tracking-tight text-md font-semibold leading-6 text-gray-800 capitalize">
                      {w.title}
                    </p>
                  </div>
                  <div className="flex justify-center items-center">
                    <button
                      aria-label="show menu"
                      onClick={() => {
                        const newShow = [...show];
                        newShow[idx] = !newShow[idx];
                        setShow(newShow);
                      }}
                      className="focus:outline-none text-xs focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-1 px-1 rounded-md bg-gray-800 text-white hover:text-gray-400"
                    >
                      {show[idx] ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div
                  id={`menu${idx}`}
                  className={` flex-col jusitfy-start items-start mt-12 ${
                    show[idx] ? "flex" : "hidden"
                  }`}
                >
                  <div>
                    <p className="tracking-tight text-xs leading-3 text-gray-800 capitalize">
                      {w.description}
                    </p>
                  </div>

                  <div className="mt-6">
                    <p className="tracking-tight text-xs font-medium leading-4 text-gray-800">
                      ${w.price}
                    </p>
                  </div>
                  <div className="flex jusitfy-between flex-col lg:flex-row items-center mt-10 w-full  space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                    <div className="w-full">
                      <button
                        onClick={() => handleDeletewishlist(w.product_id)}
                        className=" focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 rounded-md text-black w-full tracking-tight py-2 text-md leading-4 hover:bg-red-600 hover:text-white bg-gray-400 border border-gray-800"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="w-full">
                      <button
                        onClick={(e) =>
                          addProductToCart(e, Number(w.product_id))
                        }
                        className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 rounded-md text-white w-full tracking-tight py-2 text-md leading-4  hover:bg-green-600 bg-gray-800 border border-gray-800"
                      >
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
