const { server, handle } = require("../../index");
const { client } = require("../../db");
const supertest = require("supertest");
const request = supertest(server);

describe("/api/health endpoint", () => {
  it("should respond with { healthy: true }", async () => {
    const response = await request.get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body.healthy).toBe(true);
  });
});

describe("/api/ API Under Construction endpoint", () => {
  it('should respond with { message: "API is under construction!" }', async () => {
    const response = await request.get("/api/");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("API is under construction!");
  });
});

describe("/api/nowhere Error 404 endpoint", () => {
  // // close db connection and supertest server tcp connection
  // afterAll(async () => {
  //   await client.end();
  //   handle.close();
  // });

  it("should return a 404", async () => {
    const response = await request.get("/api/unknown");
    expect(response.status).toEqual(404);
    // the 404 response returns an object with a message property
    expect(typeof response.body.message).toEqual("string");
  });
});
