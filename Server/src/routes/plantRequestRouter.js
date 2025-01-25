import express from "express";
import { authMiddleware, sellerOnly } from "../middlewares/authMiddleware.js";
import { createPlantRequest } from "../controllers/plantRequestController.js";

const plantRequestRouter = express.Router();

plantRequestRouter.post(
  "/create/:plantId",
  authMiddleware,
  sellerOnly,
  createPlantRequest
);

export default plantRequestRouter;
