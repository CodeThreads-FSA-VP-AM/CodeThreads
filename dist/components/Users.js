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
const Users = () => {
    const [users, setUsers] = (0, react_1.useState)([]);
    const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield (0, api_1.fetchAllUsers)();
            console.log(res);
            setUsers(res);
            return res;
        }
        catch (error) {
            console.error(error);
        }
    });
    const handleDeleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(userId, "formusers");
        try {
            const res = yield (0, api_1.deleteUser)({ userId });
            console.log(res);
            setUsers(users.filter((user) => user.id !== userId));
            return res;
        }
        catch (error) {
            console.error(error);
        }
    });
    (0, react_1.useEffect)(() => {
        getAllUsers();
    }, []);
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "px-4 py-8 bg-gray-50" }, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "pb-2 text-xl text-gray-900" }, { children: "Users:" })) }), (0, jsx_runtime_1.jsxs)("table", Object.assign({ className: "w-full bg-white rounded shadow table-auto" }, { children: [(0, jsx_runtime_1.jsx)("thead", Object.assign({ className: "border-b border-gray-100" }, { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", Object.assign({ className: "py-6 pl-6" }, { children: (0, jsx_runtime_1.jsx)("a", Object.assign({ className: "flex items-center text-xs text-gray-500", href: "#" }, { children: (0, jsx_runtime_1.jsx)("p", { children: "ID" }) })) })), (0, jsx_runtime_1.jsx)("th", { children: (0, jsx_runtime_1.jsx)("a", Object.assign({ className: "flex items-center text-xs text-gray-500", href: "#" }, { children: (0, jsx_runtime_1.jsx)("p", { children: "Username" }) })) }), (0, jsx_runtime_1.jsx)("th", { children: (0, jsx_runtime_1.jsx)("a", Object.assign({ className: "flex items-center text-xs text-gray-500", href: "#" }, { children: (0, jsx_runtime_1.jsx)("p", { children: "Email" }) })) }), (0, jsx_runtime_1.jsx)("th", { children: (0, jsx_runtime_1.jsx)("a", Object.assign({ className: "flex items-center text-xs text-gray-500", href: "#" }, { children: (0, jsx_runtime_1.jsx)("p", { children: "Users since" }) })) })] }) })), (0, jsx_runtime_1.jsx)("tbody", { children: users.map((user) => {
                            return ((0, jsx_runtime_1.jsxs)("tr", Object.assign({ className: "text-xs border-b border-gray-100 odd:bg-blue-50 even:bg-blue-300" }, { children: [(0, jsx_runtime_1.jsx)("td", Object.assign({ className: "py-6 pl-6 bg-indigo-300" }, { children: user.id })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "pl-6 capitalize" }, { children: user.username })), (0, jsx_runtime_1.jsx)("td", { children: user.email }), (0, jsx_runtime_1.jsx)("td", { children: user.created_at }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "p-1 text-white bg-red-400 border border-red-600 rounded-md", onClick: () => handleDeleteUser(user.id) }, { children: "Delete user" })) })] }), user.id));
                        }) })] }))] })));
};
exports.default = Users;
