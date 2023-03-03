const client = require("../client");

const getAllReviews = async () => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM reviews 
    `);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

const createReview = async ({
  product_id,
  user_id,
  title,
  description,
  rating,
}) => {
  console.log("got to createReview in models");
  try {
    const {
      rows: [review],
    } = await client.query(
      `
      INSERT INTO reviews (product_id, users_id, title, description, rating)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
      [product_id, user_id, title, description, rating]
    );
    console.log(review);
    return review;
  } catch (error) {
    console.error(error);
  }
};

async function deleteReview(reviewId) {
  try {
    const deletedReview = await client.query(
      `
      DELETE FROM reviews r 
      WHERE r.id = $1;
    `,
      [reviewId]
    );
    return deletedReview;
  } catch (error) {
    console.error(error);
  }
}

async function editReview({ reviewId, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  console.log({ setString });
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [review],
    } = await client.query(
      `
      UPDATE review
      SET ${setString}
      WHERE id=${reviewId}
      RETURNING *
    `,
      Object.values(fields)
    );
    console.log(review);
    return product;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getAllReviews,
  createReview,
  deleteReview,
  editReview,
};
