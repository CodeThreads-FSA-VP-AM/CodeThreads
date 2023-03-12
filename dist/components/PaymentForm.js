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
const axios_1 = __importDefault(require("axios"));
const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "black",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "black" },
            "::placeholder": { color: "black" },
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "black",
        },
    },
};
const PaymentForm = () => {
    const [success, setSuccess] = (0, react_1.useState)(false);
    const stripe = (0, react_stripe_js_1.useStripe)();
    const elements = (0, react_stripe_js_1.useElements)();
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const { error, paymentMethod } = yield stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(react_stripe_js_1.CardCvcElement, react_stripe_js_1.CardExpiryElement, react_stripe_js_1.CardNumberElement),
        });
        if (!error) {
            try {
                const { id } = paymentMethod;
                const res = yield axios_1.default.post("http://localhost:4000/payment", {
                    amount: 10000,
                    id,
                });
                if (res.data.success) {
                    console.log("Payment successful");
                    setSuccess(true);
                }
            }
            catch (error) {
                console.error("Error", error);
            }
        }
    });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: !success ? ((0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: handleSubmit }, { children: [(0, jsx_runtime_1.jsx)("fieldset", Object.assign({ className: "FormGroup" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "FormRow" }, { children: (0, jsx_runtime_1.jsx)(react_stripe_js_1.CardNumberElement, { options: CARD_OPTIONS }) })) })), (0, jsx_runtime_1.jsx)("fieldset", Object.assign({ className: "FormGroup" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "FormRow" }, { children: (0, jsx_runtime_1.jsx)(react_stripe_js_1.CardExpiryElement, { options: CARD_OPTIONS }) })) })), (0, jsx_runtime_1.jsx)("fieldset", Object.assign({ className: "FormGroup" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "FormRow" }, { children: (0, jsx_runtime_1.jsx)(react_stripe_js_1.CardCvcElement, { options: CARD_OPTIONS }) })) })), (0, jsx_runtime_1.jsx)("button", { children: "Pay" })] }))) : ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "payment-success" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Payment Successful" }), (0, jsx_runtime_1.jsx)("h3", Object.assign({ className: "Thank-you" }, { children: "Thank you for your purchase!" }))] }))) }));
};
exports.default = PaymentForm;
