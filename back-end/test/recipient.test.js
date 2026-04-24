import request from "supertest";
import app from "../app.js";

const base = request(app);
const uniqueEmail = (prefix = "test") => `${prefix}_${Date.now()}@example.com`;

describe("/Recipient routes", () => {
  test("/recipients/create", async () => {
    const response = await base.post("/recipients/create").send({
      name: "Ana Maria Braga",
      email: uniqueEmail("recipient"),
      phone: "11998767683",
      preferences: "email",
    });

    expect(response.status).toBe(201)
  });
  test("/recipients/get-all", async() => {
    const response = await base.get('/recipients/get-all');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true)
  });
});
