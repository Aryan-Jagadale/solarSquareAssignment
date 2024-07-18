import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new ErrorHandler("Not Logged In", 401));
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id);

  next();
});



export const authorizeAdmin = catchAsyncError(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new ErrorHandler(
        `${req.user.name} is not allowed to access this resource`,
        403
      )
    );
  }

  next();
});
