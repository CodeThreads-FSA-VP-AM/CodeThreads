const client = require('../client');

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
  console.log({ productId });
  console.log({ fields });
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ');
  console.log({ setString });
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
      WHERE id=${productId}
      RETURNING *
    `,
      Object.values(fields)
    );
    console.log(product);
    return product;
  } catch (error) {
    console.error(error);
  }
};

// delete product
const deleteProduct = async (productId) => {
  console.log('@db level delete', productId);
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

// create tags
const createTags = async (tagList) => {
  if (tagList === 0) {
    return;
  }

  const insertVal = tagList.map((_, i) => `$${i + 1}`).join('), (');
  const selectVal = tagList.map((_, i) => `$${i + 1}`).join(', ');

  try {
    await client.query(
      `
    INSERT INTO tags(name)
    VALUES (${insertVal})
    ON CONFLICT (name) DO NOTHING
    `,
      tagList
    );

    const { rows } = await client.query(
      `
    SELECT * FROM tags
    WHERE name 
    IN (${selectVal})
    `,
      tagList
    );

    return rows;
  } catch (error) {
    console.error(error);
  }
};

// create product tags
const createProductTag = async (product_id, tag_id) => {
  try {
    await client.query(
      `
    INSERT INTO  product_tags(product_id, tag_id)
    VALUES ($1, $2)
    ON CONFLICT (product_id, tag_id) DO NOTHING
    `,
      [product_id, tag_id]
    );
  } catch (error) {
    console.error(error);
  }
};

// add tag to product
const addTagToProduct = async (product_id, tagList) => {
  try {
    const createProductTag = tagList.map((t) => createProductTag(product_id, t.id));

    await Promise.all(createProductTag);

    return await getProductById(product_id);
  } catch (error) {
    console.error(error);
  }
};

// get product by tag
const getProductByTag = async (tag) => {
  try {
    const { rows: product } = await client.query(
      `
    SELECT products.id FROM products
    JOIN product_tags ON products.id=product_tags."product_id"
    JOIN tags ON tags.id=product_tags."tag_id"
    WHERE tags.name=$1
    `,
      [tag]
    );

    return await Promise.all(product.map((p) => getProductById(p.id)));
  } catch (error) {
    console.error(error);
  }
};

// get all tags
const getAllTags = async () => {
  const { rows } = await client.query(`
  SELECT * FROM tags;
  `);
  return rows;
};

module.exports = {
  getProducts,
  getProductById,
  getProductByName,
  createProduct,
  editProduct,
  deleteProduct,
  createTags,
  createProductTag,
  addTagToProduct,
  getProductByTag,
  getAllTags,
};
