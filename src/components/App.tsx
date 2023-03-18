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
import { fetchProductById, fetchUser } from "../api/api";
import EditReviews from "./EditReviews";
import { User, WishlistData } from "./Interfaces";
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
import MaleProducts from "./MaleProducts";
import FemaleProducts from "./FemaleProducts";
import AllOrders from "./AllOrders";
import WishList from "./WishList";
import ErrorNotification from "./ErrorNotification";
import Footer from "./Footer";

const App: React.FC = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [productId, setProductId] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState();
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [price, setPrice] = useState(0);
  const [error, setError] = useState(false);
  const [errorNoti, setErrorNoti] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [successTitle, setSuccessTitle] = useState("");
  const [productsLength, setProductsLength] = useState(0);
  const [wishlist, setWishlist] = useState<WishlistData[]>([]);

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

  useEffect(() => {}, [successMsg, successTitle, productsLength, wishlist]);
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
        <Navbar
          user={user}
          token={token}
          setToken={setToken}
          productsLength={productsLength}
        />
        {success && (
          <SuccessNotification
            success={success}
            setSuccess={setSuccess}
            successTitle={successTitle}
            successMsg={successMsg}
          />
        )}
        {error && (
          <ErrorNotification
            error={error}
            setError={setError}
            errorNoti={errorNoti}
          />
        )}
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/register"
              element={
                <Register
                  setToken={setToken}
                  success={success}
                  setSuccess={setSuccess}
                  setSuccessTitle={setSuccessTitle}
                  setSuccessMsg={setSuccessMsg}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  setToken={setToken}
                  success={success}
                  setSuccess={setSuccess}
                  setSuccessTitle={setSuccessTitle}
                  setSuccessMsg={setSuccessMsg}
                  setError={setError}
                  setErrorNoti={setErrorNoti}
                />
              }
            />
            <Route
              path="/products"
              element={
                <Products
                  setProductId={setProductId}
                  user={user}
                  setSuccess={setSuccess}
                  setSuccessTitle={setSuccessTitle}
                  setSuccessMsg={setSuccessMsg}
                />
              }
            />
            <Route
              path="/mens"
              element={
                <MaleProducts
                  setProductId={setProductId}
                  user={user}
                  setSuccess={setSuccess}
                  setSuccessTitle={setSuccessTitle}
                  setSuccessMsg={setSuccessMsg}
                />
              }
            />
            <Route
              path="/womens"
              element={
                <FemaleProducts
                  setProductId={setProductId}
                  user={user}
                  setSuccess={setSuccess}
                  setSuccessTitle={setSuccessTitle}
                  setSuccessMsg={setSuccessMsg}
                />
              }
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
            <Route
              path="/orders"
              element={
                <Orders
                  setProductsLength={setProductsLength}
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                  setSuccess={setSuccess}
                  setSuccessTitle={setSuccessTitle}
                  setSuccessMsg={setSuccessMsg}
                />
              }
            />
            <Route
              path="/addproduct"
              element={
                <AddProduct
                  setSuccess={setSuccess}
                  setSuccessTitle={setSuccessTitle}
                  setSuccessMsg={setSuccessMsg}
                />
              }
            />
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
              element={
                <AdminNav
                  setProductId={setProductId}
                  user={user}
                  setProductsLength={setProductsLength}
                  setSuccess={setSuccess}
                  setSuccessTitle={setSuccessTitle}
                  setSuccessMsg={setSuccessMsg}
                />
              }
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
            <Route
              path="/wishlist"
              element={
                <WishList
                  quantity={quantity}
                  setSuccess={setSuccess}
                  setSuccessTitle={setSuccessTitle}
                  setSuccessMsg={setSuccessMsg}
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
};

export default App;
