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
const api_1 = require("../api/api");
const EditReviews_1 = __importDefault(require("./EditReviews"));
const Loader_1 = __importDefault(require("./Loader"));
const Modal_1 = __importDefault(require("./Modal"));
const Reviews = (props) => {
    const [user, setUser] = (0, react_1.useState)("");
    const [userId, setUserId] = (0, react_1.useState)(0);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const handleDeleteReview = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
        const token = props.token;
        try {
            const res = yield (0, api_1.deleteReview)({ reviewId, token });
            console.log(res);
            props.setReviews(props.reviews.filter((review) => review.id !== reviewId));
            setShowModal(false);
            props.setSuccess(true);
            props.setSuccessTitle("Success!");
            props.setSuccessMsg("Review deleted!");
            setLoading(false);
        }
        catch (error) {
            console.error(error);
        }
    });
    (0, react_1.useEffect)(() => {
        const getUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { token } = data;
            try {
                const userInfo = yield (0, api_1.fetchUser)({ token });
                setUser(userInfo.username);
                setUserId(userInfo.id);
            }
            catch (error) {
                console.error(error);
            }
        });
        const token = props.token;
        getUser({ token });
    }, [user]);
    (0, react_1.useEffect)(() => {
        const getReviews = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const allReviews = yield (0, api_1.getAllReviews)();
                console.log(allReviews);
                props.setReviews(allReviews);
                setLoading(false);
            }
            catch (error) {
                console.error(error);
            }
        });
        getReviews();
    }, []);
    return ((0, jsx_runtime_1.jsx)("section", { children: loading ? ((0, jsx_runtime_1.jsx)(Loader_1.default, {})) : ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ className: "text-xl font-bold sm:text-2xl" }, { children: "Customer Reviews" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-center gap-4 mt-4" }, { children: [(0, jsx_runtime_1.jsxs)("p", Object.assign({ className: "text-3xl font-medium" }, { children: ["3.8", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "sr-only" }, { children: " Average review score " }))] })), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex" }, { children: [(0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", className: "w-5 h-5 text-yellow-400", viewBox: "0 0 20 20", fill: "currentColor" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })), (0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", className: "w-5 h-5 text-yellow-400", viewBox: "0 0 20 20", fill: "currentColor" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })), (0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", className: "w-5 h-5 text-yellow-400", viewBox: "0 0 20 20", fill: "currentColor" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })), (0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", className: "w-5 h-5 text-yellow-400", viewBox: "0 0 20 20", fill: "currentColor" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })), (0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", className: "w-5 h-5 text-gray-200", viewBox: "0 0 20 20", fill: "currentColor" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }))] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "mt-0.5 text-xs text-gray-500" }, { children: "Based on 48 reviews" }))] })] })), props.reviews
                    .filter((r) => r.product_id === props.product_id)
                    .map((r, idx) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "grid grid-cols-1 mt-8 gap-x-16 gap-y-12 lg:grid-cols-2" }, { children: (0, jsx_runtime_1.jsxs)("blockquote", { children: [(0, jsx_runtime_1.jsxs)("header", Object.assign({ className: "sm:flex sm:items-center sm:gap-4" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex" }, { children: [r.rating, "/5", (0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", className: `w-5 h-5 ${r.rating > 0 ? "text-yellow-400" : "text-gray-200"}`, viewBox: "0 0 20 20", fill: "currentColor" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })), (0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", className: `w-5 h-5 ${r.rating >= 2 ? "text-yellow-400" : "text-gray-200"}`, viewBox: "0 0 20 20", fill: "currentColor" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })), (0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", className: `w-5 h-5 ${r.rating >= 3 ? "text-yellow-400" : "text-gray-200"}`, viewBox: "0 0 20 20", fill: "currentColor" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })), (0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", className: `w-5 h-5 ${r.rating >= 4 ? "text-yellow-400" : "text-gray-200"}`, viewBox: "0 0 20 20", fill: "currentColor" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })), (0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", className: `w-5 h-5 ${r.rating >= 5 ? "text-yellow-400" : "text-gray-200"}`, viewBox: "0 0 20 20", fill: "currentColor" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }))] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "mt-2 font-medium sm:mt-0" }, { children: r.title }))] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "mt-2 text-gray-700" }, { children: r.description })), r.users_id === userId && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex gap-6" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "" }, { children: (0, jsx_runtime_1.jsx)(EditReviews_1.default, { description: r.description, title: r.title, rating: r.rating, reviewId: r.id, reviews: props.reviews, setReviews: props.setReviews, setSuccess: props.setSuccess, setSuccessTitle: props.setSuccessTitle, setSuccessMsg: props.setSuccessMsg }) })), (0, jsx_runtime_1.jsx)(Modal_1.default, Object.assign({ showModal: showModal, setShowModal: setShowModal, handleSubmit: () => handleDeleteReview(r.id), modalTitle: "Delete review", modalTxt: "Delete review", submitBtnText: "Delete" }, { children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("h1", { children: "Are you sure you want to delete this review?" }) }) }))] })))] }) }), idx)))] }))) }));
};
exports.default = Reviews;
