import React, { FC, useEffect, useState } from "react";
import { createWishlist } from "../api/api";
type Props = {
  quantity: number;
  token: string;
};
const WishList: FC<Props> = ({ quantity, token }) => {
  const [show1, setshow1] = useState(true);

  return (
    <>
      <div className="py-5">
        <div className="border-t border-gray-900" />
      </div>
      <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
        <div className="flex flex-col jusitfy-start items-start">
          <div className="mt-3">
            <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800">
              Wishlist
            </h1>
          </div>
          <div className="mt-4">
            <p className="text-2xl tracking-tight leading-6 text-gray-600">
              01 item
            </p>
          </div>
          <div className=" mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0">
            <div className="flex flex-col">
              <div className="relative">
                <img
                  className="hidden lg:block rounded-xl shadow-2xl"
                  src="https://i.ibb.co/SsmkhPq/Rectangle-23.png"
                  alt="bag"
                />
                <img
                  className="hidden sm:block lg:hidden"
                  src="https://i.ibb.co/ZH9FmZL/Rectangle-23-1.png"
                  alt="bag"
                />
                <img
                  className=" sm:hidden"
                  src="https://i.ibb.co/cyN26yn/Rectangle-23.png"
                  alt="bag"
                />
              </div>
              <div className="mt-6 flex justify-between items-center">
                <div className="flex justify-center items-center">
                  <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800">
                    New York Streak
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    aria-label="show menu"
                    onClick={() => setshow1(!show1)}
                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2.5 px-2 bg-gray-800 text-white hover:text-gray-400"
                  >
                    <svg
                      className={`fill-stroke ${show1 ? "block" : "hidden"}`}
                      width={10}
                      height={6}
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 5L5 1L1 5"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg
                      className={`fill-stroke ${show1 ? "hidden" : "block"}`}
                      width={10}
                      height={6}
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div
                id="menu1"
                className={` flex-col jusitfy-start items-start mt-12 ${
                  show1 ? "flex" : "hidden"
                }`}
              >
                <div>
                  <p className="tracking-tight text-xs leading-3 text-gray-800">
                    MK617
                  </p>
                </div>
                <div className="mt-2">
                  <p className="tracking-tight text-base font-medium leading-4 text-gray-800">
                    Beige brown
                  </p>
                </div>
                <div className="mt-6">
                  <p className="tracking-tight text-base font-medium leading-4 text-gray-800">
                    42 size
                  </p>
                </div>
                <div className="mt-6">
                  <p className="tracking-tight text-base font-medium leading-4 text-gray-800">
                    $1,000
                  </p>
                </div>
                <div className="flex jusitfy-between flex-col lg:flex-row items-center mt-10 w-full  space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                  <div className="w-full">
                    <button className=" focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-black w-full tracking-tight py-4 text-lg leading-4 hover:bg-red-600 hover:text-white bg-gray-400 border border-gray-800">
                      Remove
                    </button>
                  </div>
                  <div className="w-full">
                    <button className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2  text-white w-full tracking-tight py-4 text-lg leading-4  hover:bg-black bg-gray-800 border border-gray-800">
                      Add to cart
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

export default WishList;
