import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
// import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import Login from "./Login";
import Navbar from "./Navbar";
import Register from "./Register";
import Products from "./Products";
import SingleView from "./SingleView";
import Orders from "./Orders";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import { fetchProductById, fetchUser } from "../api/api";
import EditReviews from "./EditReviews";
import { User } from "./Interfaces";

const App: React.FC = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [productId, setProductId] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState();
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const getProduct = async () => {
    const product = await fetchProductById(productId);
    console.log(product);
    setProduct(product);
  };

  useEffect(() => {
    const getUser = async (data: User) => {
      const { token } = data;
      try {
        const user = await fetchUser({ token });
        console.log({ user });
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    };
    const token = localStorage.getItem("token") ?? "";
    setToken(token);
    getUser({ token });
  }, [token]);

  console.log({ user });

  useEffect(() => {
    getProduct();
  }, [productId]);

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
  {
    /* <p>API Status: {APIHealth}</p> */
  }

  return (
    <>
      <Router>
        <Navbar user={user} />
        <div>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products setProductId={setProductId} user={user} />} />
            <Route path="/products/:id" element={<SingleView quantity={quantity} user={user} />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct product={product} productId={productId} setProductId={setProductId} />} />
            {/* <Route path="/editReview" element={<EditReviews />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
