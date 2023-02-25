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
exports.fetchProducts = exports.fetchLogin = exports.fetchRegister = void 0;
const APIURL = "http://localhost:5432/api";
const fetchRegister = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = data;
    const res = yield fetch(`${APIURL}/users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: `${username}`,
            password: `${password}`,
            email: `${email}`,
        }),
    });
    const json = yield res.json();
    return json;
});
exports.fetchRegister = fetchRegister;
const fetchLogin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = data;
    const res = yield fetch(`${APIURL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: `${username}`,
            password: `${password}`,
        }),
    });
    const json = yield res.json();
    return json;
});
exports.fetchLogin = fetchLogin;
// Product fetch requests
// fetch all products
const fetchProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${APIURL}/products/`);
    const json = yield res.json();
    return json;
});
exports.fetchProducts = fetchProducts;
