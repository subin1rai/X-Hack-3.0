import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        StatusCode: 401,
        IsSuccess: false,
        ErrorMessage: [{ message: "No token provided" }],
        Result: null,
      });
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      StatusCode: 401,
      IsSuccess: false,
      ErrorMessage: [{ message: "Invalid token" }],
      Result: null,
    });
  }
};
