"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
// import { getAPIHealth } from "../axios-services";
require("../style/App.css");
const App = () => {
    const [APIHealth, setAPIHealth] = (0, react_1.useState)("");
    // useEffect(() => {
    //   // follow this pattern inside your useEffect calls:
    //   // first, create an async function that will wrap your axios service adapter
    //   // invoke the adapter, await the response, and set the data
    //   const getAPIStatus = async () => {
    //     const { healthy } = await getAPIHealth();
    //     setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    //   };
    //   // second, after you've defined your getter above
    //   // invoke it immediately after its declaration, inside the useEffect callback
    //   getAPIStatus();
    // }, []);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "app-container" }, { children: (0, jsx_runtime_1.jsx)("h1", { children: "Hello, World!" }) })));
};
exports.default = App;
