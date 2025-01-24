import express from "express";
import {
  loginFarmer,
  registerFarmer,
} from "../controllers/farmerController.js";
import upload from "../middlewares/multerConfig.js";

const farmerRouter = express.Router();

farmerRouter.post("/register", upload.single("licenseImage"), registerFarmer);
farmerRouter.post("/login", loginFarmer);

export default farmerRouter;
