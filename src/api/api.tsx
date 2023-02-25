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
