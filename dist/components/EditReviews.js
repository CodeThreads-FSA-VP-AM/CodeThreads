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
const Modal_1 = __importDefault(require("./Modal"));
const EditReviews = (props) => {
    const [title, setTitle] = (0, react_1.useState)(props.title);
    const [rating, setRating] = (0, react_1.useState)(props.rating);
    const [description, setDescription] = (0, react_1.useState)(props.description);
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [token, setToken] = (0, react_1.useState)("");
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
            setLoading(true);
            props.setSuccess(true);
            props.setSuccessTitle("Success!");
            props.setSuccessMsg("Review has been edited!");
            setShowModal(false);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    });
    (0, react_1.useEffect)(() => {
        var _a;
        const token = (_a = localStorage.getItem("token")) !== null && _a !== void 0 ? _a : "";
        setToken(token);
    }, [token]);
    return ((0, jsx_runtime_1.jsx)(Modal_1.default, Object.assign({ showModal: showModal, setShowModal: setShowModal, handleSubmit: handleEditReview, modalTitle: "Edit review", modalTxt: "Edit review", submitBtnText: "Edit" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mt-5 md:col-span-2 md:mt-0" }, { children: (0, jsx_runtime_1.jsx)("form", { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "overflow-hidden shadow sm:rounded-md" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "px-4 py-5 bg-white sm:p-6" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "grid grid-cols-6 gap-6" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "col-span-6 sm:col-span-3" }, { children: [(0, jsx_runtime_1.jsxs)("label", Object.assign({ htmlFor: "title", className: "block text-sm font-medium text-gray-700", "aria-required": "true" }, { children: ["Title", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-[#F70000]" }, { children: "*" }))] })), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "title", id: "title", autoComplete: "title", className: "block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm", value: title, onChange: (e) => setTitle(e.target.value) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "col-span-6 sm:col-span-1" }, { children: [(0, jsx_runtime_1.jsxs)("label", Object.assign({ htmlFor: "country", className: "block text-sm font-medium text-gray-700", "aria-required": "true" }, { children: ["Rating", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-[#F70000]" }, { children: "*" }))] })), (0, jsx_runtime_1.jsxs)("select", Object.assign({ id: "country", name: "country", autoComplete: "country-name", className: "block w-[44px] px-1 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm", value: rating, defaultValue: 1, onChange: (e) => setRating(parseInt(e.target.value)) }, { children: [(0, jsx_runtime_1.jsx)("option", { children: "1" }), (0, jsx_runtime_1.jsx)("option", { children: "2" }), (0, jsx_runtime_1.jsx)("option", { children: "3" }), (0, jsx_runtime_1.jsx)("option", { children: "4" }), (0, jsx_runtime_1.jsx)("option", { children: "5" })] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "col-span-4" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "description", className: "block text-sm font-medium text-gray-700" }, { children: "Description" })), (0, jsx_runtime_1.jsx)("textarea", { name: "description", id: "description", autoComplete: "description", className: "block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm", value: description, onChange: (e) => setDescription(e.target.value) })] }))] })) })) })) }) })) })));
};
exports.default = EditReviews;
