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
const Products2 = ({ setProductId, user }) => {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [selectedId, setSelectedId] = (0, react_1.useState)(0);
    const [message, setMessage] = (0, react_1.useState)("");
    console.log(user.is_admin);
    (0, react_1.useEffect)(() => {
        const loadProducts = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const allProducts = yield (0, api_1.fetchProducts)();
                console.log(allProducts);
                setProducts(allProducts);
                setLoading(false);
            }
            catch (error) {
                console.error(error);
            }
        });
        loadProducts();
    }, [message]);
    const idHandle = (id) => {
        console.log(id);
        setProductId(id);
    };
    const handleSelect = (e) => {
        setProductId(e.target.value);
        setSelectedId(e.target.value);
    };
    const handleDelete = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(selectedId);
        console.log("delete me");
        const deletedProduct = yield (0, api_1.fetchDeleteProduct)(selectedId);
        const filteredOrders = products.filter((p) => p.id !== selectedId);
        setProducts(filteredOrders);
        setMessage("product deleted");
        setTimeout(() => {
            setMessage("");
        }, 3000);
        console.log("product removed", deletedProduct);
    });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("section", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8" }, { children: [(0, jsx_runtime_1.jsxs)("header", { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ className: "text-xl font-bold text-gray-900 sm:text-3xl" }, { children: "Product Collection" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "max-w-md mt-4 text-gray-500" }, { children: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit natus?" })), user.is_admin && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/addproduct", className: "flex justify-center" }, { children: (0, jsx_runtime_1.jsx)("button", { children: "add" }) })), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("select", Object.assign({ onChange: handleSelect }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "delete" }, { children: "delete product" })), products.map((p) => ((0, jsx_runtime_1.jsx)("option", Object.assign({ value: p.id }, { children: p.title }), p.id)))] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "px-1", onClick: handleDelete }, { children: "delete" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-red-400" }, { children: message }))] })] }))] }), (0, jsx_runtime_1.jsx)("ul", Object.assign({ className: "grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4" }, { children: loading ? (
                        // <div>Loading...</div>
                        (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex" }, { children: (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-blue-400" }) }))) : (products === null || products === void 0 ? void 0 : products.map((p) => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ to: `/products/${p.id}`, className: "block overflow-hidden group", onClick: () => idHandle(p.id) }, { children: [(0, jsx_runtime_1.jsx)("img", { src: p.front_url, alt: "", className: "h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "relative pt-3 bg-white" }, { children: [(0, jsx_runtime_1.jsx)("h3", Object.assign({ className: "text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4" }, { children: p.title })), (0, jsx_runtime_1.jsxs)("p", Object.assign({ className: "mt-2" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "sr-only" }, { children: " Regular Price " })), (0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "tracking-wider text-gray-900" }, { children: [" \u00A3", p.price, " GBP "] }))] }))] }))] })) }, p.id)))) }))] })) }) }));
};
exports.default = Products2;
