const client = require("../client");

const addProductToWishlist = async ({ user_id, product_id, quantity }) => {
  try {
    const {
      rows: [existingWishlist],
    } = await client.query(
      `
        SELECT id 
        FROM wishlist 
        WHERE users_id = $1 AND is_wishlist = true
      `,
      [user_id]
    );
    console.log({ existingWishlist }, "existingWishlist");

    let wishlistId;

    if (existingWishlist) {
      wishlistId = existingWishlist.id;
      console.log({ wishlistId }, "existing wishlist");
      const {
        rows: [existingWishlistProduct],
      } = await client.query(
        `
          SELECT *
          FROM order_products
          WHERE wishlist_id = $1 AND product_id = $2
        `,
        [wishlistId, product_id]
      );

      if (existingWishlistProduct) {
        const updatedQuantity = existingWishlistProduct.quantity + quantity++;
        console.log(updatedQuantity, "updatednumber");

        await client.query(
          `
            UPDATE order_products 
            SET quantity = $1
            WHERE wishlist_id = $2 AND product_id = $3
          `,
          [updatedQuantity, wishlistId, product_id]
        );
      } else {
        await client.query(
          `
            INSERT INTO order_products (wishlist_id, status, quantity, product_id)
            VALUES ($1, 'added', $2, $3)
          `,
          [wishlistId, quantity, product_id]
        );
      }
    } else {
      console.log("new wishlist");
      const {
        rows: [newWishlist],
      } = await client.query(
        `
          INSERT INTO wishlist (users_id, is_wishlist)
          VALUES ($1, true)
          RETURNING id
        `,
        [user_id]
      );

      wishlistId = newWishlist.id;

      await client.query(
        `
          INSERT INTO order_products (wishlist_id, status, quantity, product_id)
          VALUES ($1, 'added', $2, $3)
        `,
        [wishlistId, quantity, product_id]
      );
    }

    const {
      rows: [wishlist],
    } = await client.query(
      `
        SELECT w.id, users_id, wishlist_id, status, quantity, product_id, title, description, price, front_url, back_url 
        FROM wishlist w
        JOIN order_products op ON w.id = op.order_id
        JOIN products p ON op.product_id = p.id
        WHERE w.id = $1
      `,
      [wishlistId]
    );

    return wishlist;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addProductToWishlist,
};
