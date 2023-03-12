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
const HighLights_1 = __importDefault(require("./HighLights"));
const Loader_1 = __importDefault(require("./Loader"));
const Orders = () => {
    const [show, setShow] = (0, react_1.useState)(false);
    const [orders, setOrders] = (0, react_1.useState)([]);
    const [userId, setUserId] = (0, react_1.useState)(0);
    const [orderId, setOrderId] = (0, react_1.useState)(2);
    const [token, setToken] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [cart, setCart] = (0, react_1.useState)([]);
    const [product, setProduct] = (0, react_1.useState)();
    let navigate = (0, react_router_dom_1.useNavigate)();
    const totalPrice = orders.reduce((total, order) => total + order.price * order.quantity, 0);
    // use session storage to track guest users products they add to cart
    //Create a ternary to showcase diff functions that would either add it to the session storage or add it to the cart
    //Merge the two carts of the user and guest when they log in
    // console.log({ orderId });
    const handleDeleteOrder = (product_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield (0, api_1.deleteOrder)({
                product_id,
                token: token,
            });
            console.log(res);
            setOrders(orders.filter((order) => order.product_id !== product_id));
        }
        catch (error) {
            console.error(error);
        }
    });
    const handleDeleteCartItem = (productId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedCart = cart.filter((item) => item.id !== productId);
            sessionStorage.setItem('cart', JSON.stringify(updatedCart));
            setCart(updatedCart);
            const updatedProducts = yield Promise.all(updatedCart.map((item) => (0, api_1.fetchProductById)(item.id)));
            setProduct(updatedProducts);
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
        const token = (_a = localStorage.getItem('token')) !== null && _a !== void 0 ? _a : '';
        setToken(token);
        getUser({ token });
    }, [token]);
    (0, react_1.useEffect)(() => {
        const fetchOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
            const orders = yield (0, api_1.fetchOrder)(userId);
            console.log(orders);
            const getorderid = orders.filter((o) => o.status === 'added');
            console.log(getorderid);
            const orderid = getorderid[0];
            if ((orderid === null || orderid === void 0 ? void 0 : orderid.order_id) !== undefined) {
                setOrderId(orderid.order_id);
            }
            const filteredOrders = orders.filter((order) => order.users_id === userId && order.status === 'added');
            setOrders(filteredOrders);
            setLoading(false);
        });
        if (userId !== undefined) {
            fetchOrders(userId);
        }
    }, [token, userId, orderId]);
    //checkout function
    //needs to close or create a new row in the orders table
    //onclick function on the checkout button
    const checkout = () => __awaiter(void 0, void 0, void 0, function* () {
        // await fetch('http://localhost:4000/create-payment-intent', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({}),
        // })
        //   .then((r) => {
        //     return r.json();
        //   })
        //   .then((r) => {
        //     if (r.url) {
        //       window.location.assign(r.url);
        //     }
        //   });
        // const { id: orderId } = orders;
        try {
            const order = yield (0, api_1.checkoutOrder)(userId, orderId, token);
            console.log({ order });
            if (order) {
                setOrders([]);
                // setOrders(orders.filter((order) => order.status === 'added'));
                setProduct([]);
                setCart([]);
            }
        }
        catch (error) {
            console.error(error);
        }
    });
    (0, react_1.useEffect)(() => {
        const cartData = JSON.parse(sessionStorage.getItem('cart') || '[]');
        setCart(cartData);
    }, []);
    (0, react_1.useEffect)(() => {
        if (cart.length > 0) {
            const productIds = cart.map((item) => item.id);
            const fetchProducts = () => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const fetchedProducts = yield Promise.all(productIds.map((id) => (0, api_1.fetchProductById)(id)));
                    setProduct(fetchedProducts);
                    setLoading(false);
                }
                catch (error) {
                    console.error(error);
                }
            });
            fetchProducts();
        }
    }, [cart]);
    // console.log(cart);
    // console.log(orders);
    // console.log(userId);
    // console.log(product);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: loading ? ((0, jsx_runtime_1.jsx)(Loader_1.default, {})) : ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'fixed top-0 w-full h-full overflow-x-hidden overflow-y-auto bg-black bg-opacity-90 sticky-0', id: 'chec-div' }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'absolute right-0 z-10 w-full h-full overflow-x-hidden transition duration-700 ease-in-out transform translate-x-0', id: 'checkout' }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'flex flex-col justify-end md:flex-row', id: 'cart' }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'w-full h-screen py-8 pl-4 pr-10 overflow-x-hidden overflow-y-auto bg-white lg:w-1/2 md:pl-10 md:pr-4 md:py-12', id: 'scroll' }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'flex items-center text-gray-500 cursor-pointer hover:text-gray-600', onClick: () => setShow(!show) }, { children: [(0, jsx_runtime_1.jsxs)("svg", Object.assign({ xmlns: 'http://www.w3.org/2000/svg', className: 'icon icon-tabler icon-tabler-chevron-left', width: 16, height: 16, viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor', fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }, { children: [(0, jsx_runtime_1.jsx)("path", { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }), (0, jsx_runtime_1.jsx)("polyline", { points: '15 6 9 12 15 18' })] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'pl-2 text-sm leading-none', onClick: () => navigate(-1) }, { children: "Back" }))] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'pt-3 text-5xl font-black leading-10 text-gray-800' }, { children: "Cart" })), orders
                                        .filter((o) => o.users_id === userId && o.status === 'added')
                                        .map((o, idx) => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'items-center py-8 border-t border-gray-200 md:flex mt-14' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'w-1/4' }, { children: (0, jsx_runtime_1.jsx)("img", { src: o.front_url, alt: '...', className: 'object-cover object-center w-full h-full' }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'md:pl-3 md:w-3/4' }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'pt-4 text-xs leading-3 text-gray-800 md:pt-0' }, { children: 1 + idx++ })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'flex items-center justify-between w-full pt-1' }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'text-base font-black leading-none text-gray-800 capitalize' }, { children: o.title })), (0, jsx_runtime_1.jsx)("label", Object.assign({ className: 'p-1 border border-gray-200 focus:outline-none' }, { children: (0, jsx_runtime_1.jsx)("input", { type: 'number', min: '1', max: '10', defaultValue: o.quantity, className: 'border-2 border-gray-500 ' }) }))] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'pt-2 text-xs leading-3 text-gray-600 capitalize' }, { children: o.description })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'py-4 text-xs leading-3 text-gray-600' }, { children: "Color: Black" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'text-xs leading-3 text-gray-600 capitalize w-96' }, { children: o.status })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'flex items-center justify-between pt-5 pr-6' }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'flex itemms-center' }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'text-xs leading-3 text-gray-800 underline cursor-pointer' }, { children: "Add to favorites" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'pl-5 text-xs leading-3 text-red-500 underline cursor-pointer', onClick: () => handleDeleteOrder(o.product_id) }, { children: "Remove" }))] })), (0, jsx_runtime_1.jsxs)("p", Object.assign({ className: 'text-base font-black leading-none text-gray-800' }, { children: ["$", o.price * o.quantity] }))] }))] }))] }), idx))), product === null || product === void 0 ? void 0 : product.map((p, idx) => {
                                        const cartItem = cart.find((item) => item.id === p.id);
                                        const quantity = cartItem ? cartItem.quantity : 0;
                                        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'items-center py-8 border-t border-gray-200 md:flex mt-14' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'w-1/4' }, { children: (0, jsx_runtime_1.jsx)("img", { src: p.front_url, alt: '...', className: 'object-cover object-center w-full h-full' }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'md:pl-3 md:w-3/4' }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'pt-4 text-xs leading-3 text-gray-800 md:pt-0' }, { children: 1 + idx })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'flex items-center justify-between w-full pt-1' }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'text-base font-black leading-none text-gray-800 capitalize' }, { children: p.title })), (0, jsx_runtime_1.jsx)("label", Object.assign({ className: 'p-1 border border-gray-200 focus:outline-none' }, { children: (0, jsx_runtime_1.jsx)("input", { type: 'number', min: '1', max: '10', defaultValue: quantity, className: 'border-2 border-gray-500 ' }) }))] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'pt-2 text-xs leading-3 text-gray-600 capitalize' }, { children: p.description })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'py-4 text-xs leading-3 text-gray-600' }, { children: "Color: Black" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'text-xs leading-3 text-gray-600 capitalize w-96' }, { children: p.status })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'flex items-center justify-between pt-5 pr-6' }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'flex itemms-center' }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'text-xs leading-3 text-gray-800 underline cursor-pointer' }, { children: "Add to favorites" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'pl-5 text-xs leading-3 text-red-500 underline cursor-pointer', onClick: () => handleDeleteCartItem(p.id) }, { children: "Remove" }))] })), (0, jsx_runtime_1.jsxs)("p", Object.assign({ className: 'text-base font-black leading-none text-gray-800' }, { children: ["$", (p.price * quantity).toFixed(2)] }))] }))] }))] }), idx));
                                    })] })), token ? ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'w-full h-full bg-gray-100 xl:w-1/2 md:w-1/3' }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'flex flex-col justify-between py-20 overflow-y-auto md:h-screen px-14' }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'text-4xl font-black leading-9 text-gray-800' }, { children: "Summary" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'flex items-center justify-between pt-16' }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'text-base leading-none text-gray-800' }, { children: "Subtotal" })), (0, jsx_runtime_1.jsxs)("p", Object.assign({ className: 'text-base leading-none text-gray-800' }, { children: ["$", totalPrice.toFixed(2)] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'flex items-center justify-between pt-5' }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'text-base leading-none text-gray-800' }, { children: "Shipping" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'text-base leading-none text-gray-800' }, { children: "Free" }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'flex items-center justify-between pt-5' }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'text-base leading-none text-gray-800' }, { children: "Tax" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'text-base leading-none text-gray-800' }, { children: "Calculated at checkout" }))] })), (0, jsx_runtime_1.jsx)(HighLights_1.default, {})] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'flex items-center justify-between pt-20 pb-6 lg:pt-5' }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'text-2xl leading-normal text-gray-800' }, { children: "Total" })), (0, jsx_runtime_1.jsxs)("p", Object.assign({ className: 'text-2xl font-bold leading-normal text-right text-gray-800' }, { children: ["$", totalPrice.toFixed(2)] }))] })), (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ to: '/checkout' }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ 
                                                        // onClick={() => setShow(!show)}
                                                        onClick: () => checkout(), className: 'w-full py-5 text-base leading-none text-white bg-gray-800 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800' }, { children: "Checkout" })) }))] })] })) }))) : ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'w-full h-full bg-gray-100 xl:w-1/2 md:w-1/3' }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'flex flex-col justify-between py-20 overflow-y-auto md:h-screen px-14' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'text-xl' }, { children: (0, jsx_runtime_1.jsx)("h1", { children: "Please login/signup to checkout." }) })), (0, jsx_runtime_1.jsx)(HighLights_1.default, {}), (0, jsx_runtime_1.jsxs)("ul", Object.assign({ className: 'flex flex-col gap-8' }, { children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ to: '/login', className: 'text-base text-gray-800 dark:text-black focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-gray-800 hover:underline' }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'w-full py-5 text-base leading-none text-white bg-gray-800 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800' }, { children: "Login" })) })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ to: '/register', className: 'text-base text-gray-800 dark:text-black focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-gray-800 hover:underline' }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'w-full py-5 text-base leading-none text-white bg-gray-800 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800' }, { children: "Sign Up" })) })) })] }))] })) })))] })) })) })) })) }));
};
exports.default = Orders;
