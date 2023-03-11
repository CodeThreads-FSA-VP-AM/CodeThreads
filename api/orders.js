const express = require("express");
const ordersRouter = express.Router();

const {
  addProductToCart,
  fetchOrder,
  deleteOrder,
  newOrder,
  updateOrder,
  getOrderByUserId,
} = require("../db/models/orders");

//Get orders

ordersRouter.post("/add", async (req, res, next) => {
  const { id } = req.user;
  const { product_id, quantity } = req.body;
  console.log(product_id, quantity);
  try {
    const user_id = id;
    console.log(user_id);
    const order = await addProductToCart({ user_id, product_id, quantity });
    res.send(order);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

ordersRouter.post("/create", async (req, res, next) => {
  try {
    const { userId } = req.body;
    const order = await newOrder(userId);
    res.send(order);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

ordersRouter.patch("/checkout", async (req, res, next) => {
  console.log("gets here");
  try {
    const { userId, orderId, status, is_cart } = req.body;
    const fields = {};
    const cartFields = {};

    fields.status = status;
    cartFields.is_cart = is_cart;
    console.log({ status });
    console.log({ is_cart });

    console.log(userId, orderId, status);

    const order = await updateOrder(orderId, userId, fields, cartFields);
    res.send(order);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

ordersRouter.get("/:users_id", async (req, res, next) => {
  const users_id = req.params.users_id;
  try {
    const order = await fetchOrder(users_id);

    //testing call from the frontend productpage ***need to remove
    // const order = await getOrderByUserId(users_id);
    res.send(order);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

ordersRouter.get("/history/:users_id", async (req, res, next) => {
  const user_id = req.params.users_id;
  console.log(user_id);
  try {
    const orderHistory = await getOrderByUserId(user_id);
    res.send(orderHistory);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

ordersRouter.delete("/:id", async (req, res, next) => {
  try {
    const orderId = req.params;
    const deletedOrder = await deleteOrder(orderId);
    res.send(deletedOrder);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = ordersRouter;
