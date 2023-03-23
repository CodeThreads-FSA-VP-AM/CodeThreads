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
    host: "containers-us-west-142.railway.app",
    port: 7889,
    user: "postgres",
    password: AbHxr6FEzzLfcLC4Op2R,
    database: "railway",
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
