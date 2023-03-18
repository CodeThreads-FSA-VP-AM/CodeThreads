import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

type Props = {
  user: any;
  token: string;
  setToken: (token: string) => void;
  wishListLength: number;
  ordersLength: number;
};

const Navbar: React.FC<Props> = ({
  user,
  token,
  setToken,
  wishListLength,
  ordersLength,
}) => {
  const [mdOptionsToggle, setMdOptionsToggle] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [profile, setProfile] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/home");
  };

  useEffect(() => {}, [wishListLength, ordersLength]);
  return (
    <>
      <div>
        <div className="relative">
          {/* For large screens */}
          <div className="px-6 bg-white py-9">
            <div className="container flex items-center justify-between mx-auto">
              <NavLink to="/">
                <h1
                  className="text-2xl text-gray-800 cursor-pointer md:w-2/12 dark:text-black"
                  aria-label="code Threads."
                >
                  codeThreads
                </h1>
              </NavLink>

              <ul
                className="items-center justify-center hidden w-8/12 space-x-8 md:flex"
                id="navBar"
              >
                <li>
                  <NavLink
                    to="/home"
                    className="text-base text-gray-800 dark:text-black hover:text-[#433BBD]"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/featured"
                    className="text-base text-gray-800 dark:text-black hover:text-[#433BBD]"
                  >
                    Featured
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/mens"
                    className="text-base text-gray-800 dark:text-black hover:text-[#433BBD]"
                  >
                    Mens
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/womens"
                    className="text-base text-gray-800 dark:text-black hover:text-[#433BBD]"
                  >
                    Womens
                  </NavLink>
                </li>
                {user.is_admin && (
                  <li>
                    <NavLink
                      to="/admin"
                      className="text-base text-gray-800 dark:text-black hover:text-[#433BBD]"
                    >
                      Admin
                    </NavLink>
                  </li>
                )}
                {!token && (
                  <>
                    <li>
                      <NavLink
                        to="./login"
                        className="text-base text-gray-800 dark:text-black hover:underline"
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="./register"
                        className="text-base text-gray-800 dark:text-black hover:underline"
                      >
                        Sign Up
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>

              <div className="flex items-center justify-end space-x-4 md:w-2/12 xl:space-x-8">
                <div className="items-center hidden space-x-4 lg:flex xl:space-x-8">
                  {token && (
                    <button
                      aria-label="view favourites"
                      className="text-gray-800 dark:hover:text-gray-900 dark:text-black"
                    >
                      <NavLink to="/wishlist" className="flex">
                        <svg
                          className="fill-stroke"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.8401 4.60987C20.3294 4.09888 19.7229 3.69352 19.0555 3.41696C18.388 3.14039 17.6726 2.99805 16.9501 2.99805C16.2276 2.99805 15.5122 3.14039 14.8448 3.41696C14.1773 3.69352 13.5709 4.09888 13.0601 4.60987L12.0001 5.66987L10.9401 4.60987C9.90843 3.57818 8.50915 2.99858 7.05012 2.99858C5.59109 2.99858 4.19181 3.57818 3.16012 4.60987C2.12843 5.64156 1.54883 7.04084 1.54883 8.49987C1.54883 9.95891 2.12843 11.3582 3.16012 12.3899L4.22012 13.4499L12.0001 21.2299L19.7801 13.4499L20.8401 12.3899C21.3511 11.8791 21.7565 11.2727 22.033 10.6052C22.3096 9.93777 22.4519 9.22236 22.4519 8.49987C22.4519 7.77738 22.3096 7.06198 22.033 6.39452C21.7565 5.72706 21.3511 5.12063 20.8401 4.60987V4.60987Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="text-[14px]">
                          {wishListLength ? (
                            <div
                              className={`animate-pulse w-4 h-4 bg-red-600 text-sm rounded-full flex justify-center items-center m-auto ${
                                wishListLength > 0 ? "text-white" : "hidden"
                              }`}
                            >
                              {wishListLength}
                            </div>
                          ) : null}
                        </p>
                      </NavLink>
                    </button>
                  )}
                  <button
                    aria-label="go to cart"
                    className="text-gray-800 dark:hover:text-gray-300 dark:text-black"
                  >
                    <NavLink to="/orders" className="flex">
                      <svg
                        className="fill-stroke"
                        width={26}
                        height={26}
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 1L1 5.8V22.6C1 23.2365 1.28095 23.847 1.78105 24.2971C2.28115 24.7471 2.95942 25 3.66667 25H22.3333C23.0406 25 23.7189 24.7471 24.219 24.2971C24.719 23.847 25 23.2365 25 22.6V5.8L21 1H5Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1 5.7998H25"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18.3346 10.6001C18.3346 11.8731 17.7727 13.094 16.7725 13.9942C15.7723 14.8944 14.4158 15.4001 13.0013 15.4001C11.5868 15.4001 10.2303 14.8944 9.23007 13.9942C8.22987 13.094 7.66797 11.8731 7.66797 10.6001"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-[14px]">
                        {ordersLength ? (
                          <div
                            className={`animate-pulse w-4 h-4 bg-red-600 text-sm rounded-full flex justify-center items-center m-auto ${
                              ordersLength > 0 ? "text-white" : "hidden"
                            }`}
                          >
                            {ordersLength}
                          </div>
                        ) : null}
                      </p>
                    </NavLink>
                  </button>
                  {token && (
                    <>
                      <div className="flex items-center">
                        <div
                          aria-haspopup="true"
                          className="relative flex items-center justify-end w-full cursor-pointer"
                          onClick={() => setProfile(!profile)}
                        >
                          <div className="flex items-center justify-center w-8 h-full text-gray-600 border-r cursor-pointer">
                            {profile ? (
                              <ul className="absolute left-0 z-40 w-40 p-2 mt-48 bg-white border-r rounded shadow ">
                                <li
                                  className="py-2 text-sm leading-3 tracking-normal text-gray-600 cursor-pointer hover:text-indigo-700 focus:text-indigo-700 focus:outline-none"
                                  onClick={() => navigate("/userprofile")}
                                >
                                  <div className="flex items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="icon icon-tabler icon-tabler-grid"
                                      width={18}
                                      height={18}
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      fill="none"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path stroke="none" d="M0 0h24v24H0z" />
                                      <rect
                                        x={4}
                                        y={4}
                                        width={6}
                                        height={6}
                                        rx={1}
                                      />
                                      <rect
                                        x={14}
                                        y={4}
                                        width={6}
                                        height={6}
                                        rx={1}
                                      />
                                      <rect
                                        x={4}
                                        y={14}
                                        width={6}
                                        height={6}
                                        rx={1}
                                      />
                                      <rect
                                        x={14}
                                        y={14}
                                        width={6}
                                        height={6}
                                        rx={1}
                                      />
                                    </svg>
                                    <span className="ml-2">My Profile</span>
                                  </div>
                                </li>

                                <li
                                  className="flex items-center py-2 mt-2 text-sm leading-3 tracking-normal text-gray-600 cursor-pointer hover:text-indigo-700 focus:text-indigo-700 focus:outline-none"
                                  onClick={() => navigate("/accountsettings")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-settings"
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <circle cx={12} cy={12} r={3} />
                                  </svg>
                                  <span className="ml-2">Account Settings</span>
                                </li>
                                <li className="flex items-center py-2 mt-2 text-sm leading-3 tracking-normal text-gray-600 cursor-pointer hover:text-red-700 focus:text-indigo-700 focus:outline-none">
                                  <button onClick={logout}>
                                    <div className="flex items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="icon icon-tabler icon-tabler-user"
                                        width={20}
                                        height={20}
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <circle cx={12} cy={7} r={4} />
                                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                      </svg>{" "}
                                      <span className="ml-2">Log Out</span>
                                    </div>
                                  </button>
                                </li>
                              </ul>
                            ) : (
                              ""
                            )}
                          </div>
                          {user.avatar_url === null ? (
                            <img
                              className="object-cover rounded-full w-9 h-9"
                              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80"
                              alt="default"
                            />
                          ) : (
                            <img
                              className="object-cover w-12 h-12 rounded-full"
                              src={user.avatar_url}
                              alt="default"
                            />
                          )}
                          <p className="ml-2 text-sm text-gray-800">
                            {user.username}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex lg:hidden">
                  <button
                    aria-label="show options"
                    onClick={() => setMdOptionsToggle(!mdOptionsToggle)}
                    className="hidden text-black rounded dark:text-black dark:hover:text-gray-300 md:flex focus:outline-none focus:ring-2 focus:ring-gray-600"
                  >
                    <svg
                      className="fill-stroke"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 6H20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 12H20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 18H20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    aria-label="open menu"
                    onClick={() => setShowMenu(true)}
                    className="text-black rounded dark:text-black dark:hover:text-gray-300 md:hidden focus:outline-none focus:ring-2 focus:ring-gray-600"
                  >
                    <svg
                      className="fill-stroke"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 6H20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 12H20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 18H20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* For small screen */}
          <div className="bg-opacity-0">
            <div
              id="mobile-menu"
              className={`${
                showMenu ? "flex" : "hidden"
              } absolute dark:bg-white z-10 inset-0 md:hidden bg-black flex-col h-screen w-full`}
            >
              <div className="flex items-center justify-between p-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowMenu(false)}
                  aria-label="close menu"
                  className="rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                >
                  <svg
                    className="text-gray-800 fill-stroke dark:text-black"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4L4 12"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 4L12 12"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4 mt-6">
                <ul
                  className="flex flex-col space-y-6"
                  id="navBar"
                  onClick={() => setShowMenu(false)}
                >
                  <li>
                    <NavLink
                      to="/home"
                      className="text-base text-gray-800 dark:text-black hover:text-[#433BBD]"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/featured"
                      className="text-base text-gray-800 dark:text-black hover:text-[#433BBD]"
                    >
                      Featured
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/mens"
                      className="text-base text-gray-800 dark:text-black hover:text-[#433BBD]"
                    >
                      Mens
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/womens"
                      className="text-base text-gray-800 dark:text-black hover:text-[#433BBD]"
                    >
                      Womens
                    </NavLink>
                  </li>
                  {user.is_admin && (
                    <li>
                      <NavLink
                        to="/admin"
                        className="text-base text-gray-800 dark:text-black hover:text-[#433BBD]"
                      >
                        Admin
                      </NavLink>
                    </li>
                  )}
                  {!token ? (
                    <ul id="navBar">
                      <li>
                        <NavLink
                          to="./login"
                          className="text-base text-gray-800 dark:text-black hover:underline"
                        >
                          Login
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="./register"
                          className="text-base text-gray-800 dark:text-black hover:underline"
                        >
                          Sign Up
                        </NavLink>
                      </li>
                    </ul>
                  ) : (
                    <ul id="navBar">
                      {" "}
                      <li className="" onClick={() => navigate("/userprofile")}>
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-grid"
                            width={18}
                            height={18}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <rect x={4} y={4} width={6} height={6} rx={1} />
                            <rect x={14} y={4} width={6} height={6} rx={1} />
                            <rect x={4} y={14} width={6} height={6} rx={1} />
                            <rect x={14} y={14} width={6} height={6} rx={1} />
                          </svg>
                          <span className="ml-2">My Profile</span>
                        </div>
                      </li>
                      <li
                        className="flex items-center py-2 mt-2 text-sm leading-3 tracking-normal text-gray-600 cursor-pointer hover:text-indigo-700 focus:text-indigo-700 focus:outline-none"
                        onClick={() => navigate("/accountsettings")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-settings"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <circle cx={12} cy={12} r={3} />
                        </svg>
                        <span className="ml-2">Account Settings</span>
                      </li>
                      <li className="flex items-center py-2 mt-2 text-sm leading-3 tracking-normal text-gray-600 cursor-pointer hover:text-red-700 focus:text-indigo-700 focus:outline-none">
                        <button onClick={logout}>
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-user"
                              width={20}
                              height={20}
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <circle cx={12} cy={7} r={4} />
                              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>{" "}
                            <span className="ml-2">Log Out</span>
                          </div>
                        </button>
                      </li>
                    </ul>
                  )}
                </ul>
              </div>

              <div className="flex items-end h-full">
                <ul
                  className="flex flex-col w-full p-4 py-10 space-y-8 bg-white"
                  onClick={() => setShowMenu(false)}
                >
                  <li>
                    <NavLink to="/orders" className="flex gap-2">
                      <div className="flex items-center space-x-2 text-gray-800 dark:text-black focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                        <svg
                          className="fill-stroke"
                          width={22}
                          height={22}
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.33333 1L1 5V19C1 19.5304 1.23413 20.0391 1.65087 20.4142C2.06762 20.7893 2.63285 21 3.22222 21H18.7778C19.3671 21 19.9324 20.7893 20.3491 20.4142C20.7659 20.0391 21 19.5304 21 19V5L17.6667 1H4.33333Z"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M1 5H21"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.4436 9C15.4436 10.0609 14.9753 11.0783 14.1418 11.8284C13.3083 12.5786 12.1779 13 10.9991 13C9.82039 13 8.68993 12.5786 7.85643 11.8284C7.02294 11.0783 6.55469 10.0609 6.55469 9"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="text-base">Cart</p>
                    </NavLink>
                  </li>
                  {token && (
                    <li>
                      <NavLink className="flex gap-2" to="/wishlist">
                        <div className="flex items-center space-x-2 text-gray-800 dark:text-black focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                          <svg
                            className="fill-stroke"
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.3651 3.84172C16.9395 3.41589 16.4342 3.0781 15.8779 2.84763C15.3217 2.61716 14.7255 2.49854 14.1235 2.49854C13.5214 2.49854 12.9252 2.61716 12.369 2.84763C11.8128 3.0781 11.3074 3.41589 10.8818 3.84172L9.99847 4.72506L9.11514 3.84172C8.25539 2.98198 7.08933 2.49898 5.87347 2.49898C4.65761 2.49898 3.49155 2.98198 2.6318 3.84172C1.77206 4.70147 1.28906 5.86753 1.28906 7.08339C1.28906 8.29925 1.77206 9.46531 2.6318 10.3251L3.51514 11.2084L9.99847 17.6917L16.4818 11.2084L17.3651 10.3251C17.791 9.89943 18.1288 9.39407 18.3592 8.83785C18.5897 8.28164 18.7083 7.68546 18.7083 7.08339C18.7083 6.48132 18.5897 5.88514 18.3592 5.32893C18.1288 4.77271 17.791 4.26735 17.3651 3.84172V3.84172Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="text-[14px]">
                            {wishListLength ? (
                              <div
                                className={`animate-pulse w-4 h-4 bg-red-600 text-sm rounded-full flex justify-center items-center m-auto ${
                                  wishListLength > 0 ? "text-white" : "hidden"
                                }`}
                              >
                                {wishListLength}
                              </div>
                            ) : null}
                          </p>
                        </div>
                        <p className="text-base">Wishlist</p>
                      </NavLink>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
