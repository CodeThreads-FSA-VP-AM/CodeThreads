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
const AddReview = (props) => {
    const [title, setTitle] = (0, react_1.useState)("");
    const [rating, setRating] = (0, react_1.useState)(1);
    const [description, setDescription] = (0, react_1.useState)("");
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const handleCreateReview = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            if (title.length > 0 && description.length > 0) {
                const newReview = yield (0, api_1.createReview)({
                    product_id: props.product_id,
                    token: props.token,
                    title,
                    description,
                    rating,
                });
                if (newReview) {
                    setShowModal(false);
                }
                setTitle("");
                setRating(0);
                setDescription("");
                props.setReviews([...props.reviews, newReview]);
                props.setSuccess(true);
                props.setSuccessTitle("Success!");
                props.setSuccessMsg("You created a review!");
                console.log(newReview);
            }
        }
        catch (error) {
            console.error(error);
        }
    });
    return ((0, jsx_runtime_1.jsxs)(Modal_1.default, Object.assign({ showModal: showModal, setShowModal: setShowModal, handleSubmit: handleCreateReview, modalTitle: "Add review", modalTxt: "Add review", submitBtnText: "Create" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "hidden sm:block", "aria-hidden": "true" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "py-5" }, { children: (0, jsx_runtime_1.jsx)("div", { className: "border-t border-gray-200" }) })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mt-10 sm:mt-0" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col md:gap-6" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "md:col-span-1" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "px-4 sm:px-0" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "-ml-0.5 flex" }, { children: [(0, jsx_runtime_1.jsx)("h3", Object.assign({ className: "mx-8 text-base font-semibold leading-6 text-gray-900" }, { children: "Review" })), (0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "w-5 h-5 text-yellow-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })), (0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "w-5 h-5 text-yellow-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })), (0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "w-5 h-5 text-yellow-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })), (0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "w-5 h-5 text-yellow-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })), (0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "w-5 h-5 text-yellow-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }))] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "mx-8 text-sm text-gray-600" }, { children: "Please fill out all sections to add a review." }))] })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mt-5 md:col-span-2 md:mt-0" }, { children: (0, jsx_runtime_1.jsx)("form", { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "overflow-hidden shadow sm:rounded-md" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "px-4 py-5 bg-white sm:p-6" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "grid grid-cols-6 gap-6" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "col-span-6 sm:col-span-4" }, { children: [(0, jsx_runtime_1.jsxs)("label", Object.assign({ htmlFor: "first-name", className: "block text-sm font-medium text-gray-700", "aria-required": true }, { children: ["Username", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-[#F70000]" }, { children: "*" }))] })), (0, jsx_runtime_1.jsx)("input", { required: true, type: "text", name: "first-name", id: "first-name", autoComplete: "given-name", className: "block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "col-span-6 sm:col-span-3" }, { children: [(0, jsx_runtime_1.jsxs)("label", Object.assign({ htmlFor: "title", className: "block text-sm font-medium text-gray-700", "aria-required": "true" }, { children: ["Title", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-[#F70000]" }, { children: "*" }))] })), (0, jsx_runtime_1.jsx)("input", { minLength: 10, type: "text", required: true, name: "title", id: "title", autoComplete: "title", className: "block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm", value: title, onChange: (e) => setTitle(e.target.value) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col " }, { children: [(0, jsx_runtime_1.jsxs)("label", Object.assign({ htmlFor: "country", className: "block text-sm font-medium text-gray-700", "aria-required": "true" }, { children: ["Rating", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-[#F70000]" }, { children: "*" }))] })), (0, jsx_runtime_1.jsxs)("select", Object.assign({ id: "country", name: "country", autoComplete: "country-name", required: true, className: "block w-[44px] px-1 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm", value: rating, defaultValue: 1, onChange: (e) => setRating(parseInt(e.target.value)) }, { children: [(0, jsx_runtime_1.jsx)("option", { children: "1" }), (0, jsx_runtime_1.jsx)("option", { children: "2" }), (0, jsx_runtime_1.jsx)("option", { children: "3" }), (0, jsx_runtime_1.jsx)("option", { children: "4" }), (0, jsx_runtime_1.jsx)("option", { children: "5" })] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "col-span-4" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "description", className: "block text-sm font-medium text-gray-700" }, { children: "Description" })), (0, jsx_runtime_1.jsx)("textarea", { name: "description", id: "description", autoComplete: "description", className: "block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm", value: description, onChange: (e) => setDescription(e.target.value) })] }))] })) })) })) }) }))] })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "hidden sm:block", "aria-hidden": "true" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "py-5" }, { children: (0, jsx_runtime_1.jsx)("div", { className: "border-t border-gray-200" }) })) }))] })));
};
exports.default = AddReview;
