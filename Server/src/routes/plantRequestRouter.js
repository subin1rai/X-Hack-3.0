import express from "express";
import { authenticateToken, isSeller } from "../middlewares/authMiddleware.js";
import {
  createPlantRequest,
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

export default plantRequestRouter;
