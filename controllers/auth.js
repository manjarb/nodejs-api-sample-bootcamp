import { ErrorResponse } from "../utils/errorResponse";
import { asyncHandler } from "../middleware/async";
import { UserModel } from "../models/User";

// @desc      Register a user
// @route     Post /api/v1/auth/register
// @access    Public
export const register = asyncHandler(async function(req, res, next) {
  const { name, email, password, role } = req.body;

  // Create User
  const user = await UserModel.create({
    name,
    email,
    password,
    role,
  });

  // Create Token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @desc      Login user
// @route     Post /api/v1/auth/register
// @access    Public
export const login = asyncHandler(async function(req, res, next) {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for User
  const user = await (await UserModel.findOne({ email })).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password is matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Create Token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
