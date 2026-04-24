import request from "supertest";
import app from "../app.js";
const base = request(app);

describe("/Warnings routes", () => {
  test("/warnings/create", async () => {
    const response = await base.post("/warnings/create").send({
      title: "Teste",
      message: "No creo que estás a dormir",
      channel: "email",
      status: "created",
    });

    expect(response.status).toBe(201)
  });
  test("/warnings/update", async () => {
    const response = await base.patch("/warnings/update").send({
      id: 2,
      itemInfo: {
        title: "no creo",
        channel: "email",
        status: 'sent',
      },
    });
    expect(response.status).toBe(200)

  });
  test("/warnings/delete", async () => {
    const response = await base.delete("/warnings/delete").send({
      id: 2,
    });
    expect(response.status).toBe(200)

  });
  test("/warnings/get-by-id", async () => {
    const response = await base.get("/warnings/get-by-id").send({
      id:2,
    });
    expect(response.status).toBe(200)

  });
  test("/warnings/get-all", async () => {
    const response = await base.get("/warnings/get-all");
    expect(response.status).toBe(200)

  });
  test("/warnings/send", async () => {
    const response = await base.post("/warnings/send").send({});
    expect(response.status).toBe(200)

  });
});
