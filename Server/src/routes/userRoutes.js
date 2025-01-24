import express from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
  updateUserStatus,
} from "../controllers/userController.js";
import upload from "../middlewares/multerConfig.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", upload.single("kycImage"), registerUser);
router.post("/login", loginUser);
router.get("/users", authMiddleware, getAllUsers);
router.patch("/update-status/:userId", authMiddleware, updateUserStatus);

export default router;
