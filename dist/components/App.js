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
const api_1 = require("../api/api");
const App = () => {
    const [APIHealth, setAPIHealth] = (0, react_1.useState)("");
    const [productId, setProductId] = (0, react_1.useState)(0);
    const [quantity, setQuantity] = (0, react_1.useState)(0);
    const [product, setProduct] = (0, react_1.useState)();
    const getProduct = () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield (0, api_1.fetchProductById)(productId);
        console.log(product);
        setProduct(product);
    });
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
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.BrowserRouter, { children: [(0, jsx_runtime_1.jsx)(Navbar_1.default, {}), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/register", element: (0, jsx_runtime_1.jsx)(Register_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", element: (0, jsx_runtime_1.jsx)(Login_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/products", element: (0, jsx_runtime_1.jsx)(Products_1.default, { setProductId: setProductId }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/products/:id", element: (0, jsx_runtime_1.jsx)(SingleView_1.default, { quantity: quantity }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/orders", element: (0, jsx_runtime_1.jsx)(Orders_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/addproduct", element: (0, jsx_runtime_1.jsx)(AddProduct_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/edit/:id", element: (0, jsx_runtime_1.jsx)(EditProduct_1.default, { product: product, productId: productId, setProductId: setProductId }) })] }) })] }) }));
};
exports.default = App;
