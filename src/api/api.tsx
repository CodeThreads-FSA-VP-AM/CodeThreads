const APIURL = 'http://localhost:4000/api';

import { Product, ProductCreate, ProductEdit, SizeQTY } from '../components/Interfaces';

//POST register user
type Register = {
  username: string;
  password: string;
  email: string;
};
export const fetchRegister = async (data: Register): Promise<any> => {
  const { username, password, email } = data;
  const res = await fetch(`${APIURL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
      'Content-Type': 'application/json',
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
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: `${username}`,
      password: `${password}`,
    }),
  });
  const json = await res.json();

  return json;
};

// update user

// delete user

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
    const { title, description, price, front_url, back_url, tags, small, medium, large, xlarge } = data;
    const res = await fetch(`${APIURL}/products/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    const { productId, title, description, price, front_url, back_url, tags, small, medium, large, xlarge } = data;
    const res = await fetch(`${APIURL}/products/edit/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
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
  console.log('frontend api', productId);
  try {
    const res = await fetch(`${APIURL}/products/delete/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log({ res });
    const json = await res.json();
    console.log('json here', { json });
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
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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

export const createNewOrder = async (userId: number, token: string) => {
  const res = await fetch(`${APIURL}/orders/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId,
    }),
  });
  const json = await res.json();
  return json;
};

export const fetchOrder = async (userId: number) => {
  const res = await fetch(`${APIURL}/orders/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await res.json();
  console.log(json);
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
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
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
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
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
  console.log(data, 'in api.tsx');
  try {
    const res = await fetch(`${APIURL}/reviews/edit/${reviewId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
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
