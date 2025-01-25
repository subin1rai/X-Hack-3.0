import express from "express";
import {
  getAllSellers,
  login,
  registerSeller,
  updateSellerStatus,
} from "../controllers/sellerController.js";
import upload from "../middlewares/multerConfig.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", upload.single("kycImage"), registerSeller);
router.post("/login", login);
router.get("/sellers", authMiddleware, getAllSellers);
router.patch("/update-status/:sellerId", authMiddleware, updateSellerStatus);

export default router;
