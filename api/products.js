const express = require('express');
const productRouter = express.Router();

const { createProduct, getProducts, editProduct, deleteProduct, getProductById, getProductByName } = require('../db/models/products');

// GET /api/products/
productRouter.get('/', async (req, res, next) => {
  try {
    const products = await getProducts();
    res.send(products);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /api/products/add
productRouter.post('/add', async (req, res, next) => {
  try {
    // const newProduct = req.body;
    const { title, description, price, front_url, back_url, tags = '' } = req.body;

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
productRouter.patch('/edit/:productId', async (req, res, next) => {
  try {
    const productId = parseInt(req.params.productId);
    const { title, description, price, front_url, back_url, tags = '' } = req.body;

    console.log({ productId });

    const fields = {};

    if (productId) {
      fields.id = productId;
    }
    if (title) {
      fields.title = title;
    }
    if (description) {
      fields.description = description;
    }
    if (price) {
      fields.price = price;
    }
    if (front_url) {
      fields.front_url = front_url;
    }
    if (back_url) {
      fields.back_url = back_url;
    }
    if (tags) {
      fields.tags = tags;
    }

    // const tagArray = tags.trim().split(/\s+/);
    // const productData = {};
    // console.log(tagArray);

    // if (tagArray.length) {
    //   productData.tags = tagArray;
    // }

    // productData.title = title;
    // productData.description = description;
    // productData.price = price;
    // productData.front_url = front_url;
    // productData.back_url = back_url;

    const updateProduct = await editProduct({ fields });
    console.log({ updateProduct });
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
productRouter.delete('/delete/:productId', async (req, res, next) => {
  console.log('@got here');
  try {
    console.log('api backend');
    const productId = req.params.productId;
    console.log({ productId });

    const deleteMe = await deleteProduct(productId);
    console.log({ deleteMe });

    res.send({
      message: 'Successfully Deleted',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /api/products/# get by id
productRouter.get('/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const product = await getProductById(productId);
    if (!product) {
      next({
        name: 'ProductInvalidIdError',
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
productRouter.get('/single/:productName', async (req, res, next) => {
  try {
    const name = req.params.productName;

    const product = await getProductByName(name);
    if (!product) {
      next({
        name: 'ProductInvalidNameError',
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
