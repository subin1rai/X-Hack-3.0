import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerConfig.js";
import {
  addPlant,
  updatePlant,
  deletePlant,
  getFarmerPlants,
  getPlantDetails,
  getAllPlants,
} from "../controllers/plantController.js";

const plantRouter = express.Router();

plantRouter.post(
  "/add",
  authenticateToken,
  upload.array("images", 5),
  addPlant
);
plantRouter.put(
  "/:plantId",
  authenticateToken,
  upload.array("images", 5),
  updatePlant
);
plantRouter.delete("/:plantId", authenticateToken, deletePlant);
plantRouter.get("/farmer-plants", authenticateToken, getFarmerPlants);
plantRouter.get("/getAllPlants", authenticateToken, getAllPlants);
plantRouter.get("/:plantId", getPlantDetails);

export default plantRouter;
