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
const Loader_1 = __importDefault(require("./Loader"));
const Products = ({ setProductId, user }) => {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [selectedId, setSelectedId] = (0, react_1.useState)(0);
    const [message, setMessage] = (0, react_1.useState)("");
    console.log(user.is_admin);
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
        setTimeout(() => {
            setMessage("");
        }, 3000);
        console.log("product removed", deletedProduct);
    });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("section", Object.assign({ className: "py-6 bg-white sm:py-8 lg:py-12" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "px-4 mx-auto max-w-screen-2xl md:px-8" }, { children: [(0, jsx_runtime_1.jsxs)("header", Object.assign({ className: "mb-10 md:mb-16" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ className: "mb-4 text-2xl font-bold text-center text-gray-800 lg:text-3xl md:mb-6" }, { children: "Product Collection" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "max-w-screen-md mx-auto text-center text-gray-500 md:text-lg" }, { children: "From everyday essentials to statement pieces, our selection features something for every occasion. Start exploring now and find your new favorite outfit!" })), user.is_admin && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-center justify-center py-1" }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/addproduct", className: "pr-52" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "inline-flex items-center px-5 py-2.5 m-4 sm:mt-6 text-sm font-medium text-center bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 focus:ring-primary-900 hover:bg-blue-800 text-gray-50" }, { children: "add" })) })), (0, jsx_runtime_1.jsxs)("select", Object.assign({ className: "rounded", onChange: handleSelect }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "delete" }, { children: "delete product" })), products.map((p) => ((0, jsx_runtime_1.jsx)("option", Object.assign({ value: p.id }, { children: p.title }), p.id)))] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "inline-flex items-center px-5 py-2.5 m-4 sm:mt-6 text-sm font-medium text-center bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 focus:ring-primary-900 hover:bg-blue-800 text-gray-50", onClick: handleDelete }, { children: "delete" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-red-400" }, { children: message }))] })) }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8" }, { children: loading ? (
                        // <div className="flex">
                        //   <div className="flex items-center justify-center w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-blue-400"></div>
                        // </div>
                        (0, jsx_runtime_1.jsx)(Loader_1.default, {})) : (products === null || products === void 0 ? void 0 : products.map((p) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ to: `/products/${p.id}`, className: "relative block mb-2 overflow-hidden bg-gray-100 rounded-lg shadow-lg group h-96 lg:mb-3", onClick: () => idHandle(p.id) }, { children: [(0, jsx_runtime_1.jsx)("img", { src: p.front_url, loading: "lazy", alt: "", className: "object-cover object-center w-full h-full transition duration-200 group-hover:scale-110" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "absolute flex gap-2 left-2 bottom-2" }, { children: p.tags.map((t) => {
                                                return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: "bg-white text-gray-800 text-sm font-bold tracking-wider uppercase rounded-lg px-3 py-1.5" }, { children: t.name }), t.id));
                                            }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-start justify-between gap-2 px-2" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col" }, { children: [(0, jsx_runtime_1.jsx)("a", Object.assign({ href: "#", className: "text-lg font-bold text-gray-800 capitalize transition duration-100 hover:text-gray-500 lg:text-xl" }, { children: p.title })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-gray-500" }, { children: "by codeThreads" }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex flex-col items-end" }, { children: (0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "font-bold text-gray-600 lg:text-lg" }, { children: [" \u00A3", p.price, " GBP "] })) }))] }))] }, p.id)))) }))] })) })) })
    // <>
    //   <section>
    //     <div classNameName="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
    //       <header>
    //         <h2 classNameName="text-xl font-bold text-gray-900 sm:text-3xl">Product Collection</h2>
    //         <p classNameName="max-w-md mt-4 text-gray-500">
    //           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit
    //           natus?
    //         </p>
    //         {user.is_admin && (
    //           <>
    //             <Link to="/addproduct" classNameName="flex justify-center">
    //               <button>add</button>
    //             </Link>
    //             <div>
    //               <select onChange={handleSelect}>
    //                 <option value="delete">delete product</option>
    //                 {products.map((p) => (
    //                   <option value={p.id} key={p.id}>
    //                     {p.title}
    //                   </option>
    //                 ))}
    //               </select>
    //               <button classNameName="px-1" onClick={handleDelete}>
    //                 delete
    //               </button>
    //               <span classNameName="text-red-400">{message}</span>
    //             </div>
    //           </>
    //         )}
    //       </header>
    //       <ul classNameName="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
    //         {/* map over this code */}
    //         {loading ? (
    //           // <div>Loading...</div>
    //           <div classNameName="flex">
    //             <div classNameName="flex items-center justify-center w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-blue-400"></div>
    //           </div>
    //         ) : (
    //           products?.map((p: Product) => (
    //             <li key={p.id}>
    //               <Link to={`/products/${p.id}`} classNameName="block overflow-hidden group" onClick={() => idHandle(p.id)}>
    //                 <img
    //                   src={p.front_url}
    //                   alt=""
    //                   classNameName="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
    //                 />
    //                 <div classNameName="relative pt-3 bg-white">
    //                   <h3 classNameName="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">{p.title}</h3>
    //                   <p classNameName="mt-2">
    //                     <span classNameName="sr-only"> Regular Price </span>
    //                     <span classNameName="tracking-wider text-gray-900"> £{p.price} GBP </span>
    //                   </p>
    //                 </div>
    //               </Link>
    //             </li>
    //           ))
    //         )}
    //       </ul>
    //     </div>
    //   </section>
    // </>
    );
};
exports.default = Products;
