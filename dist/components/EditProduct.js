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
const EditProduct = ({ product, productId, setProductId }) => {
    const [title, setTitle] = (0, react_1.useState)(product.title);
    const [description, setDescription] = (0, react_1.useState)(product.description);
    const [price, setPrice] = (0, react_1.useState)(product.price);
    const [front_url, setFront_url] = (0, react_1.useState)(product.front_url);
    const [back_url, setBack_url] = (0, react_1.useState)(product.back_url);
    const [tags, setTags] = (0, react_1.useState)("");
    const [small, setSmall] = (0, react_1.useState)(product.sizes[0].small);
    const [medium, setMedium] = (0, react_1.useState)(product.sizes[0].medium);
    const [large, setLarge] = (0, react_1.useState)(product.sizes[0].large);
    const [xlarge, setXlarge] = (0, react_1.useState)(product.sizes[0].xlarge);
    const [loading, setLoading] = (0, react_1.useState)(true);
    // const [productId, setProductId] = useState(0);
    // const productId = product.id;
    // get all products
    // be able to select a product and get the id
    // send the data to fetchEditProduct
    const history = (0, react_router_dom_1.useNavigate)();
    const { id } = (0, react_router_dom_1.useParams)();
    console.log({ id });
    console.log({ productId });
    console.log({ product });
    const handleEdit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("triggered");
        e.preventDefault();
        const data = {
            productId,
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
        console.log(data);
        const edit = yield (0, api_1.fetchEditProduct)(data);
        console.log({ edit });
        setLoading(false);
        history(-1);
    });
    (0, react_1.useEffect)(() => {
        const getID = parseInt(id);
        setProductId(getID);
    }, [productId]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: loading ? ((0, jsx_runtime_1.jsx)(Loader_1.default, {})) : ((0, jsx_runtime_1.jsx)("section", Object.assign({ className: "bg-white " }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "max-w-2xl px-4 py-8 mx-auto lg:py-16" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ className: "mb-4 text-xl font-bold" }, { children: "Edit product" })), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: handleEdit }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "grid gap-4 sm:grid-cols-2 sm:gap-6" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "sm:col-span-2" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block mb-2 text-sm font-medium" }, { children: "Product Name" })), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "name", value: title, id: "name", className: "text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500", placeholder: "Type product name", onChange: (e) => setTitle(e.target.value) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-full" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block mb-2 text-sm font-medium" }, { children: "Tags" })), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "tags", value: tags, id: "tags", className: "text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500", placeholder: "Tags", onChange: (e) => setTags(e.target.value) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-full" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block mb-2 text-sm font-medium" }, { children: "Price" })), (0, jsx_runtime_1.jsx)("input", { type: "number", name: "price", value: price, id: "price", className: "text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500", placeholder: "$2999", onChange: (e) => setPrice(e.target.valueAsNumber) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-full" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block mb-2 text-sm font-medium" }, { children: "Front Image URL" })), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "front_url", value: front_url, id: "front_url", className: " text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500", placeholder: "front_url", onChange: (e) => setFront_url(e.target.value) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-full" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block mb-2 text-sm font-medium" }, { children: "Back Image URL" })), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "back_url", value: back_url, id: "back_url", className: "border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500", placeholder: "back_url", onChange: (e) => setBack_url(e.target.value) })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "sm:col-span-2" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex justify-between space-x-4" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-40" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block mb-2 text-sm font-medium" }, { children: "Small" })), (0, jsx_runtime_1.jsx)("input", { type: "number", name: "small", value: small, id: "small", className: " text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500", onChange: (e) => setSmall(e.target.valueAsNumber) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-40" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block mb-2 text-sm font-medium" }, { children: "Medium" })), (0, jsx_runtime_1.jsx)("input", { type: "number", name: "medium", value: medium, id: "medium", className: " text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500", onChange: (e) => setMedium(e.target.valueAsNumber) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-40" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block mb-2 text-sm font-medium" }, { children: "Large" })), (0, jsx_runtime_1.jsx)("input", { type: "number", name: "large", value: large, id: "large", className: " text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500", onChange: (e) => setLarge(e.target.valueAsNumber) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-40" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block mb-2 text-sm font-medium" }, { children: "X-Large" })), (0, jsx_runtime_1.jsx)("input", { type: "number", name: "xlarge", value: xlarge, id: "xlarge", className: " text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500", onChange: (e) => setXlarge(e.target.valueAsNumber) })] }))] })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "sm:col-span-2" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block mb-2 text-sm font-medium" }, { children: "Description" })), (0, jsx_runtime_1.jsx)("textarea", { id: "description", rows: 8, value: description, className: "block p-2.5 w-full text-sm   rounded-lg border focus:ring-primary-500 focus:border-primary-500 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500", placeholder: "Your description here", onChange: (e) => setDescription(e.target.value) })] }))] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", className: "inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 focus:ring-primary-900 hover:bg-blue-800 text-gray-50" }, { children: "Edit product" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "inline-flex items-center px-5 py-2.5 m-4 sm:mt-6 text-sm font-medium text-center bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 focus:ring-primary-900 hover:bg-blue-800 text-gray-50", onClick: () => history(-1) }, { children: "go back" }))] }))] })) }))) })
    // <div>
    //   <h1>Edit Product</h1>
    //   <form onSubmit={handleCreate}>
    //     <label>title</label>
    //     <input className="mx-1 bg-gray-200 border" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
    //     <label>description</label>
    //     <input className="mx-1 bg-gray-200 border" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
    //     <label>price</label>
    //     <input className="mx-1 bg-gray-200 border" type="number" value={price} onChange={(e) => setPrice(e.target.valueAsNumber)} />
    //     <label>front_url</label>
    //     <input className="mx-1 bg-gray-200 border" type="text" value={front_url} onChange={(e) => setFront_url(e.target.value)} />
    //     <label>back_url</label>
    //     <input className="mx-1 bg-gray-200 border" type="text" value={back_url} onChange={(e) => setBack_url(e.target.value)} />
    //     <label>tags</label>
    //     <input className="mx-1 bg-gray-200 border" type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
    //     {/* size quanities */}
    //     <label>small</label>
    //     <input className="mx-1 bg-gray-200 border" type="number" value={small} onChange={(e) => setSmall(e.target.valueAsNumber)} />
    //     <label>medium</label>
    //     <input className="mx-1 bg-gray-200 border" type="number" value={medium} onChange={(e) => setMedium(e.target.valueAsNumber)} />
    //     <label>large</label>
    //     <input className="mx-1 bg-gray-200 border" type="number" value={large} onChange={(e) => setLarge(e.target.valueAsNumber)} />
    //     <label>xlarge</label>
    //     <input className="mx-1 bg-gray-200 border" type="number" value={xlarge} onChange={(e) => setXlarge(e.target.valueAsNumber)} />
    //     <button className="bg-slate-500" type="submit">
    //       edit
    //     </button>
    //   </form>
    //   <div className="flex">
    //     <button className="flex justify-center" onClick={() => history(-1)}>
    //       go back
    //     </button>
    //   </div>
    // </div>
    );
};
exports.default = EditProduct;
