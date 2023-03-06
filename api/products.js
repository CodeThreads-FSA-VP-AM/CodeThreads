const express = require("express");
const productRouter = express.Router();

const { createProduct, getProducts, editProduct, deleteProduct, getProductById, getProductByName } = require("../db/models/products");
const { updateQty } = require("../db/models/sizes");

// GET /api/products/
productRouter.get("/", async (req, res, next) => {
  try {
    const products = await getProducts();
    res.send(products);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /api/products/add
productRouter.post("/add", async (req, res, next) => {
  try {
    // const newProduct = req.body;
    const { title, description, price, front_url, back_url, tags = "", small, medium, large, xlarge } = req.body;

    console.log({ small, medium, large, xlarge });

    const tagArray = tags.trim().split(/\s+/);
    const productData = {};
    console.log(tagArray);

    if (tagArray.length) {
      productData.tags = tagArray;
    }

    productData.title = title;
    productData.description = description;
    productData.price = price;
    productData.front_url = front_url;
    productData.back_url = back_url;
    productData.small = small;
    productData.medium = medium;
    productData.large = large;
    productData.xlarge = xlarge;

    const product = await createProduct(productData);
    console.log({ product });
    if (product) {
      res.send({
        product,
        message: `New Product: [${product.title}] Added Successfully`,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /api/products/edit/#
productRouter.patch("/edit/:productId", async (req, res, next) => {
  try {
    const productId = parseInt(req.params.productId);
    console.log({ productId }, "@55 prod api");
    const { title, description, price, front_url, back_url, tags = "", small, medium, large, xlarge } = req.body;

    console.log({ small, medium, large, xlarge });
    console.log({ productId });

    const tagArray = tags.trim().split(/\s+/);
    const productData = {};

    const sizeQtyData = {};
    console.log(tagArray);

    productData.title = title;
    productData.description = description;
    productData.price = price;
    productData.front_url = front_url;
    productData.back_url = back_url;
    sizeQtyData.small = small;
    sizeQtyData.medium = medium;
    sizeQtyData.large = large;
    sizeQtyData.xlarge = xlarge;

    if (tagArray.length) {
      productData.tags = tagArray;
    }

    console.log({ productData, sizeQtyData });

    // const updateProduct = await editProduct(productId, productData);
    // const updateQtyProduct = await updateQty(productId, sizeQtyData);

    const [updateProduct, updateQtyProduct] = await Promise.all([editProduct(productId, productData), updateQty(productId, sizeQtyData)]);

    console.log({ updateProduct, updateQtyProduct });
    if (updateProduct) {
      res.send({
        product: updateProduct,
        message: `Product: [${updateProduct.title}] Successfully Updated`,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /api/products/delete/#
productRouter.delete("/delete/:productId", async (req, res, next) => {
  console.log("@got here");
  try {
    console.log("api backend");
    const productId = req.params.productId;
    console.log({ productId });

    const deleteMe = await deleteProduct(productId);
    console.log({ deleteMe });

    res.send({
      message: "Successfully Deleted",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /api/products/# get by id
productRouter.get("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const product = await getProductById(productId);
    if (!product) {
      next({
        name: "ProductInvalidIdError",
        message: `Product ${productId} does not exist`,
      });
      res.status(404);
    } else {
      res.send(product);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /api/products/name get product by name
productRouter.get("/single/:productName", async (req, res, next) => {
  try {
    const name = req.params.productName;

    const product = await getProductByName(name);
    if (!product) {
      next({
        name: "ProductInvalidNameError",
        message: `Product ${name} does not exist`,
      });
      res.status(404);
    } else {
      res.send({
        product,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = productRouter;
