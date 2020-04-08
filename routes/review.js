import { Router } from "express";
import { ReviewModel } from "../models/Review";
import { advancedResults } from "../middleware/advancedResults";
import {
  getReviews,
  addReview,
  getReview,
  updateReview,
  deleteReview,
} from "../controllers/reviews";
import { protect, authorize } from "../middleware/auth";

const reviewRoutes = Router({ mergeParams: true });

reviewRoutes
  .route("/")
  .get(
    advancedResults(ReviewModel, {
      path: "bootcamp",
      select: "name description",
    }),
    getReviews
  )
  .post(protect, authorize("user", "admin"), addReview);

reviewRoutes
  .route("/:id")
  .get(getReview)
  .put(protect, authorize("user", "admin"), updateReview)
  .delete(protect, authorize("user", "admin"), deleteReview);

export { reviewRoutes };
