import Blog from "../models/BlogModel.js";
import cloudinary from "cloudinary";

export const createBlog = async (req, res) => {
  const { title, content, tags, isPublished } = req.body;

  try {
    let imageUrls = [];

    if (req.files) {
      for (const file of req.files) {
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: "blog_images",
        });
        imageUrls.push(uploadResult.secure_url);
      }
    }

    const newBlog = new Blog({
      title,
      content,
      author: req.user.id,
      tags,
      isPublished,
      images: imageUrls,
    });

    await newBlog.save();

    res.status(201).json({
      StatusCode: 201,
      IsSuccess: true,
      ErrorMessage: null,
      Result: {
        message: "Blog created successfully",
        blogId: newBlog._id,
        images: newBlog.images,
      },
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: "Internal server error during blog creation" }],
      Result: null,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate("author", "fullName email")
      .select("-comments");

    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: "Error fetching blogs" }],
      Result: null,
    });
  }
};

export const getBlogById = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId)
      .populate("author", "fullName email")
      .populate("comments.author", "fullName email");

    if (!blog) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: [{ message: "Blog not found" }],
        Result: null,
      });
    }

    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: blog,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: "Error fetching blog" }],
      Result: null,
    });
  }
};

export const addComment = async (req, res) => {
  const { blogId } = req.params;
  const { content } = req.body;

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: [{ message: "Blog not found" }],
        Result: null,
      });
    }

    blog.comments.push({ author: req.user.id, content });
    await blog.save();

    res.status(201).json({
      StatusCode: 201,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Comment added successfully",
        comments: blog.comments,
      },
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: "Error adding comment" }],
      Result: null,
    });
  }
};
