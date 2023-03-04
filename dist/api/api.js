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
exports.editReview = exports.getAllReviews = exports.deleteReview = exports.createReview = exports.deleteOrder = exports.fetchOrder = exports.createOrder = exports.fetchProductByName = exports.fetchProductById = exports.fetchDeleteProduct = exports.fetchUpdateSizeQty = exports.fetchEditProduct = exports.fetchCreateProduct = exports.fetchProducts = exports.fetchLogin = exports.fetchUser = exports.fetchRegister = void 0;
const APIURL = "http://localhost:4000/api";
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
const fetchUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = data;
    const res = yield fetch(`${APIURL}/users/me`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const json = yield res.json();
    return json;
});
exports.fetchUser = fetchUser;
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
// create product
const fetchCreateProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, price, front_url, back_url, tags, small, medium, large, xlarge } = data;
        const res = yield fetch(`${APIURL}/products/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: `${title}`,
                description: `${description}`,
                price: `${price}`,
                front_url: `${front_url}`,
                back_url: `${back_url}`,
                tags: `${tags}`,
                small: `${small}`,
                medium: `${medium}`,
                large: `${large}`,
                xlarge: `${xlarge}`,
            }),
        });
        const json = res.json();
        return json;
    }
    catch (error) {
        console.error(error);
    }
});
exports.fetchCreateProduct = fetchCreateProduct;
// edit product
const fetchEditProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, title, description, price, front_url, back_url, tags, small, medium, large, xlarge } = data;
        const res = yield fetch(`${APIURL}/products/edit/${productId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: `${title}`,
                description: `${description}`,
                price: `${price}`,
                front_url: `${front_url}`,
                back_url: `${back_url}`,
                tags: `${tags}`,
                small: `${small}`,
                medium: `${medium}`,
                large: `${large}`,
                xlarge: `${xlarge}`,
            }),
        });
        const json = res.json();
        return json;
    }
    catch (error) {
        console.error(error);
    }
});
exports.fetchEditProduct = fetchEditProduct;
// edit size quanities
const fetchUpdateSizeQty = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, small, medium, large, xlarge } = data;
        const res = yield fetch(`${APIURL}/product/edit`);
    }
    catch (error) {
        console.error(error);
    }
});
exports.fetchUpdateSizeQty = fetchUpdateSizeQty;
// interface for getting product by id/name and delete product
// type ProductId = {
//   productId: number;
// };
// delete product
const fetchDeleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("frontend api", productId);
    try {
        const res = yield fetch(`${APIURL}/products/delete/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log({ res });
        const json = yield res.json();
        console.log("json here", { json });
        return json;
    }
    catch (error) {
        console.error(error);
    }
});
exports.fetchDeleteProduct = fetchDeleteProduct;
// fetch product by Id
const fetchProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`${APIURL}/products/${productId}`);
        const json = res.json();
        return json;
    }
    catch (error) {
        console.error(error);
    }
});
exports.fetchProductById = fetchProductById;
// fetch product by name
const fetchProductByName = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { title: name } = data;
    const res = yield fetch(`${APIURL}/single/${name}`);
    const json = res.json();
    return json;
});
exports.fetchProductByName = fetchProductByName;
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, quantity, token } = data;
    const res = yield fetch(`${APIURL}/orders/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            product_id: `${product_id}`,
            quantity: `${quantity}`,
        }),
    });
    const json = yield res.json();
    return json;
});
exports.createOrder = createOrder;
const fetchOrder = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${APIURL}/orders/${userId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const json = yield res.json();
    console.log(json);
    return json;
});
exports.fetchOrder = fetchOrder;
const deleteOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, token } = data;
    const res = yield fetch(`${APIURL}/orders/${product_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const json = res.json();
    return json;
});
exports.deleteOrder = deleteOrder;
const createReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, title, description, rating, token } = data;
    const res = yield fetch(`${APIURL}/reviews/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            product_id: product_id,
            title: title,
            description: description,
            rating: rating,
        }),
    });
    console.log(data);
    const json = yield res.json();
    return json;
});
exports.createReview = createReview;
const deleteReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId, token } = data;
    const res = yield fetch(`${APIURL}/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const json = yield res.json();
    return json;
});
exports.deleteReview = deleteReview;
//Fetch all reviews
const getAllReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${APIURL}/reviews/`);
    const json = yield res.json();
    return json;
});
exports.getAllReviews = getAllReviews;
const editReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, rating, token, reviewId } = data;
    console.log(data, "in api.tsx");
    try {
        const res = yield fetch(`${APIURL}/reviews/edit/${reviewId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: title,
                description: description,
                rating: rating,
                token: token,
            }),
        });
        const json = res.json();
        return json;
    }
    catch (error) {
        console.error(error);
    }
});
exports.editReview = editReview;
