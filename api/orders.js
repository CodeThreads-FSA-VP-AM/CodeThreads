const express = require("express");
const ordersRouter = express.Router();

const {
  addProductToCart,
  fetchOrder,
  deleteOrder,
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

ordersRouter.get("/", async (req, res, next) => {
  try {
    const order = await fetchOrder();
    res.send(order);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

ordersRouter.delete("/:id", async (req, res, next) => {
  try {
    const orderId = req.params;
    console.log(orderId, "orderID here in api");
    const deletedOrder = await deleteOrder(orderId);
    res.send(deletedOrder);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = ordersRouter;
