"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
// import { getAPIHealth } from "../axios-services";
require("../style/App.css");
const Login_1 = __importDefault(require("./Login"));
const Navbar_1 = __importDefault(require("./Navbar"));
const Register_1 = __importDefault(require("./Register"));
const Products_1 = __importDefault(require("./Products"));
const App = () => {
    const [APIHealth, setAPIHealth] = (0, react_1.useState)("");
    // useEffect(() => {
    //   // follow this pattern inside your useEffect calls:
    //   // first, create an async function that will wrap your axios service adapter
    //   // invoke the adapter, await the response, and set the data
    //   const getAPIStatus = async () => {
    //     const { healthy } = await getAPIHealth();
    //     setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    //   };
    //   // second, after you've defined your getter above
    //   // invoke it immediately after its declaration, inside the useEffect callback
    //   getAPIStatus();
    // }, []);
    {
        /* <p>API Status: {APIHealth}</p> */
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.BrowserRouter, { children: [(0, jsx_runtime_1.jsx)(Navbar_1.default, {}), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/register", element: (0, jsx_runtime_1.jsx)(Register_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", element: (0, jsx_runtime_1.jsx)(Login_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/products', element: (0, jsx_runtime_1.jsx)(Products_1.default, {}) })] }) })] }) }));
};
exports.default = App;
