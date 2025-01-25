import express from "express";
import {
  getAllSellers,
  login,
  registerSeller,
  updateUserStatus,
} from "../controllers/sellerController.js";
import upload from "../middlewares/multerConfig.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { sellerRequestById } from "../controllers/plantRequestController.js";

const router = express.Router();

router.post("/register", upload.single("kycImage"), registerSeller);
router.post("/login", login);
router.get("/sellers", authenticateToken, getAllSellers);
router.get("/seller/:sellerId", authenticateToken, sellerRequestById);
router.patch("/updateUserStatus/:id", authenticateToken, updateUserStatus);

export default router;
