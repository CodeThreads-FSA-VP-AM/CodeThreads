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
const AddProduct = () => {
    const [title, setTitle] = (0, react_1.useState)("");
    const [description, setDescription] = (0, react_1.useState)("");
    const [price, setPrice] = (0, react_1.useState)(0);
    const [front_url, setFront_url] = (0, react_1.useState)("https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
    const [back_url, setBack_url] = (0, react_1.useState)("https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
    const [tags, setTags] = (0, react_1.useState)("");
    const [small, setSmall] = (0, react_1.useState)(0);
    const [medium, setMedium] = (0, react_1.useState)(0);
    const [large, setLarge] = (0, react_1.useState)(0);
    const [xlarge, setXlarge] = (0, react_1.useState)(0);
    const history = (0, react_router_dom_1.useNavigate)();
    const handleCreate = (e) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("triggered");
        e.preventDefault();
        const data = { title, description, price, front_url, back_url, tags, small, medium, large, xlarge };
        console.log(data);
        const create = yield (0, api_1.fetchCreateProduct)(data);
        console.log({ create });
        history(-1);
    });
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "AddProduct" }), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: handleCreate }, { children: [(0, jsx_runtime_1.jsx)("label", { children: "title" }), (0, jsx_runtime_1.jsx)("input", { className: "mx-1 bg-gray-200 border", type: "text", value: title, onChange: (e) => setTitle(e.target.value), required: true }), (0, jsx_runtime_1.jsx)("label", { children: "description" }), (0, jsx_runtime_1.jsx)("input", { className: "mx-1 bg-gray-200 border", type: "text", value: description, onChange: (e) => setDescription(e.target.value), required: true }), (0, jsx_runtime_1.jsx)("label", { children: "price" }), (0, jsx_runtime_1.jsx)("input", { className: "mx-1 bg-gray-200 border", type: "number", value: price, onChange: (e) => setPrice(e.target.valueAsNumber) }), (0, jsx_runtime_1.jsx)("label", { children: "front_url" }), (0, jsx_runtime_1.jsx)("input", { className: "mx-1 bg-gray-200 border", type: "text", value: front_url, onChange: (e) => setFront_url(e.target.value) }), (0, jsx_runtime_1.jsx)("label", { children: "back_url" }), (0, jsx_runtime_1.jsx)("input", { className: "mx-1 bg-gray-200 border", type: "text", value: back_url, onChange: (e) => setBack_url(e.target.value) }), (0, jsx_runtime_1.jsx)("label", { children: "tags" }), (0, jsx_runtime_1.jsx)("input", { className: "mx-1 bg-gray-200 border", type: "text", value: tags, onChange: (e) => setTags(e.target.value) }), (0, jsx_runtime_1.jsx)("label", { children: "small" }), (0, jsx_runtime_1.jsx)("input", { className: "mx-1 bg-gray-200 border", type: "number", value: small, onChange: (e) => setSmall(e.target.valueAsNumber) }), (0, jsx_runtime_1.jsx)("label", { children: "medium" }), (0, jsx_runtime_1.jsx)("input", { className: "mx-1 bg-gray-200 border", type: "number", value: medium, onChange: (e) => setMedium(e.target.valueAsNumber) }), (0, jsx_runtime_1.jsx)("label", { children: "large" }), (0, jsx_runtime_1.jsx)("input", { className: "mx-1 bg-gray-200 border", type: "number", value: large, onChange: (e) => setLarge(e.target.valueAsNumber) }), (0, jsx_runtime_1.jsx)("label", { children: "xlarge" }), (0, jsx_runtime_1.jsx)("input", { className: "mx-1 bg-gray-200 border", type: "number", value: xlarge, onChange: (e) => setXlarge(e.target.valueAsNumber) }), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "bg-slate-500", type: "submit" }, { children: "create" }))] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => history(-1) }, { children: "go back" }))] }));
};
exports.default = AddProduct;
