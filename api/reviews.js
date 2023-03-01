const express = require("express");
const reviewsRouter = express.Router();

const { createReview, deleteReview } = require("../db/models/reviews");

//Create review

reviewsRouter.post("/add", async (req, res, next) => {
  const { id } = req.user;
  console.log(id, "ID from reviewsRouter");
  const { product_id, title, description, rating } = req.body;
  console.log(id, product_id, title, description, rating);
  try {
    const users_id = id;
    const review = await createReview({
      users_id,
      product_id,
      title,
      description,
      rating,
    });
    console.log(review);
    res.send(review);
  } catch (error) {
    console.error(error);
  }
});

reviewsRouter.delete("/:id", async (req, res, next) => {
  try {
    const reviewId = req.params;
    const deletedReview = await deleteReview(reviewId);
    res.send(deletedReview);
  } catch (error) {
    console.error(error);
  }
});

module.exports = reviewsRouter;
