import jwt from "jsonwebtoken";
import config from "../config/config.js";
import farmerModel from "../models/FarmerModel.js";
import sellerModel from "../models/SellerModel.js";

const authenticateToken = (req, res, next) => {
  const accessToken = req.headers["authorization"];
  if (!accessToken) {
    return res.status(401).json({
      StatusCode: 401,
      IsSuccess: false,
      ErrorMessage: [{ message: "Access Token Not Found" }],
      Result: null,
    });
  }

  const token = accessToken.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      StatusCode: 401,
      IsSuccess: false,
      ErrorMessage: [{ message: "Token is not valid" }],
      Result: null,
    });
  }

  try {
    const verified = jwt.verify(token, config.jwtSecret);
    req.user = verified;

    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (verified.exp < currentTimestamp) {
      return res.status(401).json({
        StatusCode: 401,
        IsSuccess: false,
        ErrorMessage: [{ message: "Token has expired" }],
        Result: null,
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: "Invalid Token" }],
      Result: null,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await farmerModel.findById(req.user.sub);
    if (!user || user.role !== "admin") {
      return res.status(403).json({
        StatusCode: 403,
        IsSuccess: false,
        ErrorMessage: [{ message: "You are not admin." }],
        Result: null,
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: "Server Error" }],
      Result: null,
    });
  }
};

const verifyUserId = (req, res, next) => {
  const userId = req.params.id;
  if (req.user.sub !== userId) {
    return res.status(403).json({
      StatusCode: 403,
      IsSuccess: false,
      ErrorMessage: [{ message: "Access Denied. User ID does not match." }],
      Result: null,
    });
  }
  next();
};

const isFarmer = async (req, res, next) => {
  try {
    const user = await farmerModel.findById(req.user.sub);
    if (!user || user.role !== "farmer") {
      return res.status(403).json({
        StatusCode: 403,
        IsSuccess: false,
        ErrorMessage: [{ message: "Access Denied" }],
        Result: null,
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: "Server Error" }],
      Result: null,
    });
  }
};

const isSeller = async (req, res, next) => {
  try {
    const user = await sellerModel.findById(req.user.sub);
    if (!user || user.role !== "seller") {
      return res.status(403).json({
        StatusCode: 403,
        IsSuccess: false,
        ErrorMessage: [{ message: "Access Denied" }],
        Result: null,
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: "Server Error" }],
      Result: null,
    });
  }
};

export const generateAccessToken = (userId) => {
  return jwt.sign({ sub: userId }, config.jwtSecret, { expiresIn: "30m" });
};

export { authenticateToken, isAdmin, isFarmer, verifyUserId, isSeller };
