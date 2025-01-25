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
      farmerId: decoded.role === "farmer" ? decoded.id : null,
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

export const farmerOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "farmer") {
    return res.status(403).json({
      StatusCode: 403,
      IsSuccess: false,
      ErrorMessage: [
        {
          message:
            "Access restricted to farmers only. Your current role is not authorized.",
        },
      ],
      Result: null,
    });
  }
  next();
};

export const sellerOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "seller") {
    return res.status(403).json({
      StatusCode: 403,
      IsSuccess: false,
      ErrorMessage: [
        {
          message:
            "Access restricted to sellers only. Your current role is not authorized.",
        },
      ],
      Result: null,
    });
  }
  next();
};
