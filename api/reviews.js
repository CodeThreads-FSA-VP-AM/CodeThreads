const express = require("express");
const reviewsRouter = express.Router();

const {
  createReview,
  deleteReview,
  getAllReviews,
  editReview,
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

reviewsRouter.patch("/reviews/:reviewId", async (req, res, next) => {
  try {
    const reviewId = req.params;
    const { title, description, rating, product_id, user_id } = req.body;
    const editedReview = await editReview({
      reviewId: reviewId,
      ...req.body,
    });
    res.send(editedReview);
  } catch (error) {
    console.error(error);
  }
});

module.exports = reviewsRouter;
