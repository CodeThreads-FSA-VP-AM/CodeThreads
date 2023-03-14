import React, { useState, useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51MjulLCrdvy0lSlL6cOtaubo6pIIeBbbaaWDilYHCXY4U9kirgxRUQqgWb6Uh2p50TRCnwnzxCIkwWLQUvZrlrlR00uysRVa4o"
);
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
import Featured from "./Featured";
import Home from "./Home";
import { fetchProductById, fetchUser, fetchOrders } from "../api/api";
import EditReviews from "./EditReviews";
import { User } from "./Interfaces";
import NotFound from "./NotFound";
import AdminNav from "./AdminNav";
import CheckoutForm from "./CheckoutForm";
import StripeContainer from "./StripeContainer";
import Completion from "./Completion";
import TestStripe from "./TestStripe";
import OrderHistroy from "./OrderHistroy";
import UserProfile from "./UserProfile";
import AccountSettings from "./AccountSettings";
import SuccessNotification from "./SuccessNotification";

const App: React.FC = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [productId, setProductId] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState();
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [price, setPrice] = useState(0);
  const [success, setSuccess] = useState(false);
  const [successTitle, setSuccessTitle] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [allOrders, setAllOrders] = useState([]);
  const options = {
    // passing the client secret obtained from the server
    clientSecret:
      "{{sk_test_51MjulLCrdvy0lSlLe1XvAr0xF9ZFyr8OpWitXvDBlrwsmBMa1HlmSDcpO0JmDj4mEjWuVGXojR8Yqb55clcLPwvK00U6GZFdtz}}",
  };

  const getProduct = async () => {
    const product = await fetchProductById(productId);
    console.log(product);
    setProduct(product);
  };
  console.log(allOrders);

  useEffect(() => {
    const getAllOrders = async () => {
      const orders = await fetchOrders();
      setAllOrders(orders);
    };
    getAllOrders();
  }, []);
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

  useEffect(() => {
    getProduct();
  }, [productId]);

  useEffect(() => {}, [successMsg, successTitle]);
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
        <Navbar user={user} token={token} setToken={setToken} />
        {success && (
          <SuccessNotification
            success={success}
            setSuccess={setSuccess}
            successTitle={successTitle}
            successMsg={successMsg}
          />
        )}
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={
                <Login
                  setToken={setToken}
                  success={success}
                  setSuccess={setSuccess}
                  setSuccessTitle={setSuccessTitle}
                  setSuccessMsg={setSuccessMsg}
                />
              }
            />
            <Route
              path="/products"
              element={<Products setProductId={setProductId} user={user} />}
            />
            <Route
              path="/products/:id"
              element={
                <SingleView
                  quantity={quantity}
                  user={user}
                  setSuccess={setSuccess}
                  setSuccessTitle={setSuccessTitle}
                  setSuccessMsg={setSuccessMsg}
                />
              }
            />
            <Route path="/orders" element={<Orders />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route
              path="/edit/:id"
              element={
                <EditProduct
                  product={product}
                  productId={productId}
                  setProductId={setProductId}
                />
              }
            />
            <Route path="/featured" element={<Featured />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/editReview" element={<EditReviews />} /> */}
            <Route
              path="/admin"
              element={<AdminNav setProductId={setProductId} user={user} />}
            />
            <Route path="/checkout" element={<StripeContainer />} />
            <Route path="/success" element={<Completion />} />
            <Route path="/test" element={<TestStripe />} />
            <Route path="/orderhistory" element={<OrderHistroy />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route
              path="/accountsettings"
              element={
                <AccountSettings user={user} token={token} setUser={setUser} />
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
