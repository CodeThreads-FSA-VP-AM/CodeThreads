import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes, BrowserRouter as Router } from "react-router-dom";

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
import { User, WishlistData } from "./Interfaces";
import NotFound from "./NotFound";
import AdminNav from "./AdminNav";
import StripeContainer from "./StripeContainer";
import Completion from "./Completion";
import TestStripe from "./TestStripe";
import OrderHistroy from "./OrderHistroy";
import UserProfile from "./UserProfile";
import AccountSettings from "./AccountSettings";
import SuccessNotification from "./SuccessNotification";
import MaleProducts from "./MaleProducts";
import FemaleProducts from "./FemaleProducts";
import WishList from "./WishList";
import ErrorNotification from "./ErrorNotification";
import Footer from "./Footer";

const App: React.FC = () => {
  const [productId, setProductId] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState();
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [errorNoti, setErrorNoti] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [successTitle, setSuccessTitle] = useState("");
  const [productsLength, setProductsLength] = useState(0);
  const [wishlist, setWishlist] = useState<WishlistData[]>([]);

  const getProduct = async () => {
    const product = await fetchProductById(productId);
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

  return (
    <>
      <Router>
        <Navbar user={user} token={token} setToken={setToken} productsLength={productsLength} />
        {success && (
          <SuccessNotification
            success={success}
            setSuccess={setSuccess}
            successTitle={successTitle}
            successMsg={successMsg}
          />
        )}
        {error && <ErrorNotification error={error} setError={setError} errorNoti={errorNoti} />}
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
                <EditProduct product={product} productId={productId} setProductId={setProductId} />
              }
            />

            <Route path="/featured" element={<Featured />} />
            <Route path="/home" element={<Home />} />

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
              element={<AccountSettings user={user} token={token} setUser={setUser} />}
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
