import { Router } from "express";
import { register, login, getMe, forgotPassword } from "../controllers/auth";
import { protect } from "../middleware/auth";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/me", protect, getMe);
authRoutes.post("/forgotpassword", forgotPassword);

export { authRoutes };
