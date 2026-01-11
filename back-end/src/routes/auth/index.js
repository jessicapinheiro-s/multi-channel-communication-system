import { Router } from "express";
import { login, register, logout, me } from "../../controllers/auth/index.js";
import { auth } from "../../middlewares/auth.js";

const auth_router = Router();

auth_router.post("/login", login);
auth_router.post("/logout", auth, logout);
auth_router.post("/register", auth, register);
auth_router.get("/me", auth, me);

export default auth_router;
