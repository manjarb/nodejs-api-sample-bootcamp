import { Router } from "express";
import {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  logout,
} from "../controllers/auth";
import { protect } from "../middleware/auth";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/logout", logout);
authRoutes.get("/me", protect, getMe);
authRoutes.put("/updatedetails", protect, updateDetails);
authRoutes.put("/updatepassword", protect, updatePassword);
authRoutes.post("/forgotpassword", forgotPassword);
authRoutes.put("/resetpassword/:resettoken", resetPassword);

export { authRoutes };
