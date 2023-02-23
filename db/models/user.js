// grab our db client connection to use with our adapters
const client = require("../client");
const bcrypt = require("bcrypt");

const createUser = async ({
  username,
  password,
  email,
  created_at,
  is_admin,
}) => {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO USERS(username, password, email, created_at, is_admin)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (username) DO NOTHING
      RETURNING *
    `,
      [username, hashedPassword, email, created_at, is_admin]
    );
    user.password = null;
  } catch (error) {
    console.error(error);
  }
};

const getUser = async ({ username, password }) => {
  const user = await getUserByUsername(username);
  const hashedPassword = user.password;

  const isValid = await bcrypt.compare(password, hashedPassword);
  user.password = null;
  if (isValid) {
    return user;
  } else {
    return null;
  }
};

const getUserByID = async (userId) => {
  try {
    const {
      rows: [user],
    } = await client.query(`SELECT * FROM users WHERE id = $1`, [userId]);
    user.password = null;
    return user;
  } catch (error) {
    console.error(error);
  }
};

const getUserByUsername = async (username) => {
  try {
    const {
      rows: [user],
    } = await client.query(`SELECT * FROM users WHERE username = $1`, [
      userName,
    ]);
    return user;
  } catch (error) {
    console.error(error);
  }
};

const getAllUsers = async () => {
  /* this adapter should fetch a list of users from your db */
  try {
    const {
      rows: [user],
    } = await client.query(`
    SELECT * FROM users
    `);
    return user;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  // add your database adapter fns here
  createUser,
  getUser,
  getUserByID,
  getUserByUsername,
  getAllUsers,
};
