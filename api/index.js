const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "neverTell" } = process.env;

const { getUserById } = require("../db/models/user");

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
  });
});

//JWT middleware
apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

// place your routers here
// ROUTER: /api/users
const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const productsRouter = require("./products");
apiRouter.use("/products", productsRouter);

const ordersRouter = require("./orders");
apiRouter.use("/orders", ordersRouter);

const reviewsRouter = require("./reviews");
apiRouter.use("/reviews", reviewsRouter);

const wishlistRouter = require("./wishlist");
apiRouter.use("/wishlist", wishlistRouter);
// error 404 /unknown
apiRouter.get("*", async (req, res, next) => {
  try {
    res.status(404).send({ message: "404 NOT FOUND" });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

apiRouter.use((error, req, res, next) => {
  res.send({
    error: error.name,
    name: error.name,
    message: error.message,
  });
});
module.exports = apiRouter;
