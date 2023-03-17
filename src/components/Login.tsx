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

        setSuccessTitle("Success!");
        setSuccessMsg("You're logged in!");
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
        width: "250",
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
                Dont have an account?{" "}
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
                className=" border border-black p-4 border-x-[transparent] flex items-center justify-center m-4"
              ></div>
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
