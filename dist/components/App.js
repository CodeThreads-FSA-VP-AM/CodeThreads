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
const UserProfile_1 = __importDefault(require("./UserProfile"));
const AccountSettings_1 = __importDefault(require("./AccountSettings"));
const SuccessNotification_1 = __importDefault(require("./SuccessNotification"));
const MaleProducts_1 = __importDefault(require("./MaleProducts"));
const FemaleProducts_1 = __importDefault(require("./FemaleProducts"));
const WishList_1 = __importDefault(require("./WishList"));
const ErrorNotification_1 = __importDefault(require("./ErrorNotification"));
const App = () => {
    const [productId, setProductId] = (0, react_1.useState)(0);
    const [quantity, setQuantity] = (0, react_1.useState)(0);
    const [product, setProduct] = (0, react_1.useState)();
    const [token, setToken] = (0, react_1.useState)("");
    const [user, setUser] = (0, react_1.useState)({});
    const [userId, setUserId] = (0, react_1.useState)(0);
    const [error, setError] = (0, react_1.useState)(false);
    const [errorNoti, setErrorNoti] = (0, react_1.useState)("");
    const [success, setSuccess] = (0, react_1.useState)(false);
    const [successMsg, setSuccessMsg] = (0, react_1.useState)("");
    const [successTitle, setSuccessTitle] = (0, react_1.useState)("");
    const [productsLength, setProductsLength] = (0, react_1.useState)(0);
    const [wishlist, setWishlist] = (0, react_1.useState)([]);
    const [orders, setOrders] = (0, react_1.useState)([]);
    const [orderId, setOrderId] = (0, react_1.useState)(2);
    const [mensProducts, setMensProducts] = (0, react_1.useState)([]);
    const [womensProducts, setWomensProducts] = (0, react_1.useState)([]);
    const [products, setProducts] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const productsAll = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const products = yield (0, api_1.fetchProducts)();
                // console.log(products);
                if (products) {
                    const mensProducts = products.filter((product) => product.tags.some((tag) => tag.name === "mens"));
                    setMensProducts(mensProducts);
                }
                console.log(mensProducts);
                const womensProducts = products.filter((product) => product.tags.some((tag) => tag.name === "womens"));
                setWomensProducts(womensProducts);
                setProducts(products);
            }
            catch (error) {
                console.error(error);
            }
        });
        productsAll();
    }, []);
    (0, react_1.useEffect)(() => {
        const getUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { token } = data;
            try {
                const user = yield (0, api_1.fetchUser)({ token });
                setUserId(user.id);
                setUser(user);
            }
            catch (error) {
                console.error(error);
            }
        });
        getUser({ token });
        const fetchWishlist = (userId) => __awaiter(void 0, void 0, void 0, function* () {
            const wishlists = yield (0, api_1.fetchWishlistByUser)(userId);
            console.log(wishlists);
            const filteredWishlist = wishlists.filter((wishlist) => wishlist.users_id === userId);
            setWishlist(filteredWishlist);
        });
        if (userId !== undefined) {
            fetchWishlist(userId);
        }
        const fetchOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
            const orders = yield (0, api_1.fetchOrder)(userId);
            console.log(orders);
            const getorderid = orders.filter((o) => o.status === "added");
            console.log(getorderid.length);
            setProductsLength(getorderid.length);
            const orderid = getorderid[0];
            if ((orderid === null || orderid === void 0 ? void 0 : orderid.order_id) !== undefined) {
                setOrderId(orderid.order_id);
            }
            const filteredOrders = orders.filter((order) => order.users_id === userId && order.status === "added");
            setOrders(filteredOrders);
        });
        if (userId !== undefined) {
            fetchOrders(userId);
        }
    }, [token, userId, orderId]);
    (0, react_1.useEffect)(() => {
        var _a;
        const token = (_a = localStorage.getItem("token")) !== null && _a !== void 0 ? _a : "";
        setToken(token);
    }, []);
    (0, react_1.useEffect)(() => {
        setWishlist(wishlist);
        setOrders(orders);
    }, [wishlist, orders]);
    const getProduct = () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield (0, api_1.fetchProductById)(productId);
        setProduct(product);
    });
    (0, react_1.useEffect)(() => {
        getProduct();
    }, [productId]);
    (0, react_1.useEffect)(() => { }, [
        successMsg,
        successTitle,
        productsLength,
        wishlist,
        wishlist.length,
    ]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.BrowserRouter, { children: [(0, jsx_runtime_1.jsx)(Navbar_1.default, { user: user, token: token, setToken: setToken, wishListLength: wishlist.length, ordersLength: orders.length }), success && ((0, jsx_runtime_1.jsx)(SuccessNotification_1.default, { success: success, setSuccess: setSuccess, successTitle: successTitle, successMsg: successMsg })), error && ((0, jsx_runtime_1.jsx)(ErrorNotification_1.default, { error: error, setError: setError, errorNoti: errorNoti })), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/home" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "*", element: (0, jsx_runtime_1.jsx)(NotFound_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/register", element: (0, jsx_runtime_1.jsx)(Register_1.default, { setToken: setToken, success: success, setSuccess: setSuccess, setSuccessTitle: setSuccessTitle, setSuccessMsg: setSuccessMsg }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", element: (0, jsx_runtime_1.jsx)(Login_1.default, { setToken: setToken, success: success, setSuccess: setSuccess, setSuccessTitle: setSuccessTitle, setSuccessMsg: setSuccessMsg, setError: setError, setErrorNoti: setErrorNoti }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/products", element: (0, jsx_runtime_1.jsx)(Products_1.default, { setProductId: setProductId, user: user, setSuccess: setSuccess, setSuccessTitle: setSuccessTitle, setSuccessMsg: setSuccessMsg, products: products, setProducts: setProducts }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/mens", element: (0, jsx_runtime_1.jsx)(MaleProducts_1.default, { setProductId: setProductId, user: user, setSuccess: setSuccess, setSuccessTitle: setSuccessTitle, setSuccessMsg: setSuccessMsg, mensProducts: mensProducts, setMensProducts: setMensProducts }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/womens", element: (0, jsx_runtime_1.jsx)(FemaleProducts_1.default, { setProductId: setProductId, user: user, setSuccess: setSuccess, setSuccessTitle: setSuccessTitle, setSuccessMsg: setSuccessMsg, womensProducts: womensProducts, setWomensProducts: setWomensProducts }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/products/:id", element: (0, jsx_runtime_1.jsx)(SingleView_1.default, { quantity: quantity, user: user, setSuccess: setSuccess, setSuccessTitle: setSuccessTitle, setSuccessMsg: setSuccessMsg, wishlist: wishlist, setWishlist: setWishlist, orders: orders, setOrders: setOrders }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/orders", element: (0, jsx_runtime_1.jsx)(Orders_1.default, { setProductsLength: setProductsLength, wishlist: wishlist, setWishlist: setWishlist, setSuccess: setSuccess, setSuccessTitle: setSuccessTitle, setSuccessMsg: setSuccessMsg, orders: orders, setOrders: setOrders }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/addproduct", element: (0, jsx_runtime_1.jsx)(AddProduct_1.default, { setSuccess: setSuccess, setSuccessTitle: setSuccessTitle, setSuccessMsg: setSuccessMsg }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/edit/:id", element: (0, jsx_runtime_1.jsx)(EditProduct_1.default, { product: product, productId: productId, setProductId: setProductId }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/featured", element: (0, jsx_runtime_1.jsx)(Featured_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/home", element: (0, jsx_runtime_1.jsx)(Home_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/admin", element: (0, jsx_runtime_1.jsx)(AdminNav_1.default, { setProductId: setProductId, user: user, setProductsLength: setProductsLength, setSuccess: setSuccess, setSuccessTitle: setSuccessTitle, setSuccessMsg: setSuccessMsg, products: products, setProducts: setProducts }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/checkout", element: (0, jsx_runtime_1.jsx)(StripeContainer_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/success", element: (0, jsx_runtime_1.jsx)(Completion_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/test", element: (0, jsx_runtime_1.jsx)(TestStripe_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/orderhistory", element: (0, jsx_runtime_1.jsx)(OrderHistroy_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/userprofile", element: (0, jsx_runtime_1.jsx)(UserProfile_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/accountsettings", element: (0, jsx_runtime_1.jsx)(AccountSettings_1.default, { user: user, token: token, setUser: setUser }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/wishlist", element: (0, jsx_runtime_1.jsx)(WishList_1.default, { quantity: quantity, setSuccess: setSuccess, setSuccessTitle: setSuccessTitle, setSuccessMsg: setSuccessMsg, wishlist: wishlist, setWishlist: setWishlist, token: token }) })] }) })] }) }));
};
exports.default = App;
