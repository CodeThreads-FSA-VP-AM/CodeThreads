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
const react_router_dom_1 = require("react-router-dom");
const stripe_js_1 = require("@stripe/stripe-js");
const stripePromise = (0, stripe_js_1.loadStripe)("pk_test_51MjulLCrdvy0lSlL6cOtaubo6pIIeBbbaaWDilYHCXY4U9kirgxRUQqgWb6Uh2p50TRCnwnzxCIkwWLQUvZrlrlR00uysRVa4o");
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
// import { getAPIHealth } from "../axios-services";
require("../style/App.css");
const Login_1 = __importDefault(require("./Login"));
const Navbar_1 = __importDefault(require("./Navbar"));
const Register_1 = __importDefault(require("./Register"));
const Products_1 = __importDefault(require("./Products"));
const SingleView_1 = __importDefault(require("./SingleView"));
const Orders_1 = __importDefault(require("./Orders"));
const AddProduct_1 = __importDefault(require("./AddProduct"));
const EditProduct_1 = __importDefault(require("./EditProduct"));
const Featured_1 = __importDefault(require("./Featured"));
const Home_1 = __importDefault(require("./Home"));
const api_1 = require("../api/api");
const NotFound_1 = __importDefault(require("./NotFound"));
const AdminNav_1 = __importDefault(require("./AdminNav"));
const StripeContainer_1 = __importDefault(require("./StripeContainer"));
const Completion_1 = __importDefault(require("./Completion"));
const TestStripe_1 = __importDefault(require("./TestStripe"));
const OrderHistroy_1 = __importDefault(require("./OrderHistroy"));
const App = () => {
    const [APIHealth, setAPIHealth] = (0, react_1.useState)("");
    const [productId, setProductId] = (0, react_1.useState)(0);
    const [quantity, setQuantity] = (0, react_1.useState)(0);
    const [product, setProduct] = (0, react_1.useState)();
    const [token, setToken] = (0, react_1.useState)("");
    const [user, setUser] = (0, react_1.useState)({});
    const options = {
        // passing the client secret obtained from the server
        clientSecret: "{{sk_test_51MjulLCrdvy0lSlLe1XvAr0xF9ZFyr8OpWitXvDBlrwsmBMa1HlmSDcpO0JmDj4mEjWuVGXojR8Yqb55clcLPwvK00U6GZFdtz}}",
    };
    const getProduct = () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield (0, api_1.fetchProductById)(productId);
        console.log(product);
        setProduct(product);
    });
    (0, react_1.useEffect)(() => {
        var _a;
        const getUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { token } = data;
            try {
                const user = yield (0, api_1.fetchUser)({ token });
                console.log({ user });
                setUser(user);
            }
            catch (error) {
                console.error(error);
            }
        });
        const token = (_a = localStorage.getItem("token")) !== null && _a !== void 0 ? _a : "";
        setToken(token);
        getUser({ token });
    }, [token]);
    (0, react_1.useEffect)(() => {
        getProduct();
    }, [productId]);
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
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.BrowserRouter, { children: [(0, jsx_runtime_1.jsx)(Navbar_1.default, { user: user, token: token, setToken: setToken }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/home" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "*", element: (0, jsx_runtime_1.jsx)(NotFound_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/register", element: (0, jsx_runtime_1.jsx)(Register_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", element: (0, jsx_runtime_1.jsx)(Login_1.default, { setToken: setToken }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/products", element: (0, jsx_runtime_1.jsx)(Products_1.default, { setProductId: setProductId, user: user }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/products/:id", element: (0, jsx_runtime_1.jsx)(SingleView_1.default, { quantity: quantity, user: user }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/orders", element: (0, jsx_runtime_1.jsx)(Orders_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/addproduct", element: (0, jsx_runtime_1.jsx)(AddProduct_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/edit/:id", element: (0, jsx_runtime_1.jsx)(EditProduct_1.default, { product: product, productId: productId, setProductId: setProductId }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/featured", element: (0, jsx_runtime_1.jsx)(Featured_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/home", element: (0, jsx_runtime_1.jsx)(Home_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/admin", element: (0, jsx_runtime_1.jsx)(AdminNav_1.default, { setProductId: setProductId, user: user }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/checkout", element: (0, jsx_runtime_1.jsx)(StripeContainer_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/success", element: (0, jsx_runtime_1.jsx)(Completion_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/test", element: (0, jsx_runtime_1.jsx)(TestStripe_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/orderhistory", element: (0, jsx_runtime_1.jsx)(OrderHistroy_1.default, {}) })] }) })] }) }));
};
exports.default = App;
