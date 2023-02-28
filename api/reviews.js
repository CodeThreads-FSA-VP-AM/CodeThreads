const express = require("express");
const reviewsRouter = express.Router();

const { createReview, deleteReview } = require("../db/models/reviews");

//Create review

reviewsRouter.post("/add", async (req, res, next) => {
  const { id } = req.user;
  const { product_id, title, description, rating } = req.body;
  try {
    const user_id = id;
    const review = await createReview({
      user_id,
      product_id,
      title,
      description,
      rating,
    });
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
