const client = require("../client");

// get all products
const getProducts = async () => {
  try {
    const { rows: product } = await client.query(`
    SELECT * FROM products
    `);
    return product;
  } catch (error) {
    console.error(error);
  }
};

// create product
const createProduct = async ({ title, description, price, front_url, back_url }) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    INSERT INTO products(title, description, price, front_url, back_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
      [title, description, price, front_url, back_url]
    );

    return product;
  } catch (error) {
    console.error(error);
  }
};

// get product by id
const getProductById = async (productId) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    SELECT * FROM products WHERE id = $1
    `,
      [productId]
    );

    return product;
  } catch (error) {
    console.error(error);
  }
};

// get product by name
const getProductByName = async (name) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    SELECT * FROM products WHERE title = $1
    `,
      [name]
    );

    return product;
  } catch (error) {
    console.error(error);
  }
};

// edit product
const editProduct = async ({ productId, ...fields }) => {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      UPDATE products
      SET ${setString}
      WHERE id=$1
      RETURNING *
    `,
      Object.values(fields)
    );

    return product;
  } catch (error) {
    console.error(error);
  }
};

// delete product
const deleteProduct = async (productId) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    DELETE
    FROM products
    WHERE id=$1
    `,
      [productId]
    );

    return product;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductByName,
  createProduct,
  editProduct,
  deleteProduct,
};
