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
const react_router_dom_1 = require("react-router-dom");
const api_1 = require("../api/api");
const Orders = () => {
    const [show, setShow] = (0, react_1.useState)(false);
    const [orders, setOrders] = (0, react_1.useState)([]);
    const [userId, setUserId] = (0, react_1.useState)(0);
    const [token, setToken] = (0, react_1.useState)("");
    let navigate = (0, react_router_dom_1.useNavigate)();
    const totalPrice = orders.reduce((total, order) => total + order.price * order.quantity, 0);
    const handleDeleteOrder = (product_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield (0, api_1.deleteOrder)({
                product_id,
                token: token,
            });
            console.log(res);
            setOrders(orders.filter(order => order.product_id !== product_id));
        }
        catch (error) {
            console.error(error);
        }
    });
    (0, react_1.useEffect)(() => {
        var _a;
        const getUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { token } = data;
            try {
                const user = yield (0, api_1.fetchUser)({ token });
                setUserId(user.id);
            }
            catch (error) {
                console.error(error);
            }
        });
        const token = (_a = localStorage.getItem("token")) !== null && _a !== void 0 ? _a : "";
        setToken(token);
        getUser({ token });
        try {
            const fetchOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
                const orders = yield (0, api_1.fetchOrder)(userId);
                const filteredOrders = orders.filter((order) => order.users_id === userId);
                setOrders(filteredOrders);
            });
            fetchOrders(userId);
        }
        catch (error) {
            console.error(error);
        }
    }, [token, userId]);
    console.log(orders);
    console.log(userId);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0", id: "chec-div" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700", id: "checkout" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex md:flex-row flex-col justify-end", id: "cart" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen", id: "scroll" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-center text-gray-500 hover:text-gray-600 cursor-pointer", onClick: () => setShow(!show) }, { children: [(0, jsx_runtime_1.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-chevron-left", width: 16, height: 16, viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }, { children: [(0, jsx_runtime_1.jsx)("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }), (0, jsx_runtime_1.jsx)("polyline", { points: "15 6 9 12 15 18" })] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "text-sm pl-2 leading-none", onClick: () => navigate(-1) }, { children: "Back" }))] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-5xl font-black leading-10 text-gray-800 pt-3" }, { children: "Cart" })), orders
                                        .filter((o) => o.users_id === userId)
                                        .map((o, idx) => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "md:flex items-center mt-14 py-8 border-t border-gray-200" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "w-1/4" }, { children: (0, jsx_runtime_1.jsx)("img", { src: o.front_url, alt: "...", className: "w-full h-full object-center object-cover" }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "md:pl-3 md:w-3/4" }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-xs leading-3 text-gray-800 md:pt-0 pt-4" }, { children: 1 + idx++ })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-center justify-between w-full pt-1" }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-base font-black leading-none text-gray-800 capitalize" }, { children: o.title })), (0, jsx_runtime_1.jsx)("label", Object.assign({ className: "p-1 border border-gray-200 focus:outline-none" }, { children: (0, jsx_runtime_1.jsx)("input", { type: "number", min: "1", max: "10", defaultValue: o.quantity, className: "border-gray-500 border-2 " }) }))] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-xs leading-3 text-gray-600 pt-2 capitalize" }, { children: o.description })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-xs leading-3 text-gray-600 py-4" }, { children: "Color: Black" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "w-96 text-xs leading-3 text-gray-600 capitalize" }, { children: o.status })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-center justify-between pt-5 pr-6" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex itemms-center" }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-xs leading-3 underline text-gray-800 cursor-pointer" }, { children: "Add to favorites" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "text-xs leading-3 underline text-red-500 pl-5 cursor-pointer", onClick: () => handleDeleteOrder(o.product_id) }, { children: "Remove" }))] })), (0, jsx_runtime_1.jsxs)("p", Object.assign({ className: "text-base font-black leading-none text-gray-800" }, { children: ["$", o.price * o.quantity] }))] }))] }))] }), idx)))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "xl:w-1/2 md:w-1/3 w-full bg-gray-100 h-full" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-4xl font-black leading-9 text-gray-800" }, { children: "Summary" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-center justify-between pt-16" }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-base leading-none text-gray-800" }, { children: "Subtotal" })), (0, jsx_runtime_1.jsxs)("p", Object.assign({ className: "text-base leading-none text-gray-800" }, { children: ["$", totalPrice.toFixed(2)] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-center justify-between pt-5" }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-base leading-none text-gray-800" }, { children: "Shipping" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-base leading-none text-gray-800" }, { children: "Free" }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-center justify-between pt-5" }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-base leading-none text-gray-800" }, { children: "Tax" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-base leading-none text-gray-800" }, { children: "Calculated at checkout" }))] }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-center pb-6 justify-between lg:pt-5 pt-20" }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-2xl leading-normal text-gray-800" }, { children: "Total" })), (0, jsx_runtime_1.jsxs)("p", Object.assign({ className: "text-2xl font-bold leading-normal text-right text-gray-800" }, { children: ["$", totalPrice.toFixed(2)] }))] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => setShow(!show), className: "text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white" }, { children: "Checkout" }))] })] })) }))] })) })) })) }) }));
};
exports.default = Orders;
