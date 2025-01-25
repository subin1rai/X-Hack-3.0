import express from "express";
import {
  getAllFarmers,
  loginFarmer,
  registerFarmer,
  updateFarmerStatus,
} from "../controllers/farmerController.js";
import upload from "../middlewares/multerConfig.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const farmerRouter = express.Router();

farmerRouter.post("/register", upload.single("licenseImage"), registerFarmer);
farmerRouter.post("/login", loginFarmer);
farmerRouter.get("/farmers", authenticateToken, getAllFarmers);
farmerRouter.patch(
  "/update-status/:farmerId",
  authenticateToken,
  updateFarmerStatus
);

export default farmerRouter;
