const client = require("../client");

async function createReview({
  users_id,
  product_id,
  title,
  description,
  rating,
}) {
  try {
    const {
      row: [review],
    } = await client.query(
      `
      INSERT INTO reviews(users_id, product_id, title, description, rating)
      VALUES ($1,$2,$3,$4)
      RETURNING *
    `,
      [users_id, product_id, title, description, rating]
    );
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
