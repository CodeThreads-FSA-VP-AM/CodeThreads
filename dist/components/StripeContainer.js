"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_stripe_js_1 = require("@stripe/react-stripe-js");
const stripe_js_1 = require("@stripe/stripe-js");
const PaymentForm_1 = __importDefault(require("./PaymentForm"));
const react_router_dom_1 = require("react-router-dom");
const stripePromise = (0, stripe_js_1.loadStripe)("pk_test_51MjvX6HrkACoVWSG7ReTXWYU5dpx2WLcOMcgCUIe16DyAzwlR4LIykMqr4opzDdJk67EuGfkgjyQCpNQV1Jf4NK0008hn46WAW");
const StripeContainer = () => {
    const location = (0, react_router_dom_1.useLocation)();
    const { state } = location;
    console.log(state.totalPrice);
    const convertNumber = Math.ceil(state.totalPrice * 100);
    return ((0, jsx_runtime_1.jsx)(react_stripe_js_1.Elements, Object.assign({ stripe: stripePromise, options: { appearance: { theme: "stripe" } } }, { children: (0, jsx_runtime_1.jsx)(PaymentForm_1.default, { price: convertNumber }) })));
};
exports.default = StripeContainer;
