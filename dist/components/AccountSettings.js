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
const api_1 = require("../api/api");
const AccountSettings = (props) => {
    console.log(props.token, props.user.id, "props from accountsettings");
    const [username, setUsername] = (0, react_1.useState)(props.user.username);
    const [password, setPassword] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)(props.user.email);
    const [avatar, setAvatar] = (0, react_1.useState)(props.user.avatar_url);
    const [errorMsg, setErrorMsg] = (0, react_1.useState)("");
    const [userId, setUserId] = (0, react_1.useState)(props.user.id);
    console.log(username, email, avatar, userId);
    const handleEditProfile = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            const data = yield (0, api_1.updateProfile)({
                username,
                password,
                email,
                avatar,
                userId,
                token: props.token,
            });
            if (data.error) {
                setErrorMsg(data.error);
                console.log(data, "error editing profile");
            }
            else {
                props.setUser(data.userUpdate);
                console.log(data, "success editing profile");
            }
        }
        catch (error) {
            console.error(error);
        }
    });
    (0, react_1.useEffect)(() => { }, [props.user, props.token]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "hidden sm:block", "aria-hidden": "true" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "py-5" }, { children: (0, jsx_runtime_1.jsx)("div", { className: "border-t border-gray-200" }) })) })), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "m-5 md:col-span-2 md:mt-0" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "md:grid md:grid-cols-3 md:gap-6" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "md:col-span-1" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "px-4 sm:px-0" }, { children: [(0, jsx_runtime_1.jsx)("h3", Object.assign({ className: "text-base font-semibold leading-6 text-gray-900" }, { children: "Profile" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "mt-1 text-sm text-gray-600" }, { children: "Welcome to your profile settings" }))] })) })), (0, jsx_runtime_1.jsx)("form", Object.assign({ onSubmit: handleEditProfile }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "shadow sm:overflow-hidden sm:rounded-md" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "px-4 py-5 space-y-6 bg-white sm:p-6" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "col-span-6 sm:col-span-3" }, { children: [(0, jsx_runtime_1.jsxs)("label", Object.assign({ htmlFor: "first-name", className: "block text-sm font-medium leading-6 text-gray-900" }, { children: ["New username", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-[#F70000]" }, { children: "*" }))] })), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "first-name", id: "first-name", autoComplete: "given-name", required: true, value: username, onChange: (e) => setUsername(e.target.value), className: "mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "col-span-6 sm:col-span-3" }, { children: [(0, jsx_runtime_1.jsxs)("label", Object.assign({ htmlFor: "last-name", className: "block text-sm font-medium leading-6 text-gray-900" }, { children: ["New password", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-[#F70000]" }, { children: "*" }))] })), (0, jsx_runtime_1.jsx)("input", { type: "password", name: "last-name", id: "last-name", autoComplete: "given-name", required: true, minLength: 8, value: password, onChange: (e) => setPassword(e.target.value), className: "mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "col-span-6 sm:col-span-4" }, { children: [(0, jsx_runtime_1.jsxs)("label", Object.assign({ htmlFor: "email-address", className: "block text-sm font-medium leading-6 text-gray-900" }, { children: ["New email address", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-[#F70000]" }, { children: "*" }))] })), (0, jsx_runtime_1.jsx)("input", { type: "email", name: "email-address", id: "email-address", autoComplete: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" })] })), (0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block text-sm font-medium leading-6 text-gray-900" }, { children: "Photo" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex items-center mt-2" }, { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full" }, { children: (0, jsx_runtime_1.jsx)("img", { className: "object-cover w-12 h-12 rounded-full", src: props.user.avatar_url, alt: "default" }) })) }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block text-sm font-medium leading-6 text-gray-900" }, { children: "Change your profile picture" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex justify-center px-6 pt-5 pb-6 mt-2 border-2 border-gray-300 border-dashed rounded-md" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "space-y-1 text-center" }, { children: [(0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "w-12 h-12 mx-auto text-gray-400", stroke: "currentColor", fill: "none", viewBox: "0 0 48 48", "aria-hidden": "true" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex text-sm text-gray-600" }, { children: (0, jsx_runtime_1.jsxs)("label", Object.assign({ htmlFor: "file-upload", className: "relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500" }, { children: [(0, jsx_runtime_1.jsx)("span", { children: "Paste a URL link" }), (0, jsx_runtime_1.jsx)("input", { id: "url-input", name: "url-input", type: "text", className: "border-gray-300 rounded-md", value: avatar, onChange: (e) => setAvatar(e.target.value) })] })) }))] })) }))] })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "px-4 py-3 text-right bg-gray-50 sm:px-6" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", className: "inline-flex justify-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" }, { children: "Change" })) }))] })) }))] })) })) }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "hidden sm:block", "aria-hidden": "true" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "py-5" }, { children: (0, jsx_runtime_1.jsx)("div", { className: "border-t border-gray-200" }) })) }))] }));
};
exports.default = AccountSettings;
