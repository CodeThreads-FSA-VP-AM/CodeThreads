// Connect to DB
require("dotenv").config();
const { Client } = require("pg");

// change the DB_NAME string to whatever your group decides on
const DB_NAME = "code-threads";

const DB_URL = process.env.DATABASE_URL;

let client;

// github actions client config
if (process.env.CI) {
  client = new Client({
    host: db.bit.io,
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "postgres",
  });
} else {
  // local / heroku client config
  client = new Client({
    DB_URL,
  });
}

module.exports = client;
