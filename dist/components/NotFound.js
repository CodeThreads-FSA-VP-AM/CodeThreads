"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const NotFound = (props) => {
    return ((0, jsx_runtime_1.jsx)("main", { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex items-center justify-start h-screen max-w-screen-xl px-4 mx-auto md:px-8" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "max-w-lg mx-auto space-y-3 text-center" }, { children: [(0, jsx_runtime_1.jsx)("h3", Object.assign({ className: "text-4xl font-semibold text-gray-800 sm:text-5xl" }, { children: "Page not found" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-gray-600" }, { children: "Sorry, the page you are looking for could not be found or has been removed." })), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ to: "/products", className: "inline-flex items-center font-medium text-indigo-600 duration-150 hover:text-indigo-400 gap-x-1" }, { children: ["Go back", (0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "w-5 h-5" }, { children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", d: "M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z", clipRule: "evenodd" }) }))] }))] })) })) }));
};
exports.default = NotFound;
