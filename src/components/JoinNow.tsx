import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

type Props = {};

const JoinNow = (props: Props) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token") ?? "");
  }, []);
  return (
    <div className="container mx-auto py-9 md:py-12 px-4 md:px-6 text-black ">
      <NavLink to="/register">
        <div className="flex items-strech justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8 border rounded-xl shadow-2xl">
          <div className="flex flex-col md:flex-row items-strech justify-between bg-gray-50 py-6 px-6 md:py-12 lg:px-12 w-[100%] border rounded-xl shadow-md">
            <div className="flex flex-col justify-center w-auto">
              <h1 className="text-3xl lg:text-4xl font-semibold">
                {!token ? "Become a member" : "Browse new products"}
              </h1>
              <p className="text-base lg:text-xl mt-2">
                {!token
                  ? "Sign up for free. Join the community."
                  : "New Arrivals"}
              </p>
              {!token ? (
                <div className="flex gap-4 m-1 mt-4 lg:text-xl md:text-md sm:text-sm">
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
              ) : (
                <div className="flex gap-4 m-1 mt-4 lg:text-xl md:text-md sm:text-sm">
                  <NavLink to="/mens">
                    <button className="border border-white p-2 rounded-lg bg-white text-black hover:text-white hover:bg-black font-semibold shadow-md">
                      Men
                    </button>
                  </NavLink>
                  <NavLink to="/womens">
                    <button className="border border-white p-2 rounded-lg bg-white text-black hover:text-white hover:bg-black font-semibold shadow-md">
                      Women
                    </button>
                  </NavLink>
                </div>
              )}
            </div>
            <div className="md:w-[22%] mt-8 md:mt-0 flex items-center justify-center md:justify-end ">
              <p className=" lg:text-6xl md:text-3xl font-bold text-gray-900">
                codeThreads
              </p>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};
export default JoinNow;
