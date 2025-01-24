import express from "express";
import { registerUser } from "../controllers/userController.js";
import upload from "../middlewares/multerConfig.js";

const router = express.Router();

router.post("/register", upload.single("kycImage"), registerUser);

export default router;
