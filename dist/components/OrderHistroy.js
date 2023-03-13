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
const OrderHistroy = (props) => {
    const [orders, setOrders] = (0, react_1.useState)([]);
    const [userId, setUserId] = (0, react_1.useState)(3);
    (0, react_1.useEffect)(() => {
        const orderHistory = (userId) => __awaiter(void 0, void 0, void 0, function* () {
            const order = yield (0, api_1.fetchOrderHistory)(userId);
            setOrders(order);
        });
        if (userId !== undefined) {
            orderHistory(userId);
        }
    }, []);
    console.log(orders);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "bg-white" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "py-16 sm:py-24" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mx-auto max-w-7xl sm:px-2 lg:px-8" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "max-w-2xl px-4 mx-auto lg:max-w-4xl lg:px-0" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl" }, { children: "Order history" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "mt-2 text-sm text-gray-500" }, { children: "Check the status of recent orders, manage returns, and discover similar products." }))] })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mt-16" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ className: "sr-only" }, { children: "Recent orders" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mx-auto max-w-7xl sm:px-2 lg:px-8" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0" }, { children: orders.map((order) => {
                                    const date = new Date(order.purchased_at);
                                    const formattedDate = date.toLocaleDateString();
                                    let total = 0;
                                    order.products.forEach((p) => {
                                        total += Number(p.price) * Number(p.quantity);
                                    });
                                    console.log(total);
                                    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border" }, { children: [(0, jsx_runtime_1.jsxs)("h3", Object.assign({ className: "sr-only" }, { children: ["Order placed on", " ", (0, jsx_runtime_1.jsx)("time", Object.assign({ dateTime: order.createdDatetime }, { children: order.createdDate }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex items-center p-4 border-b border-gray-200 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6" }, { children: (0, jsx_runtime_1.jsxs)("dl", Object.assign({ className: "grid flex-1 grid-cols-2 text-sm gap-x-6 sm:col-span-3 sm:grid-cols-3 lg:col-span-2" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", Object.assign({ className: "font-medium text-gray-900" }, { children: "Order number" })), (0, jsx_runtime_1.jsx)("dd", Object.assign({ className: "mt-1 text-gray-500" }, { children: order.id }))] }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "hidden sm:block" }, { children: [(0, jsx_runtime_1.jsx)("dt", Object.assign({ className: "font-medium text-gray-900" }, { children: "Date placed" })), (0, jsx_runtime_1.jsx)("dd", Object.assign({ className: "mt-1 text-gray-500" }, { children: (0, jsx_runtime_1.jsx)("time", Object.assign({ dateTime: order.purchased_at }, { children: formattedDate })) }))] })), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", Object.assign({ className: "font-medium text-gray-900" }, { children: "Total amount" })), (0, jsx_runtime_1.jsx)("dd", Object.assign({ className: "mt-1 font-medium text-gray-900" }, { children: total.toFixed(2) }))] })] })) })), (0, jsx_runtime_1.jsx)("h4", Object.assign({ className: "sr-only" }, { children: "Items" })), (0, jsx_runtime_1.jsx)("ul", Object.assign({ role: "list", className: "divide-y divide-gray-200" }, { children: order.products.map((product) => ((0, jsx_runtime_1.jsxs)("li", Object.assign({ className: "p-4 sm:p-6" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-center sm:items-start" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex-shrink-0 w-20 h-20 overflow-hidden bg-gray-200 rounded-lg sm:h-40 sm:w-40" }, { children: (0, jsx_runtime_1.jsx)("img", { src: product.front_url, alt: product.front_url, className: "object-cover object-center w-full h-full" }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex-1 ml-6 text-sm" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "font-medium text-gray-900 sm:flex sm:justify-between" }, { children: [(0, jsx_runtime_1.jsx)("h5", Object.assign({ className: "font-extrabold" }, { children: product.title })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "mt-2 sm:mt-0" }, { children: product.price }))] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "hidden text-gray-500 sm:mt-2 sm:block" }, { children: product.description })), (0, jsx_runtime_1.jsxs)("p", Object.assign({ className: "hidden text-gray-500 sm:mt-2 sm:block" }, { children: ["Quantity: ", product.quantity] }))] }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mt-6 sm:flex sm:justify-between" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex items-center pt-4 mt-6 space-x-4 text-sm font-medium border-t border-gray-200 divide-x divide-gray-200 sm:mt-0 sm:ml-4 sm:border-none sm:pt-0" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex justify-center flex-1" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: `/products/${product.id}`, className: "text-indigo-600 whitespace-nowrap hover:text-indigo-500" }, { children: "View product" })) })) })) }))] }), product.id))) }))] }), order.id));
                                }) })) }))] }))] })) })));
};
exports.default = OrderHistroy;
