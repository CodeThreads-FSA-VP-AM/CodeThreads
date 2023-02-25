const APIURL = "http://localhost:4000/api";

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

// Product fetch requests

// fetch all products
export const fetchProducts = async (): Promise<any> => {
  const res = await fetch(`${APIURL}/products/`);
  const json = await res.json();
  return json;
};

// interface for create and edit
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
};

// create product
export const fetchCreateProduct = async (data: Product): Promise<any> => {
  try {
    const { title, description, price } = data;
    const res = await fetch(`${APIURL}/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `${title}`,
        description: `${description}`,
        price: `${price}`,
      }),
    });

    const json = res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

// edit product
export const fetchEditProduct = async (data: Product): Promise<any> => {
  try {
    const { id: productId, title, description, price } = data;
    const res = await fetch(`${APIURL}/products/edit/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `${title}`,
        description: `${description}`,
        price: `${price}`,
      }),
    });

    const json = res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

// interface for getting product by id/name and delete product
type ProductId = {
  id: number;
};

// delete product
export const fetchDeleteProduct = async (data: Product): Promise<any> => {
  try {
    const { id: productId } = data;
    const res = await fetch(`${APIURL}/products/delete/${productId}`);

    const json = res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

// fetch product by Id
export const fetchProductById = async (data: ProductId): Promise<any> => {
  try {
    const { id: productId } = data;
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