import express from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import upload from "../middlewares/multerConfig.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", upload.single("kycImage"), registerUser);
router.post("/login", loginUser);
router.get("/users", authMiddleware, getAllUsers);

export default router;
