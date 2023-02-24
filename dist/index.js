"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_dom_1 = __importDefault(require("react-dom"));
const App_1 = __importDefault(require("./components/App"));
// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
require("./style/index.css");
react_dom_1.default.render((0, jsx_runtime_1.jsx)(App_1.default, {}), document.getElementById("root"));
