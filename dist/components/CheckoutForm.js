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
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_stripe_js_1 = require("@stripe/react-stripe-js");
const CheckoutForm = () => {
    const stripe = (0, react_stripe_js_1.useStripe)();
    const elements = (0, react_stripe_js_1.useElements)();
    const [email, setEmail] = (0, react_1.useState)("");
    const [message, setMessage] = (0, react_1.useState)("");
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (!stripe) {
            return;
        }
        const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
        if (!clientSecret) {
            return;
        }
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent === null || paymentIntent === void 0 ? void 0 : paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        setIsLoading(true);
        const { error } = yield stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:3000/completion",
            },
        });
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        }
        else {
            setMessage("An unexpected error occurred.");
        }
        setIsLoading(false);
    });
    const paymentElementOptions = {
        layout: "tabs",
    };
    return ((0, jsx_runtime_1.jsxs)("form", Object.assign({ id: "payment-form", onSubmit: handleSubmit }, { children: [(0, jsx_runtime_1.jsx)(react_stripe_js_1.LinkAuthenticationElement, { id: "link-authentication-element" }), (0, jsx_runtime_1.jsx)(react_stripe_js_1.PaymentElement, { id: "payment-element", options: paymentElementOptions }), (0, jsx_runtime_1.jsx)("button", Object.assign({ disabled: isLoading || !stripe || !elements, id: "submit" }, { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ id: "button-text" }, { children: isLoading ? (0, jsx_runtime_1.jsx)("div", { className: "spinner", id: "spinner" }) : "Pay now" })) })), message && (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "payment-message" }, { children: message }))] })));
};
exports.default = CheckoutForm;
