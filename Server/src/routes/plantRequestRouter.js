import express from "express";
import {
  authenticateToken,
  isFarmer,
  isSeller,
} from "../middlewares/authMiddleware.js";
import {
  createPlantRequest,
  getFarmerSellerRequests,
  sellerRequest,
} from "../controllers/plantRequestController.js";

const plantRequestRouter = express.Router();

plantRequestRouter.post(
  "/create/:plantId",
  authenticateToken,
  isSeller,
  createPlantRequest
);
plantRequestRouter.get(
  "/seller-requests",
  authenticateToken,
  isSeller,
  sellerRequest
);

plantRequestRouter.get(
  "/farmer/seller-requests",
  authenticateToken,
  isFarmer,
  getFarmerSellerRequests
);

export default plantRequestRouter;
