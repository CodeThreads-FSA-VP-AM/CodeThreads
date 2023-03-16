import React, { FC, useEffect, useState } from "react";
import { fetchLogin, updateCart, fetchOAuth } from "../api/api";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import SuccessNotification from "./SuccessNotification";
import jwt_decode from "jwt-decode";

type Props = {
  setToken: (token: string) => void;
  success: boolean;
  setSuccess: any;
  setSuccessTitle: any;
  setSuccessMsg: any;
  setError: any;
  setErrorNoti: any;
};

type Login = {
  username: string;
  password: string;
};
const Login: React.FC<Props> = ({
  setToken,
  success,
  setSuccess,
  setSuccessTitle,
  setSuccessMsg,
  setError,
  setErrorNoti,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [token, setToken] = useState("");
  const [errorMsgs, setErrorMsg] = useState("");
  const [sidebar, setsidebar] = useState();
  const [loading, setLoading] = useState<Boolean>(false);

  const navigate = useNavigate();

  const handleLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const data: Login = { username, password };
    try {
      const login = await fetchLogin(data);
      if (login.error) {
        setErrorMsg(login.error);
        setError(true);
        setErrorNoti("Incorrect user credentials");
      } else {
        console.log(login);
        setErrorMsg("");
        localStorage.setItem("token", login.token);
        setToken(login.token);
        updateCart(login.user.id, login.token);
        setUsername("");
        setPassword("");
        setSuccess(true);
        setSuccessTitle("You're logged in!");
        setSuccessMsg("Lorem ipsum dolor sit amet.");
        navigate("/products");
        setLoading(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  type OAuthLogin = {
    username: string;
  };
  const handleCredentialResponse = async (response: any) => {
    console.log("Encoded JWT ID token: " + response.credential);
    try {
      const userObject: any = await jwt_decode(response.credential);
      console.log(userObject);
      console.log(userObject.name);
      const data: OAuthLogin = {
        username: userObject.name,
      };
      const res = await fetchOAuth(data);
      if (res.error) {
        console.log(res.error);
        setErrorMsg(res.error);
        setError(true);
        setErrorNoti("Incorrect user credentials");
      } else {
        setToken(res.token);
        console.log(res);
        localStorage.setItem("token", res.token);
        setSuccess(true);
        setSuccessTitle("Success!");
        setSuccessMsg("You're logged in!");
        navigate("/products");
        setLoading(true);
      }
    } catch (error) {
      console.error("Error decoding JWT:", error);
    } finally {
      setLoading(false);
    }
  };
  function onClickHandler() {
    console.log("Sign in with Google button clicked...");
  }
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "137794005516-kiiplu4qkptolsv7oga14rts43ecjfbb.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("signinDiv") as HTMLButtonElement,
      {
        theme: "outline",
        size: "large",
        click_listener: onClickHandler,
        type: "standard",
      }
    );
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-full bg-gradient-to-b from-gray-200 to-white w-full pb-[110px] px-4">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full p-10 mt-16 bg-white rounded shadow lg:w-1/3 md:w-1/2">
              <p
                tabIndex={0}
                role="heading"
                aria-label="Login to your account"
                className="text-2xl font-extrabold leading-6 text-gray-800"
              >
                Login to your account
              </p>
              <p className="mt-4 text-sm font-medium leading-none text-gray-500">
                Dont have account?{" "}
                <NavLink
                  to="/register"
                  className="text-sm font-medium leading-none text-gray-800 underline cursor-pointer"
                >
                  {" "}
                  Sign up here
                </NavLink>
              </p>
              <div
                id="signinDiv"
                className="flex items-center justify-center m-4"
              ></div>

              <button
                aria-label="Continue with github"
                role="button"
                className="focus:outline-none  focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4"
              >
                <svg
                  width={21}
                  height={20}
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.1543 0C4.6293 0 0.154298 4.475 0.154298 10C0.153164 12.0993 0.813112 14.1456 2.04051 15.8487C3.26792 17.5517 5.00044 18.8251 6.9923 19.488C7.4923 19.575 7.6793 19.275 7.6793 19.012C7.6793 18.775 7.6663 17.988 7.6663 17.15C5.1543 17.613 4.5043 16.538 4.3043 15.975C4.1913 15.687 3.7043 14.8 3.2793 14.562C2.9293 14.375 2.4293 13.912 3.2663 13.9C4.0543 13.887 4.6163 14.625 4.8043 14.925C5.7043 16.437 7.1423 16.012 7.7163 15.75C7.8043 15.1 8.0663 14.663 8.3543 14.413C6.1293 14.163 3.8043 13.3 3.8043 9.475C3.8043 8.387 4.1913 7.488 4.8293 6.787C4.7293 6.537 4.3793 5.512 4.9293 4.137C4.9293 4.137 5.7663 3.875 7.6793 5.163C8.49336 4.93706 9.33447 4.82334 10.1793 4.825C11.0293 4.825 11.8793 4.937 12.6793 5.162C14.5913 3.862 15.4293 4.138 15.4293 4.138C15.9793 5.513 15.6293 6.538 15.5293 6.788C16.1663 7.488 16.5543 8.375 16.5543 9.475C16.5543 13.313 14.2173 14.163 11.9923 14.413C12.3543 14.725 12.6673 15.325 12.6673 16.263C12.6673 17.6 12.6543 18.675 12.6543 19.013C12.6543 19.275 12.8423 19.587 13.3423 19.487C15.3273 18.8168 17.0522 17.541 18.2742 15.8392C19.4962 14.1373 20.1537 12.0951 20.1543 10C20.1543 4.475 15.6793 0 10.1543 0Z"
                    fill="#333333"
                  />
                </svg>
                <p className="ml-4 text-base font-medium text-gray-700">
                  Continue with Github
                </p>
              </button>
              <button
                aria-label="Continue with twitter"
                role="button"
                className="focus:outline-none  focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4"
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.1623 5.656C21.3989 5.9937 20.5893 6.21548 19.7603 6.314C20.634 5.79144 21.288 4.96902 21.6003 4C20.7803 4.488 19.8813 4.83 18.9443 5.015C18.3149 4.34158 17.4807 3.89497 16.5713 3.74459C15.6618 3.59421 14.7282 3.74849 13.9156 4.18346C13.1029 4.61842 12.4567 5.30969 12.0774 6.1498C11.6981 6.9899 11.607 7.93178 11.8183 8.829C10.1554 8.74566 8.52863 8.31353 7.04358 7.56067C5.55854 6.80781 4.24842 5.75105 3.1983 4.459C2.82659 5.09745 2.63125 5.82323 2.6323 6.562C2.6323 8.012 3.3703 9.293 4.4923 10.043C3.82831 10.0221 3.17893 9.84278 2.5983 9.52V9.572C2.5985 10.5377 2.93267 11.4736 3.54414 12.2211C4.15562 12.9685 5.00678 13.4815 5.9533 13.673C5.33691 13.84 4.6906 13.8647 4.0633 13.745C4.33016 14.5762 4.8503 15.3032 5.55089 15.8241C6.25147 16.345 7.09742 16.6338 7.9703 16.65C7.10278 17.3313 6.10947 17.835 5.04718 18.1322C3.98488 18.4294 2.87442 18.5143 1.7793 18.382C3.69099 19.6114 5.91639 20.2641 8.1893 20.262C15.8823 20.262 20.0893 13.889 20.0893 8.362C20.0893 8.182 20.0843 8 20.0763 7.822C20.8952 7.23017 21.6019 6.49702 22.1633 5.657L22.1623 5.656Z"
                    fill="#1DA1F2"
                  />
                </svg>
                <p className="ml-4 text-base font-medium text-gray-700">
                  Continue with Twitter
                </p>
              </button>
              <div className="flex items-center justify-between w-full py-5">
                <hr className="w-full bg-gray-400" />
                <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
                  OR
                </p>
                <hr className="w-full bg-gray-400 " />
              </div>
              <form onSubmit={handleLogin}>
                <div className="w-full mt-6">
                  <label className="text-sm font-medium leading-none text-gray-800">
                    Username<span className="text-[#F70000]">*</span>
                  </label>
                  <div className="relative flex items-center justify-center">
                    <input
                      aria-label="enter Username"
                      role="input"
                      required
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full py-3 pl-3 mt-2 text-xs font-medium leading-none text-gray-800 bg-gray-200 border rounded focus:outline-none"
                    />
                    <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                          fill="#71717A"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-full mt-6">
                  <label className="text-sm font-medium leading-none text-gray-800">
                    Password<span className="text-[#F70000]">*</span>
                  </label>
                  <div className="relative flex items-center justify-center">
                    <input
                      aria-label="enter Password"
                      role="input"
                      type="password"
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-3 pl-3 mt-2 text-xs font-medium leading-none text-gray-800 bg-gray-200 border rounded focus:outline-none"
                    />
                    <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                          fill="#71717A"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <button
                    role="button"
                    aria-label="Log In"
                    type="submit"
                    className="w-full py-4 text-sm font-semibold leading-none text-white bg-indigo-700 border rounded focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none hover:bg-indigo-600"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
