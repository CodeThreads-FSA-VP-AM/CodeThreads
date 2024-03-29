// grab our db client connection to use with our adapters
const client = require("../client");
const bcrypt = require("bcrypt");
const { useRouteError } = require("react-router-dom");

const createUser = async ({ username, password, email, is_admin, avatar_url }) => {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO USERS(username, password, email, is_admin, avatar_url)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (username) DO NOTHING
      RETURNING *
    `,
      [username, hashedPassword, email, is_admin, avatar_url]
    );
    delete user.password;

    return user;
  } catch (error) {
    console.error(error);
  }
};

const editUser = async (userId, fields = {}) => {
  console.log(userId, fields);

  //update password to hashed
  //check if they used the same password?
  const SALT_COUNT = 10;
  const password = fields.password;

  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  fields.password = hashedPassword;

  const setString = Object.keys(fields)
    .map((key, i) => `"${key}"=$${i + 1}`)
    .join(", ");

  console.log(setString);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
  UPDATE users SET ${setString}
  WHERE id=${userId}
  RETURNING *
  `,
      Object.values(fields)
    );

    delete user.password;
    return user;
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (userId) => {
  try {
    console.log(userId);
    await client.query(
      `
    DELETE FROM users 
    WHERE id = $1 
    `,
      [userId]
    );

    return;
  } catch (error) {
    console.error(error);
  }
};

const getUser = async ({ username, password }) => {
  const user = await getUserByUsername(username);
  const hashedPassword = user.password;

  const isValid = await bcrypt.compare(password, hashedPassword);
  delete user.password;
  if (isValid) {
    return user;
  } else {
    return null;
  }
};

const getUserById = async (userId) => {
  try {
    const {
      rows: [user],
    } = await client.query(`SELECT * FROM users WHERE id = $1`, [userId]);
    delete user.password;
    return user;
  } catch (error) {
    console.error(error);
  }
};

const getUserByUsername = async (username) => {
  try {
    const {
      rows: [user],
    } = await client.query(`SELECT * FROM users WHERE username = $1`, [username]);
    return user;
  } catch (error) {
    console.error(error);
  }
};

const getUserByEmail = async (email) => {
  try {
    const {
      rows: [user],
    } = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return user;
  } catch (error) {
    console.error(error);
  }
};

const getAllUsers = async () => {
  /* this adapter should fetch a list of users from your db */
  try {
    const { rows: user } = await client.query(`
    SELECT * FROM users
    `);

    delete user.password;
    return user;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  // add your database adapter fns here
  createUser,
  editUser,
  deleteUser,
  getUser,
  getUserById,
  getUserByUsername,
  getUserByEmail,
  getAllUsers,
};
