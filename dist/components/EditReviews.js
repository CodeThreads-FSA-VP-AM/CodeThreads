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
const EditReviews = (props) => {
    // console.log(props);
    const [title, setTitle] = (0, react_1.useState)(props.title);
    const [rating, setRating] = (0, react_1.useState)(props.rating);
    const [description, setDescription] = (0, react_1.useState)(props.description);
    const [token, setToken] = (0, react_1.useState)("");
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleEditReview = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            const data = {
                title,
                description,
                rating,
                token,
                reviewId: props.reviewId,
            };
            const editedReview = yield (0, api_1.editReview)(data);
            const editedReviewIndex = props.reviews.findIndex((review) => review.id === props.reviewId);
            const updatedReviews = [...props.reviews];
            updatedReviews[editedReviewIndex] = editedReview;
            props.setReviews(updatedReviews);
        }
        catch (error) {
            console.error(error);
        }
    });
    (0, react_1.useEffect)(() => {
        var _a;
        const token = (_a = localStorage.getItem("token")) !== null && _a !== void 0 ? _a : "";
        setToken(token);
    }, [token]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mt-5 md:col-span-2 md:mt-0" }, { children: (0, jsx_runtime_1.jsx)("form", Object.assign({ onSubmit: handleEditReview }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "overflow-hidden shadow sm:rounded-md" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "bg-white px-4 py-5 sm:p-6" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "grid grid-cols-6 gap-6" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "col-span-6 sm:col-span-3" }, { children: [(0, jsx_runtime_1.jsxs)("label", Object.assign({ htmlFor: "title", className: "block text-sm font-medium text-gray-700", "aria-required": "true" }, { children: ["Title", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-[#F70000]" }, { children: "*" }))] })), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "title", id: "title", autoComplete: "title", className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm", value: title, onChange: (e) => setTitle(e.target.value) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "col-span-6 sm:col-span-1" }, { children: [(0, jsx_runtime_1.jsxs)("label", Object.assign({ htmlFor: "country", className: "block text-sm font-medium text-gray-700", "aria-required": "true" }, { children: ["Rating", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-[#F70000]" }, { children: "*" }))] })), (0, jsx_runtime_1.jsxs)("select", Object.assign({ id: "country", name: "country", autoComplete: "country-name", className: "mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm", value: rating, defaultValue: 1, onChange: (e) => setRating(parseInt(e.target.value)) }, { children: [(0, jsx_runtime_1.jsx)("option", { children: "1" }), (0, jsx_runtime_1.jsx)("option", { children: "2" }), (0, jsx_runtime_1.jsx)("option", { children: "3" }), (0, jsx_runtime_1.jsx)("option", { children: "4" }), (0, jsx_runtime_1.jsx)("option", { children: "5" })] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "col-span-4" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "description", className: "block text-sm font-medium text-gray-700" }, { children: "Description" })), (0, jsx_runtime_1.jsx)("textarea", { name: "description", id: "description", autoComplete: "description", className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm", value: description, onChange: (e) => setDescription(e.target.value) })] }))] })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "bg-gray-50 px-4 py-3 text-left sm:px-6" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", className: "inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" }, { children: "Edit" })) }))] })) })) })) }));
};
exports.default = EditReviews;
