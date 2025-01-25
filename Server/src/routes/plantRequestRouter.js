import express from "express";
import { authMiddleware, sellerOnly } from "../middlewares/authMiddleware.js";
import {
  createPlantRequest,
  sellerRequest,
} from "../controllers/plantRequestController.js";

const plantRequestRouter = express.Router();

plantRequestRouter.post(
  "/create/:plantId",
  authMiddleware,
  sellerOnly,
  createPlantRequest
);
plantRequestRouter.get(
  "/seller-requests",
  authMiddleware,
  sellerOnly,
  sellerRequest
);

export default plantRequestRouter;
