import React, { useState, FormEvent, useEffect } from "react";
import { fetchRegister } from "../api/api";
import Loader from "./Loader";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
// type Props = {};

type Register = {
  username: string;
  password: string;
  email: string;
  avatar_url: string;
};
type Props = {
  setToken: (token: string) => void;
  success: boolean;
  setSuccess: any;
  setSuccessTitle: any;
  setSuccessMsg: any;
};
const Register: React.FC<Props> = ({
  setToken,
  success,
  setSuccess,
  setSuccessTitle,
  setSuccessMsg,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");
  // const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [sidebar, setsidebar] = useState();
  const [loading, setLoading] = useState<Boolean>(false);
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const data: Register = { username, password, email, avatar_url };
    try {
      const register = await fetchRegister(data);
      if (register.error) {
        setErrorMsg(register.error);
      } else {
        console.log(register);
        setToken(register.token);
        setErrorMsg("");
        localStorage.setItem("token", register.token);
        setUsername("");
        setPassword("");
        setEmail("");
        setLoading(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  type OAuthRegister = {
    username: string;
    password: string;
    email: string;
    avatar_url: string;
  };
  const handleCredentialResponse = async (response: any) => {
    console.log("Encoded JWT ID token: " + response.credential);
    try {
      const userObject: any = await jwt_decode(response.credential);
      console.log(userObject);
      if (userObject) {
        setUser(userObject);
      }
      const data: OAuthRegister = {
        username: userObject.name,
        email: userObject.email,
        avatar_url: userObject.picture,
        password: "",
      };
      const res = await fetchRegister(data);
      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setToken(res.token);
        console.log(res);
        localStorage.setItem("token", res.token);
        setSuccess(true);
        setSuccessTitle("Success!");
        setSuccessMsg("You're signed up!");
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
        width: "400",
      }
    );
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full h-full px-4 bg-gradient-to-b from-gray-200 to-white pb-9">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full p-10 mt-16 bg-white rounded shadow lg:w-1/3 md:w-1/2">
              <p
                tabIndex={0}
                role="heading"
                aria-label="Sign Up"
                className="text-2xl font-extrabold leading-6 text-gray-800"
              >
                Sign Up
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
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm font-medium leading-none text-gray-800">
                    Email<span className="text-[#F70000]">*</span>
                  </label>
                  <input
                    aria-label="enter email adress"
                    role="input"
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-3 pl-3 mt-2 text-xs font-medium leading-none text-gray-800 bg-gray-200 border rounded focus:outline-none"
                  />
                </div>
                <div className="w-full mt-6">
                  <label className="text-sm font-medium leading-none text-gray-800">
                    Username<span className="text-[#F70000]">*</span>
                  </label>
                  <div className="relative flex items-center justify-center">
                    <input
                      aria-label="enter Username"
                      role="input"
                      type="text"
                      required
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
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-3 pl-3 mt-2 text-xs font-medium leading-none text-gray-800 bg-gray-200 border rounded focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <button
                    role="button"
                    type="submit"
                    aria-label="create my account"
                    className="w-full py-4 text-sm font-semibold leading-none text-white bg-indigo-700 border rounded focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none hover:bg-indigo-600"
                  >
                    Create my account
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

export default Register;
