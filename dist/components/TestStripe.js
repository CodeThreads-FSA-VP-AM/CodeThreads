"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const StripeContainer_1 = __importDefault(require("./StripeContainer"));
// const ProductDisplay = () => (
//   <section>
//     <div className="product">
//       <img src="https://i.imgur.com/EHyR2nP.png" alt="The cover of Stubborn Attachments" />
//       <div className="description">
//         <h3>Stubborn Attachments</h3>
//         <h5>$20.00</h5>
//       </div>
//     </div>
//     <form action="/payment" method="POST">
//       <button type="submit">Checkout</button>
//     </form>
//   </section>
// );
// const Message = ({ message }: { message: any }) => (
//   <section>
//     <p>{message}</p>
//   </section>
// );
// export default function TestStripe() {
//   const [message, setMessage] = useState("");
//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);
//     if (query.get("success")) {
//       setMessage("Order placed! You will receive an email confirmation.");
//     }
//     if (query.get("canceled")) {
//       setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
//     }
//   }, []);
//   return message ? <Message message={message} /> : <ProductDisplay />;
// }
const ProductDisplay = () => {
    const [showForm, setShowForm] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsx)("div", { children: showForm ? ((0, jsx_runtime_1.jsx)(StripeContainer_1.default, {})) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "$100.00" }), " ", (0, jsx_runtime_1.jsx)("img", { src: "", alt: "" }), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => setShowForm(true) }, { children: "BUY" }))] })) }));
};
exports.default = ProductDisplay;
