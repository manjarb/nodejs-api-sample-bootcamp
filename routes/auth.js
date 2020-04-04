import { Router } from "express";
import { register, login, getMe } from "../controllers/auth";
import { protect } from "../middleware/auth";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/me", protect, getMe);

export { authRoutes };
