const client = require("../client");

// update qty
const updateQty = async (product_id, fields = {}) => {
  console.log({ product_id, fields }, "@sizes");

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  console.log({ setString }, "@sizes");

  try {
    if (setString.length > 0) {
      const {
        rows: [sizes],
      } = await client.query(
        `
      UPDATE sizes
      SET ${setString}
      WHERE product_id = ${product_id}
      `,
        Object.values(fields)
      );
      console.log({ sizes }, "did it work?");
      return sizes;
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  updateQty,
};
