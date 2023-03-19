require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const usersRouter = express.Router();
const { JWT_SECRET = "neverTell" } = process.env;

// const bcrypt = require("bcrypt");

const {
  createUser,
  getUserByUsername,
  getUserByEmail,
  getUser,
  editUser,
  getAllUsers,
  deleteUser,
} = require("../db/models/user");
const { requireUser } = require("./utils");

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = req.body;
    const _user = await getUserByUsername(newUser.username);
    const _email = await getUserByEmail(newUser.email);

    if (_user) {
      next({
        name: "UserNameExistsError",
        message: `User ${newUser.username} is already taken.`,
      });
      res.status(401);
    } else if (_email) {
      next({
        name: "EmailExistsError",
        message: `Email ${newUser.email} is already taken.`,
      });
      res.status(401);
    } else {
      const user = await createUser(newUser);
      const token = jwt.sign(user, process.env.JWT_SECRET);
      res.send({
        user: user,
        message: "User created!",
        token: token,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /api/users/me/edit/#
usersRouter.patch("/edit/:userid", requireUser, async (req, res, next) => {
  try {
    const { username, password, avatar, email } = req.body;
    const userId = parseInt(req.params.userid);

    const fields = {};
    fields.username = username;
    fields.password = password;
    fields.avatar_url = avatar;
    fields.email = email;

    const userUpdate = await editUser(userId, fields);
    res.send({
      userUpdate,
      message: `You have updated your profile`,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /api/users/delete
usersRouter.delete("/delete", async (req, res, next) => {
  try {
    const { userId } = req.body;
    console.log(userId, "fromDeleteUser");
    const deletedUser = await deleteUser(userId);
    res.send({
      deletedUser,
      message: `User: ${userId} has been banned 👀`,
    });
  } catch (error) {
    console.error(error);
  }
});

// POST /api/users/login
usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (!username || !password) {
    res.status(401);
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUser({ username, password });
    // console.log(user, "Users HEREE");
    if (user) {
      const token = jwt.sign(user, JWT_SECRET);
      res.send({ message: "you're logged in!", token, user });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect.",
      });
    }
  } catch (error) {
    next(error);
  }
});
usersRouter.post("/oauth", async (req, res, next) => {
  const { username } = req.body;
  console.log(username, "inoauth");
  try {
    const user = await getUserByUsername(username);
    console.log(user, "Users HEREE");
    if (user) {
      const token = jwt.sign(user, JWT_SECRET);
      res.send({ message: "you're logged in!", token, user });
    } else {
      next({
        name: "Incorrect Credentials Error",
        message: "Username is incorrect.",
      });
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/users/me

usersRouter.get("/me", requireUser, (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

// GET /api/users
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    console.error(error);
  }
});

module.exports = usersRouter;
