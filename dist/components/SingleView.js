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
const api_1 = require("../api/api");
const AddReview_1 = __importDefault(require("./AddReview"));
const Loader_1 = __importDefault(require("./Loader"));
const Reviews_1 = __importDefault(require("./Reviews"));
const SingleView = ({ user, setSuccess, setSuccessMsg, setSuccessTitle, setWishlist, wishlist, orders, setOrders, }) => {
    const [product, setProduct] = (0, react_1.useState)();
    const [token, setToken] = (0, react_1.useState)("");
    const [productId, setProductId] = (0, react_1.useState)(0);
    const [reviews, setReviews] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [quantity, setQuantity] = (0, react_1.useState)(1);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { id } = (0, react_router_dom_1.useParams)();
    const getProduct = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const fetchedProduct = yield (0, api_1.fetchProductById)(productId);
            setProduct(fetchedProduct);
            setLoading(false);
        }
        catch (error) {
            console.error(error);
        }
    });
    const addProductToCart = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            const res = yield (0, api_1.createOrder)({
                product_id: productId,
                quantity: quantity,
                token: token,
            });
            setSuccess(true);
            setSuccessTitle("Success!");
            setSuccessMsg("Item added to cart!");
            console.log(res);
            setOrders([...orders, res]);
        }
        catch (error) {
            console.error();
        }
    });
    const addProductToWishlist = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        console.log(productId, token);
        try {
            const res = yield (0, api_1.createWishlist)({
                product_id: productId,
                quantity: 1,
                token,
            });
            setSuccess(true);
            setSuccessTitle("Success!");
            setSuccessMsg("Item added to wishlist!");
            console.log(res);
            setWishlist([...wishlist, res]);
        }
        catch (error) {
            console.error(error);
        }
    });
    const guestAddToCart = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            let cart = sessionStorage.getItem("cart") || "[]";
            let cartItems = JSON.parse(cart);
            const existingItem = cartItems.find((i) => i.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            }
            else {
                cartItems.push({ id: productId, quantity: 1 });
            }
            sessionStorage.setItem("cart", JSON.stringify(cartItems));
            setSuccess(true);
            setSuccessTitle("Success!");
            setSuccessMsg("Item added to cart!");
        }
        catch (error) {
            console.error(error);
        }
    });
    const deleteProduct = () => __awaiter(void 0, void 0, void 0, function* () {
        const deletedProduct = yield (0, api_1.fetchDeleteProduct)(productId);
        console.log(deletedProduct);
        navigate(-1);
    });
    (0, react_1.useEffect)(() => {
        var _a;
        if (productId !== 0) {
            getProduct();
        }
        setToken((_a = localStorage.getItem("token")) !== null && _a !== void 0 ? _a : "");
        const getID = parseInt(id);
        setProductId(getID);
    }, [productId]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: loading ? ((0, jsx_runtime_1.jsx)(Loader_1.default, {})) : ((0, jsx_runtime_1.jsxs)("section", { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "relative max-w-screen-xl px-4 py-8 mx-auto" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex m-3" }, { children: [(0, jsx_runtime_1.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-chevron-left", width: 16, height: 16, viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }, { children: [(0, jsx_runtime_1.jsx)("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }), (0, jsx_runtime_1.jsx)("polyline", { points: "15 6 9 12 15 18" })] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "pl-2 text-sm leading-none hover:underline text-indigo-900", onClick: () => navigate(-1) }, { children: "Back" }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "grid items-start grid-cols-1 gap-8 md:grid-cols-2" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "grid grid-cols-2 gap-4 md:grid-cols-1" }, { children: (0, jsx_runtime_1.jsx)("img", { alt: "Tee", src: product === null || product === void 0 ? void 0 : product.front_url, className: "h-72 w-full rounded-xl object-cover lg:h-[540px]" }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "sticky top-0" }, { children: [(0, jsx_runtime_1.jsx)("strong", Object.assign({ className: "rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600" }, { children: "Pre Order" })), user.is_admin && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex" }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: `/edit/${product === null || product === void 0 ? void 0 : product.id}` }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "capitalize mx-2 hover:underline text-indigo-600" }, { children: "edit" })) })), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: deleteProduct, className: "capitalize hover:underline text-red-600" }, { children: "delete" })) })] }))), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex justify-between mt-8" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "max-w-[35ch] space-y-2" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "text-xl font-bold capitalize sm:text-2xl" }, { children: product === null || product === void 0 ? void 0 : product.title })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-sm" }, { children: "Highest Rated Product" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "-ml-0.5 flex" }, { children: [(0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "w-5 h-5 text-yellow-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })), (0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "w-5 h-5 text-yellow-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })), (0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "w-5 h-5 text-yellow-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })), (0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "w-5 h-5 text-yellow-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })), (0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "w-5 h-5 text-yellow-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })), token && ((0, jsx_runtime_1.jsx)(AddReview_1.default, { token: token, product_id: productId, reviews: reviews, setReviews: setReviews, user: user.username, setSuccess: setSuccess, setSuccessTitle: setSuccessTitle, setSuccessMsg: setSuccessMsg }))] }))] })), (0, jsx_runtime_1.jsxs)("p", Object.assign({ className: "text-lg font-bold" }, { children: ["$", product === null || product === void 0 ? void 0 : product.price, " USD"] }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mt-4" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "prose max-w-none capitalize" }, { children: (0, jsx_runtime_1.jsx)("p", { children: product === null || product === void 0 ? void 0 : product.description }) })) })), (0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "mt-8" }, { children: [(0, jsx_runtime_1.jsxs)("fieldset", Object.assign({ className: "mt-4" }, { children: [(0, jsx_runtime_1.jsx)("legend", Object.assign({ className: "mb-1 text-sm font-medium" }, { children: "Size" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-wrap gap-1" }, { children: [(0, jsx_runtime_1.jsxs)("label", Object.assign({ htmlFor: "size_xs", className: "cursor-pointer" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "size", id: "size_xs", className: "sr-only peer" }), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white" }, { children: "XS" }))] })), (0, jsx_runtime_1.jsxs)("label", Object.assign({ htmlFor: "size_s", className: "cursor-pointer" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "size", id: "size_s", className: "sr-only peer" }), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white" }, { children: "S" }))] })), (0, jsx_runtime_1.jsxs)("label", Object.assign({ htmlFor: "size_m", className: "cursor-pointer" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "size", id: "size_m", className: "sr-only peer" }), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white" }, { children: "M" }))] })), (0, jsx_runtime_1.jsxs)("label", Object.assign({ htmlFor: "size_l", className: "cursor-pointer" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "size", id: "size_l", className: "sr-only peer" }), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white" }, { children: "L" }))] })), (0, jsx_runtime_1.jsxs)("label", Object.assign({ htmlFor: "size_xl", className: "cursor-pointer" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "size", id: "size_xl", className: "sr-only peer" }), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white" }, { children: "XL" }))] }))] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex gap-4 mt-8" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "quantity", className: "block text-sm font-medium text-gray-700", "aria-required": "true" }, { children: "Quantity" })), (0, jsx_runtime_1.jsxs)("select", Object.assign({ id: "quantity", name: "quantity", className: "block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm", value: quantity, defaultValue: 1, onChange: (e) => setQuantity(parseInt(e.target.value)) }, { children: [(0, jsx_runtime_1.jsx)("option", { children: "1" }), (0, jsx_runtime_1.jsx)("option", { children: "2" }), (0, jsx_runtime_1.jsx)("option", { children: "3" }), (0, jsx_runtime_1.jsx)("option", { children: "4" }), (0, jsx_runtime_1.jsx)("option", { children: "5" })] }))] }), token ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", onClick: addProductToCart, className: `block px-5 py-3 text-sm font-medium text-white rounded hover:bg-green-500 ${(product === null || product === void 0 ? void 0 : product.tags.some((tag) => tag.name === "soldout"))
                                                                        ? "bg-red-600 hover:bg-red-500"
                                                                        : "bg-green-600"}`, disabled: product === null || product === void 0 ? void 0 : product.tags.some((tag) => tag.name === "soldout") }, { children: (product === null || product === void 0 ? void 0 : product.tags.some((tag) => tag.name === "soldout"))
                                                                        ? "Sold Out"
                                                                        : "Add to Cart" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", onClick: addProductToWishlist, className: "block px-5 py-3 text-xs font-medium text-white bg-indigo-600 rounded hover:bg-green-500" }, { children: "Add to wishlist" }))] })) : ((0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", onClick: guestAddToCart, className: `block px-5 py-3 text-xs font-medium text-white rounded hover:bg-green-500 ${(product === null || product === void 0 ? void 0 : product.tags.some((tag) => tag.name === "soldout"))
                                                                ? "bg-red-600 hover:bg-red-500"
                                                                : "bg-green-600"}`, disabled: product === null || product === void 0 ? void 0 : product.tags.some((tag) => tag.name === "soldout") }, { children: (product === null || product === void 0 ? void 0 : product.tags.some((tag) => tag.name === "soldout"))
                                                                ? "Sold Out"
                                                                : "Add to Cart" })))] }))] }))] }))] }))] })), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(Reviews_1.default, { product_id: productId, token: token, reviews: reviews, setReviews: setReviews, setSuccess: setSuccess, setSuccessTitle: setSuccessTitle, setSuccessMsg: setSuccessMsg }) })] })) }));
};
exports.default = SingleView;
