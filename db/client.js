// Connect to DB
require("dotenv").config();
const { error } = require("console");
const { Client } = require("pg");

// change the DB_NAME string to whatever your group decides on
const DB_NAME = "code-threads";

const DB_URL = process.env.DATABASE_URL;

let client;

if (process.env.CI) {
  // github actions client config
  client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: process.env.PG_PASSWORD,
    database: "postgres",
  });
} else {
  // local / heroku client config
  if (!DB_URL) {
    console.log("DATABASE_URL is not defined in the environment variables");
  }
  client = new Client({
    connectionString: DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

module.exports = client;
