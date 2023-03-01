const client = require("../client");

async function createReview({
  product_id,
  users_id,
  title,
  description,
  rating,
}) {
  try {
    const {
      row: [review],
    } = await client.query(
      `
      INSERT INTO reviews( product_id, users_id, title, description, rating)
      VALUES ($1,$2,$3,$4, $5)
      RETURNING *
    `,
      [product_id, users_id, title, description, rating]
    );
    console.log(review);
    return review;
  } catch (error) {
    console.error(error);
  }
}

async function deleteReview(review_id) {
  try {
    await client.query(
      `
      DELETE FROM reviews r 
      WHERE r.id = $1;
    `,
      [review_id]
    );
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createReview,
  deleteReview,
};
