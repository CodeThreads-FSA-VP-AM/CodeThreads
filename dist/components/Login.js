"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const api_1 = require("../api/api");
const react_router_dom_1 = require("react-router-dom");
const Loader_1 = __importDefault(require("./Loader"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const Login = ({ setToken, success, setSuccess, setSuccessTitle, setSuccessMsg, setError, setErrorNoti, }) => {
    const [username, setUsername] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [errorMsgs, setErrorMsg] = (0, react_1.useState)("");
    const [loading, setLoading] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleLogin = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const data = { username, password };
        try {
            const login = yield (0, api_1.fetchLogin)(data);
            if (login.error) {
                setErrorMsg(login.error);
                setError(true);
                setErrorNoti("Incorrect user credentials");
            }
            else {
                console.log(login);
                setErrorMsg("");
                localStorage.setItem("token", login.token);
                setToken(login.token);
                (0, api_1.updateCart)(login.user.id, login.token);
                setUsername("");
                setPassword("");
                setSuccess(true);
                setSuccessTitle("Success!");
                setSuccessMsg("You're logged in!");
                navigate("/products");
                setLoading(true);
            }
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    });
    const handleCredentialResponse = (response) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Encoded JWT ID token: " + response.credential);
        try {
            const userObject = yield (0, jwt_decode_1.default)(response.credential);
            console.log(userObject);
            console.log(userObject.name);
            const data = {
                username: userObject.name,
            };
            const res = yield (0, api_1.fetchOAuth)(data);
            if (res.error) {
                console.log(res.error);
                setErrorMsg(res.error);
                setError(true);
                setErrorNoti("Incorrect user credentials");
            }
            else {
                console.log(res);
                localStorage.setItem("token", res.token);
                setToken(res.token);
                (0, api_1.updateCart)(res.user.id, res.token);
                setSuccess(true);
                setSuccessTitle("Success!");
                setSuccessMsg("You're logged in!");
                navigate("/products");
                setLoading(true);
            }
        }
        catch (error) {
            console.error("Error decoding JWT:", error);
        }
        finally {
            setLoading(false);
        }
    });
    function onClickHandler() {
        console.log("Sign in with Google button clicked...");
    }
    (0, react_1.useEffect)(() => {
        google.accounts.id.initialize({
            client_id: "137794005516-kiiplu4qkptolsv7oga14rts43ecjfbb.apps.googleusercontent.com",
            callback: handleCredentialResponse,
        });
        google.accounts.id.renderButton(document.getElementById("signinDiv"), {
            theme: "outline",
            size: "large",
            click_listener: onClickHandler,
            type: "standard",
            width: "250",
        });
    }, []);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: loading ? ((0, jsx_runtime_1.jsx)(Loader_1.default, {})) : ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "h-full bg-gradient-to-b from-gray-200 to-white w-full pb-[110px] px-4" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex flex-col items-center justify-center" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-full p-10 mt-16 bg-white rounded shadow lg:w-1/3 md:w-1/2" }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ tabIndex: 0, role: "heading", "aria-label": "Login to your account", className: "text-2xl font-extrabold leading-6 text-gray-800" }, { children: "Login to your account" })), (0, jsx_runtime_1.jsxs)("p", Object.assign({ className: "mt-4 text-sm font-medium leading-none text-gray-500" }, { children: ["Dont have an account?", " ", (0, jsx_runtime_1.jsxs)(react_router_dom_1.NavLink, Object.assign({ to: "/register", className: "text-sm font-medium leading-none text-gray-800 underline cursor-pointer" }, { children: [" ", "Sign up here"] }))] })), (0, jsx_runtime_1.jsx)("div", { id: "signinDiv", className: " border border-black p-4 border-x-[transparent] flex items-center justify-center m-4" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-center justify-between w-full py-5" }, { children: [(0, jsx_runtime_1.jsx)("hr", { className: "w-full bg-gray-400" }), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-base font-medium leading-4 px-2.5 text-gray-400" }, { children: "OR" })), (0, jsx_runtime_1.jsx)("hr", { className: "w-full bg-gray-400 " })] })), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: handleLogin }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-full mt-6" }, { children: [(0, jsx_runtime_1.jsxs)("label", Object.assign({ className: "text-sm font-medium leading-none text-gray-800" }, { children: ["Username", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-[#F70000]" }, { children: "*" }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "relative flex items-center justify-center" }, { children: (0, jsx_runtime_1.jsx)("input", { "aria-label": "enter Username", role: "input", required: true, type: "text", value: username, onChange: (e) => setUsername(e.target.value), className: "w-full py-3 pl-3 mt-2 text-xs font-medium leading-none text-gray-800 bg-gray-200 border rounded focus:outline-none" }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-full mt-6" }, { children: [(0, jsx_runtime_1.jsxs)("label", Object.assign({ className: "text-sm font-medium leading-none text-gray-800" }, { children: ["Password", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-[#F70000]" }, { children: "*" }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "relative flex items-center justify-center" }, { children: (0, jsx_runtime_1.jsx)("input", { "aria-label": "enter Password", role: "input", type: "password", required: true, minLength: 8, value: password, onChange: (e) => setPassword(e.target.value), className: "w-full py-3 pl-3 mt-2 text-xs font-medium leading-none text-gray-800 bg-gray-200 border rounded focus:outline-none" }) }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mt-8" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ role: "button", "aria-label": "Log In", type: "submit", className: "w-full py-4 text-sm font-semibold leading-none text-white bg-indigo-700 border rounded focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none hover:bg-indigo-600" }, { children: "Log In" })) }))] }))] })) })) }))) }));
};
exports.default = Login;
