import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerConfig.js";
import {
  addPlant,
  updatePlant,
  deletePlant,
  getFarmerPlants,
  getPlantDetails,
} from "../controllers/plantController.js";

const plantRouter = express.Router();

plantRouter.post("/add", authMiddleware, upload.array("images", 5), addPlant);
plantRouter.put(
  "/:plantId",
  authMiddleware,
  upload.array("images", 5),
  updatePlant
);
plantRouter.delete("/:plantId", authMiddleware, deletePlant);
plantRouter.get("/farmer-plants", authMiddleware, getFarmerPlants);
plantRouter.get("/:plantId", getPlantDetails);

export default plantRouter;
