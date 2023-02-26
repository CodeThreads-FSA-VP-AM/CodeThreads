const client = require("../client");

const addProductToCart = async ({ user_id, product_id, quantity }) => {
  try {
    console.log(user_id, product_id, quantity);
    const {
      rows: [order],
    } = await client.query(
      `
      INSERT INTO orders (users_id, product_id, status, quantity)
      VALUES ($1, $2, 'In cart', $3)
      RETURNING *
    `,
      [user_id, product_id, quantity]
    );
    console.log(order);
    return order;
  } catch (error) {
    console.error(error);
  }
};

const fetchOrder = async () => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM orders
    `);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addProductToCart,
  fetchOrder,
};
