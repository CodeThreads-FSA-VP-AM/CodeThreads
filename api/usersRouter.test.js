const { server, handle } = require("../index");
const { client } = require("../db");
const { faker } = require("@faker-js/faker");
const request = require("supertest");

const { objectContaining } = expect;

const { createUser } = require("../db/models/user");

describe("/api/users", () => {
  describe("POST /api/users/register", () => {
    it("create user", async () => {
      // create fake user
      const fakeUserData = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
      };
      console.log(fakeUserData);
      // register fake user
      const response = await request(server).post("/api/users/register").send(fakeUserData);
      expect(response.status).toBe(200);
    });
  });

  describe("POST /api/users/login", () => {
    afterAll(async () => {
      await client.end();
      handle.close();
    });

    it("Logs in the user. Requires username and password.", async () => {
      // create fake user
      const userData = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
      };

      // create user in the db
      await createUser(userData);

      // login the user
      const response = await request(server).post("/api/users/login").send(userData);
      expect(response.body).toEqual(objectContaining({}));
    });

    it("missing username or password", async () => {
      const userMissingData = {
        username: null,
        password: faker.internet.password(),
        email: faker.internet.email(),
      };

      await createUser(userMissingData);

      const response = await request(server).post("/api/users/login").send(userMissingData);
      expect(response.body).toEqual({
        error: "MissingCredentialsError",
        message: "Please supply both a username and password",
        name: "MissingCredentialsError",
      });
    });
  });
});
