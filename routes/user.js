import { Router } from "express";
import { UserModel } from "../models/User";
import { advancedResults } from "../middleware/advancedResults";
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user";
import { protect, authorize } from "../middleware/auth";

const userRoutes = Router({ mergeParams: true });

userRoutes.use(protect);
userRoutes.use(authorize("admin"));

userRoutes
  .route("/")
  .get(advancedResults(UserModel), getUsers)
  .post(createUser);

userRoutes
  .route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export { userRoutes };
