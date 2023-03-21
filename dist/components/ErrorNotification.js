"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const md_1 = require("react-icons/md");
const ErrorNotification = (props) => {
    (0, react_1.useEffect)(() => {
        const timeId = setTimeout(() => {
            props.setError(false);
        }, 3500);
        return () => {
            clearTimeout(timeId);
        };
    }, []);
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("section", Object.assign({ className: "z-50 fixed left-0 top-0 p-4" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "p-4 ml-auto max-w-sm w-full bg-gray-200 rounded-xl shadow-5xl" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-wrap justify-between -m-2" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex-1 p-2" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-wrap -m-2" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "self-center" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex-1 p-4 px-4" }, { children: [(0, jsx_runtime_1.jsxs)("p", Object.assign({ className: "font-heading mb-1 flex gap-2 text-gray-700 font-semibold" }, { children: [(0, jsx_runtime_1.jsx)(md_1.MdOutlineErrorOutline, { size: 25, color: "red" }), "Error!"] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-xs font-medium text-gray-700 pb-2 pl-8" }, { children: props.errorNoti }))] }))] })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "w-auto p-2" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "text-neutral-700 hover:text-red-900", onClick: () => props.setError(false) }, { children: (0, jsx_runtime_1.jsx)("svg", Object.assign({ width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M4.5 13.5L13.5 4.5M4.5 4.5L13.5 13.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })) })) }))] })) })) })) }));
};
exports.default = ErrorNotification;
