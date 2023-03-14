const express = require("express");
const wishlistRouter = express.Router();

const { addProductToWishlist } = require("../db/models/wishlist");

wishlistRouter.post("/add", async (req, res, next) => {
  const { id } = req.user;
  const { product_id, quantity } = req.body;
  console.log(product_id, quantity);
  try {
    const user_id = id;
    console.log(user_id);
    const wishlist = await addProductToWishlist({
      user_id,
      product_id,
      quantity,
    });
    res.send(wishlist);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = wishlistRouter;
