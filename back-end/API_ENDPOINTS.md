# API Endpoints (back-end)

This file documents the HTTP endpoints exposed by the backend. It was generated from the route and controller files in `src/routes` / `src/controllers`.

NOTE: I parsed the current `index.js` entrypoint and route mounts. There is a likely typo in `back-end/index.js` where `/warnings` is mounted as `/warnings]` — please fix that to `/warnings` so the warnings routes are reachable.

---

Base health

- GET /api/hello
  - Description: Simple health endpoint.
  - Auth: none
  - Response: 200 { msg: "Backend funcionando" }


Auth routes (mounted at `/auth`)

- POST /auth/login
  - Description: Login user. Controller sets an HttpOnly cookie `token` and returns { token, user } in the JSON body.
  - Auth: middleware `auth` is currently applied on this route in code (note: login should not require auth). Verify this behaviour.
  - Request body: { email, password }
  - Responses:
    - 200: { token, user }
    - 400: { error: "Invalid request" }
    - 401: { error: "..." }

- POST /auth/logout
  - Description: Clears auth cookie `token`.
  - Auth: none
  - Request body: none
  - Responses:
    - 200: { message: "Logout successful" }

- POST /auth/register
  - Description: Register a new user.
  - Auth: none
  - Request body: { name, email, password, phone, user_preferences }
  - Responses:
    - 200: created user object
    - 400/401: error


User routes (mounted at `/users`)

- POST /users/create
  - Description: Create a user.
  - Auth: none
  - Request body: { name, email, password, phone, warning_preference }
  - Responses:
    - 200: created user object
    - 400: { error }

- PUT /users/update
  - Description: Update user fields.
  - Auth: required (middleware `auth`)
  - Request body: { id, item_data }
    - item_data: partial object with fields to update
  - Responses:
    - 200: updated user object
    - 400: { error }

- DELETE /users/delete
  - Description: Delete user by id.
  - Auth: required
  - Request body: { id }
  - Responses:
    - 200: deleted object
    - 400: { error }

- GET /users/get-by-email
  - Description: Retrieve user by email.
  - Auth: required
  - Request body: { email }
  - Responses:
    - 200: user object
    - 400: { error }

- GET /users/get-by-id
  - Description: Retrieve user by id.
  - Auth: required
  - Request body: { id }
  - Responses:
    - 200: user object
    - 400: { error }


Warnings routes (mounted at `/warnings` in intent — currently mounted as `/warnings]`)

- POST /warnings/create
  - Description: Create a warning.
  - Auth: required
  - Request body: { status (optional, default: "pending"), message }
  - Responses:
    - 201: created warning object
    - 400: { error }
    - 500: { error }

- PATCH /warnings/update
  - Description: Update warning by id.
  - Auth: required
  - Request params: (controller expects id in request params: route defined uses `req.params.id`)
  - Request body: item_info (fields to update)
  - Responses:
    - 200: updated warning object
    - 400/500: { error }

- DELETE /warnings/delete
  - Description: Delete warning by id (expects `req.params.id`).
  - Auth: required
  - Responses:
    - 200: deleted warning object

- GET /warnings/get-by-id
  - Description: Get a warning by id (expects `req.params.id`).
  - Auth: required
  - Responses:
    - 200: warning object


Warning-sent-logs routes (mounted at `/warnings_logs`)

- GET /warnings_logs/get-all
  - Description: Get all warning-sent logs.
  - Auth: required
  - Responses:
    - 200: array of logs

- POST /warnings_logs/create
  - Description: Create a warning-sent log.
  - Auth: required
  - Request body: { user_id, warningId, channel, sent_at }
  - Responses:
    - 201: created log object
    - 400: { error }

- PATCH /warnings_logs/get-by-id
  - Description: In routes this is wired to read `warning_id` from req.params and return logs by warning id (controller function named `get_waning_by_warning_id`).
  - Auth: required
  - Route expects a path param `warning_id` (controller reads `req.params.warning_id`). Currently the route is defined as `router_warning_sent_logs.patch('/get-by-id', ...)` so there's a mismatch: either the route should be `/get-by-id/:warning_id` or the controller should use req.body. Please fix if needed.
  - Responses:
    - 200: logs for that warning id


Notes and recommendations

- Route mounting bug in `back-end/index.js`:
  - Current line: `app.use("/warnings]", router_warning);` — this typo prevents warnings routes from being reachable at `/warnings`.
  - Fix to: `app.use("/warnings", router_warning);`

- Route/Controller mismatches to review:
  - `POST /auth/login` currently applies the `auth` middleware in `src/routes/auth/index.js` (`auth_router.post('/login', auth, login);`). Typically login should not require auth.
  - Several controllers expect IDs in params (e.g. warnings controller uses `req.params.id`) but routes are defined without path params (e.g. `router_warning.get('/get-by-id', auth, get_by_id_warning);`). Update routes to include `/:id` where appropriate.
  - `warning-sent-logs` route `/get-by-id` is defined without `/:warning_id`. Controller expects `req.params.warning_id`.
  - Many user routes read IDs from request body; consider using RESTful path params (GET /users/:id) for clarity.

- Authentication: middleware `auth` expects `Authorization: Bearer <token>` header or cookie token (middleware currently checks header). If you plan to use cookies, update middleware to check `req.cookies.token`.

---

If you want, I can:
- Apply the small fixes automatically (fix warnings mount, add `/:id` params to routes where controllers expect them, and remove `auth` from /auth/login), or
- Generate an OpenAPI (Swagger) spec from these endpoints.

Which next step do you want? (apply fixes / generate OpenAPI / nothing)