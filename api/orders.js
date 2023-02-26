const express = require("express");
const ordersRouter = express.Router();

const { addProductToCart, fetchOrder } = require("../db/models/orders");

//Get orders

ordersRouter.post("/", async (req, res, next) => {
  const { id } = req.user;
  const { product_id, quantity } = req.body;
  try {
    const user_id = id;
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
    console.log(order);
  } catch (error) {
    console.error(error);
  }
});

module.exports = ordersRouter;
