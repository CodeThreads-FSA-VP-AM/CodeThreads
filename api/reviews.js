const express = require("express");
const reviewsRouter = express.Router();

const {
  createReview,
  deleteReview,
  getAllReviews,
} = require("../db/models/reviews");

reviewsRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    res.send(reviews);
  } catch (error) {
    console.error(error);
  }
});

reviewsRouter.post("/add", async (req, res, next) => {
  const { product_id, title, description, rating } = req.body;

  try {
    const user_id = req.user.id;
    console.log(user_id);
    const review = await createReview({
      user_id,
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
    const reviewId = parseInt(req.params.id); // get the id value from req.params.id and parse it to a number
    const deletedReview = await deleteReview(reviewId);
    res.send(deletedReview);
  } catch (error) {
    console.error(error);
  }
});

module.exports = reviewsRouter;
