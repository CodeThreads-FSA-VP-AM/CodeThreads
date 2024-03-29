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
          FROM wishlist_products
          WHERE wishlist_id = $1 AND product_id = $2
        `,
        [wishlistId, product_id]
      );

      if (existingWishlistProduct) {
        const updatedQuantity = existingWishlistProduct.quantity + quantity++;
        console.log(updatedQuantity, "updatednumber");

        await client.query(
          `
            UPDATE wishlist_products 
            SET quantity = $1
            WHERE wishlist_id = $2 AND product_id = $3
          `,
          [updatedQuantity, wishlistId, product_id]
        );
      } else {
        await client.query(
          `
            INSERT INTO wishlist_products (wishlist_id, status, quantity, product_id)
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
          INSERT INTO wishlist_products (wishlist_id, status, quantity, product_id)
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
        JOIN wishlist_products wp ON w.id = wp.wishlist_id
        JOIN products p ON wp.product_id = p.id
        WHERE w.id = $1
      `,
      [wishlistId]
    );
    console.log({ wishlist });
    return wishlist;
  } catch (error) {
    console.error(error);
  }
};

const fetchWishlistById = async (users_id) => {
  try {
    const { rows: wishlist } = await client.query(
      `
      SELECT w.id, users_id, wishlist_id, status, quantity, product_id, title, description, price, front_url, back_url 
      FROM wishlist w
      JOIN wishlist_products wp
      ON w.id = wp.wishlist_id
      JOIN products p
      ON wp.product_id = p.id
      WHERE users_id = $1
    `,
      [users_id]
    );
    console.log(wishlist);
    return wishlist;
  } catch (error) {
    console.error(error);
  }
};
const deleteFromWishlist = async ({ id }) => {
  try {
    const {
      rows: [wishlist],
    } = await client.query(
      `
      DELETE FROM wishlist_products WHERE product_id=$1 
      RETURNING *
    `,
      [id]
    );
    return wishlist;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addProductToWishlist,
  fetchWishlistById,
  deleteFromWishlist,
};
