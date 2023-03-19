const { server, handle } = require("../../index");
const { client } = require("../../db");
const { faker } = require("@faker-js/faker");
const request = require("supertest");

const { objectContaining } = expect;

const { createUser } = require("../../db/models/user");
const { createFakeUserWithToken } = require("../helpers");

describe("/api/users", () => {
  describe("POST /api/users/register", () => {
    it("create user", async () => {
      // create fake user
      const fakeUserData = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        avatar_url: faker.internet.avatar(),
      };
      // register fake user
      const response = await request(server).post("/api/users/register").send(fakeUserData);
      expect(response.status).toBe(200);
    });
  });

  describe("POST /api/users/login", () => {
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
      console.log(userData);
      expect(response.body).toEqual({
        message: expect.any(String),
        token: expect.any(String),
        user: expect.any(Object),
      });
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

  describe("GET / all users endpoint", () => {
    it("should return an array of all users", async () => {
      const response = await request(server).get("/api/users/");
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe("GET /api/users/me", () => {
    it("send back users data", async () => {
      const { fakeUser, token } = await createFakeUserWithToken();
      console.log({ token });
      const response = await request(server)
        .get("/api/users/me")
        .set("Authorization", `Bearer ${token}`);

      expect(response.body).toEqual({
        avatar_url: expect.any(String),
        created_at: expect.any(String),
        email: expect.any(String),
        id: expect.any(Number),
        username: expect.any(String),
      });
    });
  });

  // afterAll(async () => {
  //   await client.end();
  //   handle.close();
  // });
});
