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
const Loader_1 = __importDefault(require("./Loader"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const react_router_dom_1 = require("react-router-dom");
const Register = ({ setToken, success, setSuccess, setSuccessTitle, setSuccessMsg, }) => {
    const [username, setUsername] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [avatar_url, setAvatarUrl] = (0, react_1.useState)("");
    const [errorMsg, setErrorMsg] = (0, react_1.useState)("");
    const [sidebar, setsidebar] = (0, react_1.useState)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [user, setUser] = (0, react_1.useState)({});
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const data = { username, password, email, avatar_url };
        try {
            const register = yield (0, api_1.fetchRegister)(data);
            if (register.error) {
                setErrorMsg(register.error);
            }
            else {
                console.log(register);
                setErrorMsg("");
                localStorage.setItem("token", register.token);
                setToken(register.token);
                (0, api_1.updateCart)(register.user.id, register.token);
                setUsername("");
                setPassword("");
                setEmail("");
                setLoading(true);
                navigate("/");
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
            if (userObject) {
                setUser(userObject);
            }
            const data = {
                username: userObject.name,
                email: userObject.email,
                avatar_url: userObject.picture,
                password: "",
            };
            const res = yield (0, api_1.fetchRegister)(data);
            if (res.error) {
                setErrorMsg(res.error);
            }
            else {
                console.log(res);
                localStorage.setItem("token", res.token);
                setToken(res.token);
                (0, api_1.updateCart)(res.user.id, res.token);
                setSuccess(true);
                setSuccessTitle("Success!");
                setSuccessMsg("You're signed up!");
                navigate("/");
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
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: loading ? ((0, jsx_runtime_1.jsx)(Loader_1.default, {})) : ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "w-full h-full px-4 bg-gradient-to-b from-gray-200 to-white pb-9" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex flex-col items-center justify-center" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-full p-10 mt-16 bg-white rounded shadow lg:w-1/3 md:w-1/2" }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ tabIndex: 0, role: "heading", "aria-label": "Sign Up", className: "text-2xl font-extrabold leading-6 text-gray-800" }, { children: "Sign Up" })), (0, jsx_runtime_1.jsx)("div", { id: "signinDiv", className: " border border-black p-4 border-x-[transparent] flex items-center justify-center m-4" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-center justify-between w-full py-5" }, { children: [(0, jsx_runtime_1.jsx)("hr", { className: "w-full bg-gray-400" }), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-base font-medium leading-4 px-2.5 text-gray-400" }, { children: "OR" })), (0, jsx_runtime_1.jsx)("hr", { className: "w-full bg-gray-400 " })] })), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: handleSubmit }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", Object.assign({ className: "text-sm font-medium leading-none text-gray-800" }, { children: ["Email", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-[#F70000]" }, { children: "*" }))] })), (0, jsx_runtime_1.jsx)("input", { "aria-label": "enter email adress", role: "input", type: "email", value: email, required: true, onChange: (e) => setEmail(e.target.value), className: "w-full py-3 pl-3 mt-2 text-xs font-medium leading-none text-gray-800 bg-gray-200 border rounded focus:outline-none" })] }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-full mt-6" }, { children: [(0, jsx_runtime_1.jsxs)("label", Object.assign({ className: "text-sm font-medium leading-none text-gray-800" }, { children: ["Username", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-[#F70000]" }, { children: "*" }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "relative flex items-center justify-center" }, { children: (0, jsx_runtime_1.jsx)("input", { "aria-label": "enter Username", role: "input", type: "text", required: true, value: username, onChange: (e) => setUsername(e.target.value), className: "w-full py-3 pl-3 mt-2 text-xs font-medium leading-none text-gray-800 bg-gray-200 border rounded focus:outline-none" }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-full mt-6" }, { children: [(0, jsx_runtime_1.jsxs)("label", Object.assign({ className: "text-sm font-medium leading-none text-gray-800" }, { children: ["Password", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-[#F70000]" }, { children: "*" }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "relative flex items-center justify-center" }, { children: (0, jsx_runtime_1.jsx)("input", { "aria-label": "enter Password", role: "input", required: true, type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full py-3 pl-3 mt-2 text-xs font-medium leading-none text-gray-800 bg-gray-200 border rounded focus:outline-none" }) }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mt-8" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ role: "button", type: "submit", "aria-label": "create my account", className: "w-full py-4 text-sm font-semibold leading-none text-white bg-indigo-700 border rounded focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none hover:bg-indigo-600" }, { children: "Create my account" })) }))] }))] })) })) }))) }));
};
exports.default = Register;
