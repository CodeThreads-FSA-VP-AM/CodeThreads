const client = require("../client");

const addProductToCart = async ({ user_id, product_id, quantity }) => {
  try {
    const {
      rows: [existingOrder],
    } = await client.query(
      `
        SELECT id 
        FROM orders 
        WHERE users_id = $1 AND is_cart = true
      `,
      [user_id]
    );

    let orderId;

    if (existingOrder) {
      orderId = existingOrder.id;
    } else {
      const {
        rows: [newOrder],
      } = await client.query(
        `
          INSERT INTO orders (users_id, is_cart)
          VALUES ($1, true)
          RETURNING id
        `,
        [user_id]
      );
      orderId = newOrder.id;
    }

    await client.query(
      `
        INSERT INTO order_products (order_id, status, quantity, product_id)
        VALUES ($1, 'added', $2, $3)
      `,
      [orderId, quantity, product_id]
    );

    const {
      rows: [order],
    } = await client.query(
      `
    SELECT o.id, users_id, order_id, status, quantity, product_id, title, description, price, front_url, back_url 
    FROM orders o
    JOIN order_products op ON o.id = op.order_id
    JOIN products p ON op.product_id = p.id
    WHERE o.id = $1
  `,
      [orderId]
    );

    return order;
  } catch (error) {
    console.error(error);
  }
};

const fetchOrder = async () => {
  try {
    const { rows: order } = await client.query(
      `
      SELECT o.id, users_id, order_id, status, quantity, product_id, title, description, price, front_url, back_url 
      FROM orders o
      JOIN order_products op
      ON o.id = op.order_id
      JOIN products p
      ON op.product_id = p.id
    `
    );
    return order;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addProductToCart,
  fetchOrder,
};
