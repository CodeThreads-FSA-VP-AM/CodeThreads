import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const JoinNow: React.FC = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token") ?? "");
  }, []);
  return (
    <div className="container px-4 mx-auto text-black py-9 md:py-12 md:px-6 ">
      <NavLink to="/register">
        <div className="flex flex-col justify-center space-y-4 border shadow-2xl items-strech md:flex-row md:space-y-0 md:space-x-6 lg:space-x-8 rounded-xl">
          <div className="flex flex-col md:flex-row items-strech justify-between bg-gray-50 py-6 px-6 md:py-12 lg:px-12 w-[100%] border rounded-xl shadow-md">
            <div className="flex flex-col justify-center w-auto">
              <h1 className="text-3xl font-semibold lg:text-4xl">
                {!token ? "Become a member" : "Browse new products"}
              </h1>
              <p className="mt-2 text-base lg:text-xl">
                {!token ? "Sign up for free. Join the community." : "New Arrivals"}
              </p>
              {!token ? (
                <div className="flex gap-4 m-1 mt-4 lg:text-xl md:text-md sm:text-sm">
                  <NavLink to="/login">
                    <button className="p-2 font-semibold text-black bg-white border border-white rounded-lg shadow-md hover:text-white hover:bg-black">
                      Login
                    </button>
                  </NavLink>
                  <NavLink to="/register">
                    <button className="p-2 font-semibold text-black bg-white border border-white rounded-lg shadow-md hover:text-white hover:bg-black">
                      Signup
                    </button>
                  </NavLink>
                </div>
              ) : (
                <div className="flex gap-4 m-1 mt-4 lg:text-xl md:text-md sm:text-sm">
                  <NavLink to="/mens">
                    <button className="p-2 font-semibold text-black bg-white border border-white rounded-lg shadow-md hover:text-white hover:bg-black">
                      Men
                    </button>
                  </NavLink>
                  <NavLink to="/womens">
                    <button className="p-2 font-semibold text-black bg-white border border-white rounded-lg shadow-md hover:text-white hover:bg-black">
                      Women
                    </button>
                  </NavLink>
                </div>
              )}
            </div>
            <div className="md:w-[22%] mt-8 md:mt-0 flex items-center justify-center md:justify-end ">
              <p className="font-bold text-gray-900  lg:text-6xl md:text-3xl">codeThreads</p>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};
export default JoinNow;
