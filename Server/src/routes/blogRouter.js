import express from "express";
import { authMiddleware, farmerOnly } from "../middlewares/authMiddleware.js";
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
  authMiddleware,
  farmerOnly,
  upload.array("images", 5),
  createBlog
);
blogRouter.get("/", authMiddleware, farmerOnly, getAllBlogs);
blogRouter.get("/:blogId", authMiddleware, farmerOnly, getBlogById);
blogRouter.post("/:blogId/comments", authMiddleware, farmerOnly, addComment);

export default blogRouter;
