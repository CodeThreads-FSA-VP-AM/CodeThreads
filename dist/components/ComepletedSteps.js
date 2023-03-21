"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const CompletedSteps = (props) => {
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "pt-6" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ className: "sr-only" }, { children: "Steps" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-400" }, { children: (0, jsx_runtime_1.jsxs)("ol", Object.assign({ className: "relative z-10 flex justify-between text-sm font-medium text-gray-500" }, { children: [(0, jsx_runtime_1.jsxs)("li", Object.assign({ className: "flex items-center gap-1 bg-white p-2" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "h-6 w-6 rounded-full bg-green-500 text-center text-[10px] font-bold leading-6 text-white" }, { children: "1" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "hidden sm:block" }, { children: " Added " }))] })), (0, jsx_runtime_1.jsxs)("li", Object.assign({ className: "flex items-center gap-2 bg-white p-2" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "h-6 w-6 rounded-full bg-green-500 text-center text-[10px] font-bold leading-6 text-white" }, { children: "2" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "hidden sm:block" }, { children: " Processing " }))] })), (0, jsx_runtime_1.jsxs)("li", Object.assign({ className: "flex items-center gap-2 bg-white p-2" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "h-6 w-6 rounded-full bg-green-500 text-center text-[10px] font-bold leading-6 text-white" }, { children: "3" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "hidden sm:block" }, { children: " Completed " }))] }))] })) }))] })));
};
exports.default = CompletedSteps;
