const express = require("express");
const productRouter = express.Router();

const { createProduct, getProducts, editProduct, deleteProduct, getProductById, getProductByName } = require("../db/models/products");

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
    const newProduct = req.body;

    const product = await createProduct(newProduct);
    if (product) {
      res.send({
        product: product,
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
    const productId = req.params.productId;
    const { title, description, price } = req.body;

    const updateProduct = await editProduct({
      productId,
      title,
      description,
      price,
      front_url,
      back_url,
    });
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
  try {
    const productId = req.params.productId;

    await deleteProduct(productId);

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
