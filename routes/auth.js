import { Router } from "express";
import { register } from "../controllers/auth";

const authRoutes = Router();

authRoutes.post("/register", register);

export { authRoutes };
