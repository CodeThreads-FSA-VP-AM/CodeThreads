const APIURL = "http://localhost:4000/api";

import {
  CartItem,
  Product,
  ProductCreate,
  ProductEdit,
  SizeQTY,
} from "../components/Interfaces";

//Fetch all users

export const fetchAllUsers = async () => {
  try {
    const res = await fetch(`${APIURL}/users`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

//POST register user
type Register = {
  username: string;
  password: string;
  email: string;
};
export const fetchRegister = async (data: Register): Promise<any> => {
  const { username, password, email } = data;
  const res = await fetch(`${APIURL}/users/register`, {
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
  const json = await res.json();

  return json;
};

// GET users/me
type User = {
  token: string;
};

export const fetchUser = async (data: User) => {
  const { token } = data;
  const res = await fetch(`${APIURL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();
  return json;
};

//POST login
type Login = {
  username: string;
  password: string;
};
export const fetchLogin = async (data: Login): Promise<any> => {
  const { username, password } = data;
  const res = await fetch(`${APIURL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: `${username}`,
      password: `${password}`,
    }),
  });
  const json = await res.json();

  return json;
};
type UpdateUser = {
  username: string;
  password: string;
  email: string;
  token: string;
  avatar: string;
  userId: number;
};

// update user
export const updateProfile = async (data: UpdateUser) => {
  const { username, password, email, avatar, token, userId } = data;
  try {
    const res = await fetch(`${APIURL}/users/edit/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        avatar: avatar,
      }),
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
// delete user
type DeleteUser = {
  userId: any;
};
export const deleteUser = async (data: DeleteUser) => {
  const { userId } = data;
  try {
    const res = await fetch(`${APIURL}/users/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });
    console.log(userId);
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
// Product fetch requests

// fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${APIURL}/products/`);
  const json = await res.json();
  return json;
};

// create product
export const fetchCreateProduct = async (data: ProductCreate): Promise<any> => {
  try {
    const {
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
    } = data;
    const res = await fetch(`${APIURL}/products/add`, {
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
  } catch (error) {
    console.error(error);
  }
};

// edit product
export const fetchEditProduct = async (data: ProductEdit): Promise<any> => {
  try {
    const {
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
    } = data;
    const res = await fetch(`${APIURL}/products/edit/${productId}`, {
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
  } catch (error) {
    console.error(error);
  }
};

// edit size quanities
export const fetchUpdateSizeQty = async (data: SizeQTY) => {
  try {
    const { productId, small, medium, large, xlarge } = data;
    const res = await fetch(`${APIURL}/product/edit`);
  } catch (error) {
    console.error(error);
  }
};

// interface for getting product by id/name and delete product
// type ProductId = {
//   productId: number;
// };

// delete product
export const fetchDeleteProduct = async (productId: number): Promise<any> => {
  console.log("frontend api", productId);
  try {
    const res = await fetch(`${APIURL}/products/delete/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log({ res });
    const json = await res.json();
    console.log("json here", { json });
    return json;
  } catch (error) {
    console.error(error);
  }
};

// fetch product by Id
export const fetchProductById = async (productId: number): Promise<any> => {
  try {
    const res = await fetch(`${APIURL}/products/${productId}`);

    const json = res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

// fetch product by name
export const fetchProductByName = async (data: Product): Promise<any> => {
  const { title: name } = data;
  const res = await fetch(`${APIURL}/single/${name}`);

  const json = res.json();
  return json;
};

//Create order
type Order = {
  product_id?: number;
  quantity?: number;
  token: string;
};

export const createOrder = async (data: Order) => {
  const { product_id, quantity, token } = data;
  const res = await fetch(`${APIURL}/orders/add`, {
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
  const json = await res.json();
  return json;
};

export const checkoutOrder = async (
  userId: number,
  orderId: number,
  token: string
) => {
  console.log(userId, orderId);
  const res = await fetch(`${APIURL}/orders/checkout`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId,
      orderId,
      status: "processing",
      is_cart: false,
    }),
  });
  console.log("got here");
  const json = await res.json();
  console.log("after json");
  console.log(json);
  return json;
};

export const fetchOrder = async (userId: number) => {
  const res = await fetch(`${APIURL}/orders/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  console.log(json);
  return json;
};

export const fetchOrders = async () => {
  try {
    const res = await fetch(`${APIURL}/orders`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const fetchOrderHistory = async (userId: number) => {
  const res = await fetch(`${APIURL}/orders/history/${userId}`, {
    headers: {
      "Content-type": "application/json",
    },
  });
  const json = await res.json();
  return json;
};

//Delete a order

type Delete = {
  product_id: number;
  token: string;
};

export const deleteOrder = async (data: Delete) => {
  const { product_id, token } = data;
  const res = await fetch(`${APIURL}/orders/${product_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = res.json();
  return json;
};

type Reviews = {
  product_id: number;
  title: string;
  description: string;
  rating: number;
  token: string;
};

export const createReview = async (data: Reviews) => {
  const { product_id, title, description, rating, token } = data;
  const res = await fetch(`${APIURL}/reviews/add`, {
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
  const json = await res.json();

  return json;
};

type DeleteReview = {
  reviewId: number;
  token: string;
};

export const deleteReview = async (data: DeleteReview) => {
  const { reviewId, token } = data;
  const res = await fetch(`${APIURL}/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();
  return json;
};

//Fetch all reviews

export const getAllReviews = async () => {
  const res = await fetch(`${APIURL}/reviews/`);
  const json = await res.json();
  return json;
};
type EditReviews = {
  title: string;
  description: string;
  rating: number;
  token: string;
  reviewId: number;
};

export const editReview = async (data: EditReviews) => {
  const { title, description, rating, token, reviewId } = data;
  console.log(data, "in api.tsx");
  try {
    const res = await fetch(`${APIURL}/reviews/edit/${reviewId}`, {
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
  } catch (error) {
    console.error(error);
  }
};

export const mergeCarts = async (
  dbCart: any,
  storageCart: any,
  token: string
) => {
  const mergedCart = [...dbCart];
  for (const cartItem of storageCart) {
    const existingItemIndex = mergedCart.findIndex(
      (item) => item.product_id === cartItem.id
    );
    console.log(existingItemIndex);
    if (existingItemIndex === -1) {
      const addOrder = await createOrder({
        product_id: cartItem.id,
        quantity: cartItem.quantity,
        token: token,
      });
      mergedCart.push(addOrder);
      console.log(mergedCart, "mergedCart1");
    } else {
      mergedCart[existingItemIndex].quantity += cartItem.quantity;
      console.log(mergedCart, "mergedCart2");
    }
  }
  return mergedCart;
};

export const updateCart = async (userId: number, token: string) => {
  const cartFromStorage = JSON.parse(sessionStorage.getItem("cart") || "[]");
  console.log(cartFromStorage, "fromstorage");
  if (cartFromStorage.length === 0) {
    return;
  }

  try {
    const res = await fetchOrder(userId);
    const cartFromDb = res;
    const updatedCart = await mergeCarts(cartFromDb, cartFromStorage, token);
    console.log(cartFromDb, "fromdb");
    console.log(userId, updatedCart, token);
    sessionStorage.removeItem("cart");
    return updateCart;
  } catch (error) {
    console.error(error);
  }
};

type Wishlist = {
  product_id?: number;
  quantity?: number;
  token: string;
};

export const createWishlist = async (data: Wishlist) => {
  const { product_id, quantity, token } = data;
  const res = await fetch(`${APIURL}/wishlist/add`, {
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
  const json = await res.json();
  return json;
};

export const fetchWishlistByUser = async (userId: number) => {
  const res = await fetch(`${APIURL}/wishlist/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  console.log(json);
  return json;
};

export const deleteWishlist = async (data: Delete) => {
  const { product_id, token } = data;
  const res = await fetch(`${APIURL}/wishlist/${product_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = res.json();
  return json;
};
