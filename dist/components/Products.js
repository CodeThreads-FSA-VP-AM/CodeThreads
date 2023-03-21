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
const AddProduct_1 = __importDefault(require("./AddProduct"));
const Footer_1 = __importDefault(require("./Footer"));
const Loader_1 = __importDefault(require("./Loader"));
const Modal_1 = __importDefault(require("./Modal"));
const Products = ({ setProductId, user, setSuccess, setSuccessMsg, setSuccessTitle, }) => {
    var _a;
    const [products, setProducts] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [selectedId, setSelectedId] = (0, react_1.useState)(0);
    const [message, setMessage] = (0, react_1.useState)("");
    const [search, setSearch] = (0, react_1.useState)("");
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const productsPerPage = 8;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const filteredProducts = products.filter((p) => {
        if (search === "") {
            return p;
        }
        else if (p.title.toLowerCase().includes(search)) {
            return p.title;
        }
        else if (p.tags.some((t) => t.name.toLowerCase() === search)) {
            return p;
        }
    });
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const handlePageClick = (page) => {
        setCurrentPage(page);
    };
    (0, react_1.useEffect)(() => {
        const loadProducts = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const allProducts = yield (0, api_1.fetchProducts)();
                console.log(allProducts);
                setProducts(allProducts);
                setLoading(false);
            }
            catch (error) {
                console.error(error);
            }
        });
        loadProducts();
    }, [message]);
    const idHandle = (id) => {
        console.log(id);
        setProductId(id);
    };
    const handleSelect = (e) => {
        setProductId(e.target.value);
        setSelectedId(e.target.value);
    };
    const handleDelete = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(selectedId);
        console.log("delete me");
        const deletedProduct = yield (0, api_1.fetchDeleteProduct)(selectedId);
        const filteredOrders = products.filter((p) => p.id !== selectedId);
        setProducts(filteredOrders);
        setMessage("product deleted");
        setSuccess(true);
        setSuccessTitle("Success!");
        setSuccessMsg("Product deleted!");
        setShowModal(false);
        setTimeout(() => {
            setMessage("");
        }, 3000);
        console.log("product removed", deletedProduct);
    });
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("section", Object.assign({ className: "py-6 bg-white sm:py-8 lg:py-12" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "px-4 mx-auto max-w-screen-2xl md:px-8" }, { children: [(0, jsx_runtime_1.jsxs)("header", Object.assign({ className: "mb-10 md:mb-16" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ className: "mb-4 text-2xl font-bold text-center text-gray-800 lg:text-3xl md:mb-6" }, { children: "Product Collection" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "max-w-screen-md mx-auto text-center text-gray-500 md:text-lg" }, { children: "From everyday essentials to statement pieces, our selection features something for every occasion. Start exploring now and find your new favorite outfit!" })), user.is_admin && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-center flex-col justify-center py-1" }, { children: [(0, jsx_runtime_1.jsxs)("select", Object.assign({ className: "rounded-md mr-1 capitalize", onChange: handleSelect }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "delete" }, { children: "delete product" })), products.map((p) => ((0, jsx_runtime_1.jsx)("option", Object.assign({ value: p.id }, { children: p.title }), p.id)))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "p-2" }, { children: [(0, jsx_runtime_1.jsx)(AddProduct_1.default, { setSuccess: setSuccess, setSuccessTitle: setSuccessTitle, setSuccessMsg: setSuccessMsg }), (0, jsx_runtime_1.jsx)(Modal_1.default, Object.assign({ showModal: showModal, setShowModal: setShowModal, handleSubmit: handleDelete, modalTitle: "Delete product", modalTxt: "Delete product", submitBtnText: "Delete" }, { children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("h1", { children: "Are you sure you want to delete this product?" }) }) }))] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-red-400" }, { children: message }))] })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-center justify-center pt-9 " }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "relative mb-6 pointer-events-auto" }, { children: (0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "absolute text-slate-800 h-6 w-6 ml-[5px]", viewBox: "0 0 20 20", fill: "currentColor" }, { children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z", clipRule: "evenodd" }) })) })), (0, jsx_runtime_1.jsx)("input", { className: "w-full max-w-xs p-3 pl-8 border border-gray-800 rounded input input-bordered input-secondary", value: search, placeholder: "Search", onChange: (event) => {
                                                setSearch(event.target.value);
                                            } })] }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8" }, { children: loading ? ((0, jsx_runtime_1.jsx)(Loader_1.default, {})) : ((_a = filteredProducts
                                .slice(indexOfFirstProduct, indexOfLastProduct)) === null || _a === void 0 ? void 0 : _a.map((p) => {
                                var _a;
                                return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ to: `/products/${p.id}`, className: "relative block mb-2 overflow-hidden bg-gray-100 rounded-lg shadow-lg group h-96 lg:mb-3", onClick: () => idHandle(p.id) }, { children: [(0, jsx_runtime_1.jsx)("img", { src: p.front_url, loading: "lazy", alt: "", className: "object-cover object-center w-full h-full transition duration-200 group-hover:scale-110" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "absolute flex gap-2 left-2 bottom-2" }, { children: (_a = p.tags) === null || _a === void 0 ? void 0 : _a.map((t) => {
                                                        return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: "bg-white text-gray-800 text-sm font-bold tracking-wider uppercase rounded-lg px-3 py-1.5" }, { children: t.name }), t.id));
                                                    }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-start justify-between gap-2 px-2" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col" }, { children: [(0, jsx_runtime_1.jsx)("a", Object.assign({ href: "#", className: "text-lg font-bold text-gray-800 capitalize transition duration-100 hover:text-gray-500 lg:text-xl" }, { children: p.title })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-gray-500" }, { children: "by codeThreads" }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex flex-col items-end" }, { children: (0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "font-bold text-gray-600 lg:text-lg" }, { children: [" ", "$", p.price, " USD", " "] })) }))] }))] }, p.id));
                            })) })), totalProducts > 0 && ((0, jsx_runtime_1.jsxs)("nav", Object.assign({ className: "flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6", "aria-label": "Pagination" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "hidden sm:block" }, { children: (0, jsx_runtime_1.jsxs)("p", Object.assign({ className: "text-sm text-gray-700" }, { children: ["Showing", " ", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "font-medium" }, { children: indexOfFirstProduct + 1 })), " ", "to", " ", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "font-medium" }, { children: Math.min(indexOfLastProduct, totalProducts) })), " ", "of ", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "font-medium" }, { children: totalProducts })), " ", "products"] })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex justify-center flex-1 sm:justify-end" }, { children: (0, jsx_runtime_1.jsxs)("nav", Object.assign({ className: "flex gap-2", "aria-label": "Pagination" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => handlePageClick(currentPage - 1), className: `px-3 py-1 rounded-md transition duration-150 ease-in-out ${currentPage === 1
                                                    ? "text-gray-400"
                                                    : "text-gray-500 hover:bg-gray-200"}`, disabled: currentPage === 1 }, { children: "Previous" })), [...Array(totalPages)].map((_, i) => ((0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => handlePageClick(i + 1), className: `px-3 py-1 rounded-md transition duration-150 ease-in-out ${i + 1 === currentPage
                                                    ? "bg-blue-500 text-gray-50"
                                                    : "text-gray-500 hover:bg-gray-200"}` }, { children: i + 1 }), i))), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => handlePageClick(currentPage + 1), className: `px-3 py-1 rounded-md transition duration-150 ease-in-out ${currentPage === totalPages
                                                    ? "text-gray-400"
                                                    : "text-gray-500 hover:bg-gray-200"}`, disabled: currentPage === totalPages }, { children: "Next" }))] })) }))] })))] })) })), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
};
exports.default = Products;
