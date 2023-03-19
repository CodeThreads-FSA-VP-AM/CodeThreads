const { faker } = require("@faker-js/faker");
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "LOLJEST" } = process.env;

const { createUser } = require("../db/models/user");

const createFakeUser = async (username = faker.internet.userName()) => {
  const fakeUserData = {
    username,
    password: faker.internet.password(10),
    email: faker.internet.email(),
    avatar_url: faker.internet.avatar(),
  };
  console.log(fakeUserData);
  const user = await createUser(fakeUserData);
  if (!user) {
    throw new Error("createUser didn't return a user");
  }
  return user;
};

const createFakeUserWithToken = async (username) => {
  const fakeUser = await createFakeUser(username);
  console.log(fakeUser);

  const token = jwt.sign({ id: fakeUser.id, username: fakeUser.username }, JWT_SECRET, {
    expiresIn: "1w",
  });

  console.log(token);

  return {
    fakeUser,
    token,
  };
};

module.exports = {
  createFakeUser,
  createFakeUserWithToken,
};
