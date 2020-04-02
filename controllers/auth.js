import { ErrorResponse } from "../utils/errorResponse";
import { asyncHandler } from "../middleware/async";
import { UserModel } from "../models/User";

// @desc      Register a user
// @route     Post /api/v1/auth/register
// @access    Public
export const register = asyncHandler(async function(req, res, next) {
  res.status(200).json({
    success: true
  });
});
