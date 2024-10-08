import { User } from "../model/userSchema.model.js";
import { catchAsyncError } from "./catchAsyncError.middleware.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.adminToken;
  
  if (!token) {
    return next(
      res.status(400).json({
        success: false,
        message: "Admin is not authenticated!",
      })
    );
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
 
  req.user = await User.findById(decoded.id);

  if (req.user.role !== "Admin") {
    return next(
      res.status(400).json({
        success: false,
        message: `${req.user.role} not authorized for this resourses`,
      })
    );
  }
  next();
});

export const isPatientAuthenticated = catchAsyncError(
  async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
      return next(
        res.status(400).json({
          success: false,
          message: "Patient is not authenticated!",
        })
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
      return next(
        res.status(400).json({
          success: false,
          message: `${req.user.role} not authorized for this resourses`,
        })
      );
    }
    next();
  }
);
