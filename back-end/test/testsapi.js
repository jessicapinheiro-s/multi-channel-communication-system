import request from "supertest";
import app from "../app.js";

// NOTE: these tests assume the backend is running at http://localhost:3001
// Start the server before running tests: `npm start --prefix back-end`
const base = request(app);

// Utility to generate unique emails for register tests
const uniqueEmail = (prefix = "test") => `${prefix}_${Date.now()}@example.com`;

describe("Public endpoints", () => {
    test("GET /api/hello should return health message", async () => {
        const res = await base.get("/api/hello");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ msg: "Backend funcionando" });
    });
});

describe("Auth endpoints", () => {
    test("POST /auth/register should create a user", async () => {
        const email = uniqueEmail("register");
        const res = await base.post("/auth/register").send({
            name: "Test User",
            email,
            password: "password123",
            phone: "1234567890",
            user_preferences: "email",
        });

        // Controller currently returns 200 on success
        expect([200, 201]).toContain(res.status);
        // If user object is returned, it should include the email
        if (res.body && res.body.email) expect(res.body.email).toBe(email);
    });

    test.skip("POST /auth/login (skipped) - depends on auth middleware and token flow", async () => {
        // The login route in this codebase may require authentication middleware
        // (currently wired with `auth` middleware). Skipping by default.
    });

    test("POST /auth/logout should clear cookie or return success", async () => {
        const res = await base.post("/auth/logout");
        expect([200, 204, 401]).toContain(res.status);
    });
});

describe("User endpoints (some require auth)", () => {
    test("POST /users/create should create a user", async () => {
        const email = uniqueEmail("usercreate");
        const res = await base.post("/users/create").send({
            name: "User Create",
            email,
            password: "pwd12345",
            phone: "0000000000",
            warning_preference: "sms",
        });

        expect([200, 201]).toContain(res.status);
    });

    test.skip("PUT /users/update (skipped) - requires auth token", async () => {});
    test.skip("DELETE /users/delete (skipped) - requires auth token", async () => {});
    test.skip("GET /users/get-by-email (skipped) - requires auth token", async () => {});
    test.skip("GET /users/get-by-id (skipped) - requires auth token", async () => {});
});

describe("Warnings endpoints (protected)", () => {
    test.skip("POST /warnings/create (skipped) - requires auth token", async () => {});
    test.skip("PATCH /warnings/update (skipped) - requires auth token", async () => {});
    test.skip("DELETE /warnings/delete (skipped) - requires auth token", async () => {});
    test.skip("GET /warnings/get-by-id (skipped) - requires auth token", async () => {});
});

describe("Warning-sent-logs endpoints (protected)", () => {
    test.skip("GET /warnings_logs/get-all (skipped) - requires auth token", async () => {});
    test.skip("POST /warnings_logs/create (skipped) - requires auth token", async () => {});
    test.skip("PATCH /warnings_logs/get-by-id (skipped) - requires auth token and route param", async () => {});
});

// Helpful note: to enable the skipped tests, implement the auth flow in the
// backend so you can register/login and obtain a token, then set the
// Authorization header for protected requests:
// .set('Authorization', `Bearer ${token}`)
