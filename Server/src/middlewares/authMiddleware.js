// authMiddleware.js
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        StatusCode: 401,
        IsSuccess: false,
        ErrorMessage: [{ message: "Authorization token required" }],
        Result: null,
      });
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // Store complete decoded token

    next();
  } catch (error) {
    return res.status(401).json({
      StatusCode: 401,
      IsSuccess: false,
      ErrorMessage: [{ message: "Invalid token" }],
      Result: null,
    });
  }
};

// Middleware for role checks
export const checkRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({
      StatusCode: 403,
      IsSuccess: false,
      ErrorMessage: [{ message: `Access denied` }],
      Result: null,
    });
  }
  next();
};

export const sellerOnly = checkRole("seller");
export const farmerOnly = checkRole("farmer");
