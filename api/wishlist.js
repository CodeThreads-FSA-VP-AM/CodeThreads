const express = require("express");
const wishlistRouter = express.Router();

const {
  addProductToWishlist,
  fetchWishlistById,
  deleteFromWishlist,
} = require("../db/models/wishlist");

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
wishlistRouter.get("/:users_id", async (req, res, next) => {
  const users_id = req.params.users_id;
  try {
    const wishlist = await fetchWishlistById(users_id);
    res.send(wishlist);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
wishlistRouter.delete("/:id", async (req, res, next) => {
  try {
    const wishlistId = req.params;
    const deletedWishlistItem = await deleteFromWishlist(wishlistId);
    res.send(deletedWishlistItem);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = wishlistRouter;
