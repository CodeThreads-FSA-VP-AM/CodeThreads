"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require("dotenv").config();
// This is the Web Server
const express = require("express");
const server = express();
// enable cross-origin resource sharing to proxy api requests
// from localhost:3000 to localhost:4000 in local dev env
const cors = require("cors");
server.use(cors());
const bodyParser = require("body-parser");
server.use(bodyParser.json());
// create logs for everything
const morgan = require("morgan");
server.use(morgan("dev"));
// handle application/json requests
server.use(express.json());
// here's our static files
const path = require("path");
server.use(express.static(path.join(__dirname, "build")));
// here's our API
server.use("/api", require("./api"));
// by default serve up the react app if we don't recognize the route
server.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
// bring in the DB connection
const { client } = require("./db");
// connect to the server
const PORT = process.env.PORT || 4000;
// define a server handle to close open tcp connection after unit tests have run
const handle = server.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on ${PORT}!`);
    try {
        yield client.connect();
        console.log("Database is open for business!");
    }
    catch (error) {
        console.error("Database is closed for repairs!\n", error);
    }
}));
// export server and handle for routes/*.test.js
module.exports = { server, handle };
