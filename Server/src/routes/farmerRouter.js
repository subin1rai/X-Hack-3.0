import express from "express";
import {
  getAllFarmers,
  registerFarmer,
} from "../controllers/farmerController.js";
import upload from "../middlewares/multerConfig.js";
import { authenticateToken, isAdmin } from "../middlewares/authMiddleware.js";

const farmerRouter = express.Router();

farmerRouter.post("/register", upload.single("licenseImage"), registerFarmer);
farmerRouter.get("/farmers", authenticateToken, getAllFarmers);

export default farmerRouter;
