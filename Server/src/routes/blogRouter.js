import express from "express";
import { authenticateToken, isFarmer } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerConfig.js";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  addComment,
} from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.post(
  "/create",
  authenticateToken,
  isFarmer,
  upload.array("images", 5),
  createBlog
);
blogRouter.get("/", authenticateToken, isFarmer, getAllBlogs);
blogRouter.get("/:blogId", authenticateToken, isFarmer, getBlogById);
blogRouter.post("/:blogId/comments", authenticateToken, isFarmer, addComment);

export default blogRouter;
