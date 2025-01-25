import express from "express";
import {
  authenticateToken,
  isFarmer,
  isSeller,
} from "../middlewares/authMiddleware.js";
import {
  getFarmerDashboard,
  getSellerDashboard,
} from "../controllers/dashboardController.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/farmer", authenticateToken, isFarmer, getFarmerDashboard);
dashboardRouter.get("/seller", authenticateToken, isSeller, getSellerDashboard);

export default dashboardRouter;
