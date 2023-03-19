const { server } = require("../../index");
const { client } = require("../../db");
const request = require("supertest");

describe("/api/orders", () => {
  describe("GET /api/orders", () => {
    it("returns all orders", async () => {
      const response = await request(server).get("/api/orders");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
  describe("GET /api/orders/:users_id", () => {
    test("returns a user's order", async () => {
      const response = await request(server).get("/api/orders/1");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);

    });
    
  });
  describe("GET /api/orders/history/:users_id", () => {
    test("returns a user's order history", async () => {
      const response = await request(server).get("/api/orders/history/123");
      expect(response.status).toBe(200);
    });
  
  });
  


});
