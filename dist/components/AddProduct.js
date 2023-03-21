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
const Modal_1 = __importDefault(require("./Modal"));
const AddProduct = (props) => {
    const [title, setTitle] = (0, react_1.useState)("");
    const [description, setDescription] = (0, react_1.useState)("");
    const [price, setPrice] = (0, react_1.useState)(2999.99);
    const [front_url, setFront_url] = (0, react_1.useState)("https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
    const [back_url, setBack_url] = (0, react_1.useState)("https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
    const [tags, setTags] = (0, react_1.useState)("");
    const [small, setSmall] = (0, react_1.useState)(1);
    const [medium, setMedium] = (0, react_1.useState)(1);
    const [large, setLarge] = (0, react_1.useState)(1);
    const [xlarge, setXlarge] = (0, react_1.useState)(1);
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const history = (0, react_router_dom_1.useNavigate)();
    const handleCreate = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const data = {
            title,
            description,
            price,
            front_url,
            back_url,
            tags,
            small,
            medium,
            large,
            xlarge,
        };
        const create = yield (0, api_1.fetchCreateProduct)(data);
        console.log({ create });
        props.setSuccess(true);
        props.setSuccessTitle("Success!");
        props.setSuccessMsg("Product created!");
        setShowModal(false);
    });
    return ((0, jsx_runtime_1.jsx)(Modal_1.default, Object.assign({ showModal: showModal, setShowModal: setShowModal, handleSubmit: handleCreate, modalTitle: "Add product", modalTxt: "Add product", submitBtnText: "Add" }, { children: (0, jsx_runtime_1.jsx)("section", Object.assign({ className: "bg-white " }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "max-w-2xl px-4 py-8 mx-auto lg:py-16" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ className: "mb-4 text-xl font-bold" }, { children: "Add a new product" })), (0, jsx_runtime_1.jsx)("form", Object.assign({ onSubmit: handleCreate }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "grid gap-4 sm:grid-cols-2 sm:gap-6" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "sm:col-span-2" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block mb-2 text-sm font-medium" }, { children: "Product Name" })), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "name", value: title, id: "name", className: "text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500", placeholder: "Type product name", onChange: (e) => setTitle(e.target.value), required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-full" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block mb-2 text-sm font-medium" }, { children: "Tags" })), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "tags", value: tags, id: "tags", className: "text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500", placeholder: "Tags", onChange: (e) => setTags(e.target.value), required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-full" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block mb-2 text-sm font-medium" }, { children: "Price" })), (0, jsx_runtime_1.jsx)("input", { type: "number", name: "price", value: price, id: "price", className: "text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500", placeholder: "$2999", required: true, onChange: (e) => setPrice(e.target.valueAsNumber) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-full" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block mb-2 text-sm font-medium" }, { children: "Front Image URL" })), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "front_url", value: front_url, id: "front_url", className: " text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500", placeholder: "front_url", onChange: (e) => setFront_url(e.target.value), required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-full" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block mb-2 text-sm font-medium" }, { children: "Back Image URL" })), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "back_url", value: back_url, id: "back_url", className: "border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500", placeholder: "back_url", onChange: (e) => setBack_url(e.target.value), required: true })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "sm:col-span-2" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex justify-between space-x-4" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-40" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block mb-2 text-sm font-medium" }, { children: "Small" })), (0, jsx_runtime_1.jsx)("input", { type: "number", name: "small", value: small, id: "small", className: " text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500", placeholder: "1", required: true, onChange: (e) => setSmall(e.target.valueAsNumber) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-40" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block mb-2 text-sm font-medium" }, { children: "Medium" })), (0, jsx_runtime_1.jsx)("input", { type: "number", name: "medium", value: medium, id: "medium", className: " text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500", placeholder: "1", required: true, onChange: (e) => setMedium(e.target.valueAsNumber) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-40" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block mb-2 text-sm font-medium" }, { children: "Large" })), (0, jsx_runtime_1.jsx)("input", { type: "number", name: "large", value: large, id: "large", className: " text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500", placeholder: "1", required: true, onChange: (e) => setLarge(e.target.valueAsNumber) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-40" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block mb-2 text-sm font-medium" }, { children: "X-Large" })), (0, jsx_runtime_1.jsx)("input", { type: "number", name: "xlarge", value: xlarge, id: "xlarge", className: " text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500", placeholder: "1", required: true, onChange: (e) => setXlarge(e.target.valueAsNumber) })] }))] })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "sm:col-span-2" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block mb-2 text-sm font-medium" }, { children: "Description" })), (0, jsx_runtime_1.jsx)("textarea", { id: "description", rows: 8, value: description, className: "block p-2.5 w-full text-sm   rounded-lg border focus:ring-primary-500 focus:border-primary-500 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500", placeholder: "Your description here", onChange: (e) => setDescription(e.target.value) })] }))] })) }))] })) })) })));
};
exports.default = AddProduct;
