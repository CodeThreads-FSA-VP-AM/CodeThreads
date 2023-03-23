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
const react_stripe_js_1 = require("@stripe/react-stripe-js");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
const Loader_1 = __importDefault(require("./Loader"));
const PaymentForm = (price) => {
    const [success, setSuccess] = (0, react_1.useState)(false);
    const [amount, setAmount] = (0, react_1.useState)(0);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const stripe = (0, react_stripe_js_1.useStripe)();
    const elements = (0, react_stripe_js_1.useElements)();
    (0, react_1.useEffect)(() => {
        setAmount(price);
    }, [amount]);
    console.log(amount === null || amount === void 0 ? void 0 : amount.price);
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const { error, paymentMethod } = yield stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(react_stripe_js_1.CardElement),
        });
        setLoading(true);
        if (!error) {
            try {
                const { id } = paymentMethod;
                const res = yield axios_1.default.post("https://codethreads.onrender.com/payment", {
                    amount: amount === null || amount === void 0 ? void 0 : amount.price,
                    id,
                });
                console.log("loading");
                if (res.data.success) {
                    console.log("Payment successful");
                    setSuccess(true);
                }
            }
            catch (error) {
                console.error("Error", error);
            }
            finally {
                setLoading(false);
            }
        }
    });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: loading ? ((0, jsx_runtime_1.jsx)(Loader_1.default, {})) : ((0, jsx_runtime_1.jsx)("div", { children: !success ? ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "py-6 bg-white sm:py-8 lg:py-12" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "px-4 mx-auto max-w-screen-2xl md:px-8" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col items-center" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl" }, { children: "Checkout" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "max-w-screen-md mb-12 text-center text-slate-800 md:text-md" }, { children: "Enter Card: 4242 4242 4242 4242 date: 02/24 CVC: 424 Zip: 11111" })), (0, jsx_runtime_1.jsxs)("form", Object.assign({ id: "form", onSubmit: handleSubmit }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "p-3" }, { children: (0, jsx_runtime_1.jsx)(react_stripe_js_1.CardElement, {}) })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "inline-block px-8 py-2 text-sm font-semibold text-center text-white transition duration-100 bg-indigo-500 rounded outline-none ring-indigo-300 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base" }, { children: "Pay" }))] }))] })) })) }))) : ((0, jsx_runtime_1.jsx)("section", Object.assign({ className: "py-24" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "container px-4 mx-auto" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "max-w-2xl mx-auto text-center" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "inline-block mx-auto mb-6" }, { children: (0, jsx_runtime_1.jsx)("svg", Object.assign({ width: "54", height: "54", viewBox: "0 0 54 54", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M26.9999 0.333374C12.3066 0.333374 0.333252 12.3067 0.333252 27C0.333252 41.6934 12.3066 53.6667 26.9999 53.6667C41.6933 53.6667 53.6666 41.6934 53.6666 27C53.6666 12.3067 41.6933 0.333374 26.9999 0.333374ZM39.7466 20.8667L24.6266 35.9867C24.2532 36.36 23.7466 36.5734 23.2133 36.5734C22.6799 36.5734 22.1733 36.36 21.7999 35.9867L14.2533 28.44C13.4799 27.6667 13.4799 26.3867 14.2533 25.6134C15.0266 24.84 16.3066 24.84 17.0799 25.6134L23.2133 31.7467L36.9199 18.04C37.6933 17.2667 38.9733 17.2667 39.7466 18.04C40.5199 18.8134 40.5199 20.0667 39.7466 20.8667Z", fill: "#AFFF0F" }) })) })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "block mb-1 text-sm font-bold text-indigo-500" }, { children: "SUCCESS" })), (0, jsx_runtime_1.jsx)("h3", Object.assign({ className: "mb-5 text-2xl font-black" }, { children: "Your order has been placed" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "mb-12 text-lg font-bold" }, { children: "Congratulations! Your order has been successfully placed. We'll keep you updated on the shipping status and provide tracking information once your package is on its way." })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/products", className: "relative inline-block w-full h-12 rounded-md group xs:w-60 bg-blueGray-900" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "absolute top-0 left-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 group-hover:translate-y-0 group-hover:translate-x-0" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex items-center justify-center w-full h-full bg-green-600 border-2 border-black rounded-md" }, { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-base font-black text-black" }, { children: "Continue Shopping" })) })) })) }))] })) })) }))) })) }));
};
exports.default = PaymentForm;
