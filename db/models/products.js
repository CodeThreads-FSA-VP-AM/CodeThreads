const client = require("../client");

// get all products
const getProducts = async () => {
  try {
    const { rows: product } = await client.query(`
    SELECT id FROM products
    `);

    const products = await Promise.all(product.map((p) => getProductById(p.id)));
    return products;
  } catch (error) {
    console.error(error);
  }
};

// create product
const createProduct = async ({ title, description, price, front_url, back_url, tags = [], small, medium, large, xlarge }) => {
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

    console.log({ small, medium, large, xlarge });

    const { rows: sizes } = await client.query(
      `
    INSERT INTO sizes(product_id, small, medium, large, xlarge)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
      [product.id, small, medium, large, xlarge]
    );
    console.log({ sizes });
    console.log({ tags });
    const tagList = await createTags(tags);
    console.log({ tagList });
    console.log({ product });

    return await addTagToProduct(product.id, tagList);
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

    if (!product) {
      throw {
        name: "ProductNotFoundError",
        message: `No product exists with id: ${productId}`,
      };
    }

    const { rows: sizes } = await client.query(
      `
    SELECT * FROM sizes
    WHERE product_id = $1
    `,
      [productId]
    );

    const { rows: tags } = await client.query(
      `
    SELECT tags.* FROM tags
    JOIN product_tags ON tags.id=product_tags."tag_id"
    WHERE product_tags."product_id"=$1
    `,
      [productId]
    );

    product.sizes = sizes;
    product.tags = tags;

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
const editProduct = async (productId, fields = {}) => {
  console.log(fields);

  // const productId = fields.id;
  console.log({ productId }, "products db");
  const { title } = fields;
  console.log({ title });

  const { tags } = fields;
  console.log({ tags }, "@99");
  delete fields.tags;

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  console.log({ setString });
  // if (setString.length === 0) {
  //   return;
  // }

  try {
    if (setString.length > 0) {
      await client.query(
        `
      UPDATE products
      SET ${setString}
      WHERE id=${productId}
      RETURNING *;
    `,
        Object.values(fields)
      );
    }

    if (tags === undefined) {
      return await getProductById(productId);
    }

    // errors is here

    console.log({ tags }, "@127");
    const tagList = await createTags(tags);
    console.log({ tagList }, "@129");
    const tagListIdString = tagList.map((tag) => `${tag.id}`).join(", ");

    await client.query(
      `
    DELETE FROM product_tags
    WHERE tag_id
    NOT IN (${tagListIdString})
    AND product_id=$1
    `,
      [productId]
    );

    await addTagToProduct(productId, tagList);
    return await getProductById(productId);
  } catch (error) {
    console.error(error);
  }
};

// delete product
const deleteProduct = async (productId) => {
  console.log("@db level delete", productId);
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
  console.log({ tagList });
  if (tagList === 0) {
    return;
  }

  const insertVal = tagList.map((_, i) => `$${i + 1}`).join("), (");
  const selectVal = tagList.map((_, i) => `$${i + 1}`).join(", ");

  console.log({ insertVal, selectVal });

  try {
    await client.query(
      `
    INSERT INTO tags(name)
    VALUES (${insertVal})
    ON CONFLICT (name) DO NOTHING;
    `,
      tagList
    );

    const { rows } = await client.query(
      `
    SELECT * FROM tags
    WHERE name 
    IN (${selectVal});
    `,
      tagList
    );
    console.log({ rows });
    return rows;
  } catch (error) {
    console.error(error);
  }
};

// create product tags
const createProductTag = async (product_id, tag_id) => {
  console.log({ product_id, tag_id });
  try {
    await client.query(
      `
    INSERT INTO product_tags("product_id", "tag_id")
    VALUES ($1, $2)
    ON CONFLICT ("product_id", "tag_id") DO NOTHING
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
    const createProductTagPromises = tagList.map((t) => createProductTag(product_id, t.id));

    await Promise.all(createProductTagPromises);

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
