import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import upload from "../middlewares/multerConfig.js";

const router = express.Router();

router.post("/register", upload.single("kycImage"), registerUser);
router.post("/login", loginUser);

export default router;
