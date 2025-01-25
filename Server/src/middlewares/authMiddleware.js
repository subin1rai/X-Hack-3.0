import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        StatusCode: 401,
        IsSuccess: false,
        ErrorMessage: "Authorization header is missing",
        Result: null,
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        StatusCode: 401,
        IsSuccess: false,
        ErrorMessage: "No token provided",
        Result: null,
      });
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = {
      id: decoded.farmerId || decoded.id,
      role: decoded.role,
      sellerId: decoded.role === "seller" ? decoded.id : null,
    };

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).json({
      StatusCode: 401,
      IsSuccess: false,
      ErrorMessage: "Invalid token",
      Result: null,
    });
  }
};

export const sellerOnly = (req, res, next) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({
      StatusCode: 403,
      IsSuccess: false,
      ErrorMessage: "Access restricted to sellers only",
      Result: null,
    });
  }
  next();
};
