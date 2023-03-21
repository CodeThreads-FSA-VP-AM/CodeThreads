"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const StripeContainer_1 = __importDefault(require("./StripeContainer"));
const ProductDisplay = () => {
    const [showForm, setShowForm] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsx)("div", { children: showForm ? ((0, jsx_runtime_1.jsx)(StripeContainer_1.default, {})) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "$100.00" }), " ", (0, jsx_runtime_1.jsx)("img", { src: "", alt: "" }), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => setShowForm(true) }, { children: "BUY" }))] })) }));
};
exports.default = ProductDisplay;
