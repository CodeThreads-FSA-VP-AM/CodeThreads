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
    console.log({ existingOrder }, "existingOrder");

    let orderId;

    if (existingOrder) {
      orderId = existingOrder.id;
      console.log({ orderId }, "existing order");
      const {
        rows: [existingOrderProduct],
      } = await client.query(
        `
          SELECT *
          FROM order_products
          WHERE order_id = $1 AND product_id = $2
        `,
        [orderId, product_id]
      );

      if (existingOrderProduct) {
        const updatedQuantity = existingOrderProduct.quantity + quantity++;
        console.log(updatedQuantity, "updatednumber");

        await client.query(
          `
            UPDATE order_products 
            SET quantity = $1
            WHERE order_id = $2 AND product_id = $3
          `,
          [updatedQuantity, orderId, product_id]
        );
      } else {
        await client.query(
          `
            INSERT INTO order_products (order_id, status, quantity, product_id)
            VALUES ($1, 'added', $2, $3)
          `,
          [orderId, quantity, product_id]
        );
      }
    } else {
      console.log("new order");
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

      await client.query(
        `
          INSERT INTO order_products (order_id, status, quantity, product_id)
          VALUES ($1, 'added', $2, $3)
        `,
        [orderId, quantity, product_id]
      );
    }

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

// change the array
const fetchOrder = async (users_id) => {
  try {
    const { rows: order } = await client.query(
      `
      SELECT o.id, users_id, order_id, status, quantity, product_id, title, description, price, front_url, back_url 
      FROM orders o
      JOIN order_products op
      ON o.id = op.order_id
      JOIN products p
      ON op.product_id = p.id
      WHERE users_id = $1
    `,
      [users_id]
    );
    console.log(order);
    return order;
  } catch (error) {
    console.error(error);
  }
};

const fetchAllOrders = async () => {
  try {
    const { rows: order } = await client.query(`
    SELECT o.id, users_id, order_id, status, quantity, product_id, title, description, price, front_url, back_url 
      FROM orders o
      JOIN order_products op
      ON o.id = op.order_id
      JOIN products p
      ON op.product_id = p.id
    `);
    return order;
  } catch (error) {
    console.error(error);
  }
};

const getOrderByUserId = async (userId) => {
  try {
    const { rows: orders } = await client.query(
      `
    SELECT o.*, array_agg(op.product_id) as product_ids, array_agg(op.quantity) as quantities
    FROM orders o
    JOIN order_products op ON o.id = op.order_id
    WHERE users_id = $1
    GROUP BY o.id
  `,
      [userId]
    );
    // console.log(orders);

    const productIds = orders.flatMap((order) => order.product_ids);

    const { rows: products } = await client.query(
      `
    SELECT p.* FROM products p
    WHERE p.id = ANY($1)
  `,
      [productIds]
    );

    const ordersWithProducts = orders.map((order) => {
      const orderProducts = products.filter((product) =>
        order.product_ids.includes(product.id)
      );
      const combinedProducts = orderProducts.map((product, index) => ({
        ...product,
        quantity: order.quantities[index],
      }));
      return {
        ...order,
        products: combinedProducts,
      };
    });

    console.log(ordersWithProducts);

    ordersWithProducts.forEach((order) => {
      delete order.product_ids;
      delete order.quantities;
    });

    // console.log(ordersWithProducts);
    return ordersWithProducts;
    // console.log(products);
    // return products;

    // const { rows: orders } = await client.query(
    //   `
    // SELECT o.*, op.product_id FROM orders o
    // JOIN order_products op
    // ON o.id = op.order_id
    // WHERE users_id = $1
    // `,
    //   [userId]
    // );
    // console.log(orders);

    // delete orders.product_id;

    // const { rows: products } = await client.query(`
    // SELECT p.id, p.* FROM products p
    // JOIN order_products op
    // ON p.id = op.product_id
    // `);
    // console.log(products);

    // return orders.map((o) => {
    //   o.products = products.filter((p) => p.id === o.product_id);
    //   return o;
    // });

    // return orders;
  } catch (error) {
    console.error(error);
  }
};

const deleteOrder = async ({ id }) => {
  console.log(id, "in orderjs models");
  try {
    const {
      rows: [order],
    } = await client.query(
      `
    DELETE FROM order_products WHERE product_id=$1 
    RETURNING *
    `,
      [id]
    );
    return order;
  } catch (error) {
    console.error(error);
  }
};

const updateOrder = async (orderId, userId, fields = {}, cartFields = {}) => {
  console.log(fields, orderId);

  const setString = Object.keys(fields)
    .map((key, i) => `"${key}"=$${i + 1}`)
    .join(", ");

  const setStringCart = Object.keys(cartFields)
    .map((key, i) => `"${key}"=$${i + 1}`)
    .join(", ");

  console.log({ setString });
  console.log({ setStringCart });

  // wont need fetchOrder in this function, not using anything from the call
  try {
    const order = await fetchOrder(userId);
    if (order) {
      const {
        rows: [order],
      } = await client.query(
        `
      UPDATE order_products SET ${setString}
      WHERE order_id = ${orderId}
      RETURNING *
      `,
        Object.values(fields)
      );

      await client.query(
        `
      UPDATE orders SET ${setStringCart}
      WHERE id = ${orderId}
      RETURNING *
      `,
        Object.values(cartFields)
      );
      console.log({ order });
      return order;
    }
  } catch (error) {
    console.error(error);
  }
};

const newOrder = async (user_id) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
    INSERT INTO orders (users_id, is_cart)
    VALUES ($1, false)
    RETURNING id
    `,
      [user_id]
    );
    console.log("neworder", order);
    return order;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addProductToCart,
  fetchOrder,
  getOrderByUserId,
  newOrder,
  updateOrder,
  deleteOrder,
  fetchAllOrders,
};
