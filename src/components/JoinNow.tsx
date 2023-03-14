import React from "react";
import { NavLink } from "react-router-dom";

type Props = {};

const JoinNow = (props: Props) => {
  return (
    <div className="container mx-auto py-9 md:py-12 px-4 md:px-6 text-black ">
      <NavLink to="/register">
        <div className="flex items-strech justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8 border rounded-xl shadow-2xl">
          <div className="flex flex-col md:flex-row items-strech justify-between bg-gray-50 py-6 px-6 md:py-12 lg:px-12 md:w-8/12 lg:w-7/12 xl:w-8/12 2xl:w-[100%] border rounded-xl shadow-md">
            <div className="flex flex-col justify-center md:w-1/2">
              <h1 className="text-3xl lg:text-4xl font-semibold">
                Become a member
              </h1>
              <p className="text-base lg:text-xl mt-2">
                Sign up for free. Join the community.
              </p>
              <div className="flex gap-4 m-1 mt-4">
                <NavLink to="/login">
                  <button className="border border-white p-2 rounded-lg bg-white text-black hover:text-white hover:bg-black font-semibold shadow-md">
                    Login
                  </button>
                </NavLink>
                <NavLink to="/register">
                  <button className="border border-white p-2 rounded-lg bg-white text-black hover:text-white hover:bg-black font-semibold shadow-md">
                    Signup
                  </button>
                </NavLink>
              </div>
            </div>
            <div className="md:w-[22%] mt-8 md:mt-0 flex items-center justify-center md:justify-end ">
              <p className="text-6xl font-bold text-gray-900">codeThreads</p>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};
export default JoinNow;
