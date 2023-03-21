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
const api_1 = require("../api/api");
const WishList = ({ setSuccess, setSuccessMsg, setSuccessTitle, wishlist, setWishlist, token, }) => {
    const [show, setShow] = (0, react_1.useState)(Array(wishlist.length).fill(false));
    const [userId, setUserId] = (0, react_1.useState)(0);
    const [wishlistId, setWishlistId] = (0, react_1.useState)(0);
    console.log(wishlist.length, "length here of wl");
    const addProductToCart = (e, product_id) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            const res = yield (0, api_1.createOrder)({
                product_id: product_id,
                quantity: 1,
                token: token,
            });
            console.log("got here from orders adding to cart");
            console.log(res);
            console.log(wishlist, "before filter upon adding", product_id);
            setWishlist(wishlist.filter((wish) => wish.product_id !== product_id));
            console.log(wishlist, "After filter upon adding");
            handleDeletewishlist(product_id);
            console.log("got here from orders adding to cart");
            setSuccess(true);
            setSuccessTitle("Success!");
            setSuccessMsg("Item added to cart!");
        }
        catch (error) {
            console.error();
        }
    });
    const handleDeletewishlist = (product_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield (0, api_1.deleteWishlist)({
                product_id,
                token: token,
            });
            console.log(res);
            setWishlist(wishlist.filter((wish) => wish.product_id !== product_id));
            setSuccess(true);
            setSuccessMsg("Item removed.");
        }
        catch (error) {
            console.error(error);
        }
    });
    (0, react_1.useEffect)(() => {
        setWishlist(wishlist);
    }, [wishlist]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "py-5" }, { children: (0, jsx_runtime_1.jsx)("div", { className: "border-t border-gray-900" }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "h-screen mt-3" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "flex items-center justify-center text-3xl font-semibold leading-8 tracking-tight text-gray-800 lg:text-4xl lg:leading-9" }, { children: "Wishlist" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container flex flex-wrap gap-6 px-4 py-12 mx-auto md:px-6 2xl:px-0 " }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "flex flex-row items-start jusitfy-start" }), wishlist.map((w, idx) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex flex-row w-auto h-full mt-10 lg:mt-12 lg:flex-col gap-x-8 gap-y-10 lg:gap-y-0" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col h-full" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "relative block mb-2 overflow-hidden bg-gray-100 rounded-lg shadow-lg group h-[20rem] lg:mb-3" }, { children: [(0, jsx_runtime_1.jsx)("img", { className: "hidden h-full shadow-2xl lg:block rounded-xl ", src: w.front_url, alt: "product" }), (0, jsx_runtime_1.jsx)("img", { className: "hidden w-full h-full sm:block lg:hidden", src: w.front_url, alt: "product" }), (0, jsx_runtime_1.jsx)("img", { className: "w-full h-full  sm:hidden", src: w.front_url, alt: "product" })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-center justify-between mt-6" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex items-center justify-center" }, { children: (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "font-semibold leading-6 tracking-tight text-gray-800 capitalize text-md" }, { children: w.title })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex items-center justify-center" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ "aria-label": "show menu", onClick: () => {
                                                            const newShow = [...show];
                                                            newShow[idx] = !newShow[idx];
                                                            setShow(newShow);
                                                        }, className: "px-1 py-1 text-xs text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:text-gray-400" }, { children: show[idx] ? "Hide" : "Show" })) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: `menu${idx}`, className: ` flex-col jusitfy-start items-start mt-12 ${show[idx] ? "flex" : "hidden"}` }, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "text-xs leading-3 tracking-tight text-gray-800 capitalize" }, { children: w.description })) }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mt-6" }, { children: (0, jsx_runtime_1.jsxs)("p", Object.assign({ className: "text-xs font-medium leading-4 tracking-tight text-gray-800" }, { children: ["$", w.price] })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col items-center w-full mt-10 space-y-4 jusitfy-between lg:flex-row lg:space-y-0 lg:space-x-4 xl:space-x-8" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "w-full" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => handleDeletewishlist(w.product_id), className: "w-full py-2 leading-4 tracking-tight text-black bg-gray-400 border border-gray-800 rounded-md  focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-md hover:bg-red-600 hover:text-white" }, { children: "Remove" })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "w-full" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: (e) => addProductToCart(e, Number(w.product_id)), className: "w-full py-2 leading-4 tracking-tight text-white bg-gray-800 border border-gray-800 rounded-md focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-md hover:bg-green-600" }, { children: "Add to cart" })) }))] }))] }))] })) }), idx)))] }))] }))] }));
};
exports.default = WishList;
