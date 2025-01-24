import User from "../models/SellerModel.js";
import bcrypt from "bcrypt";
import cloudinary from "../config/coludinary.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password, kycImage } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        StatusCode: 400,
        IsSuccess: false,
        ErrorMessage: [{ message: "User already exists with this email." }],
        Result: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let uploadedImageUrl = kycImage;

    if (req.file) {
      const imageResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "kyc_images",
        public_id: `kyc_${Date.now()}`,
        resource_type: "image",
      });
      uploadedImageUrl = imageResult.secure_url;
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      kycImage: uploadedImageUrl,
      isVerified: false,
      status: "pending",
    });

    await newUser.save();

    res.status(201).json({
      StatusCode: 201,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "User registered successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          kycImage: newUser.kycImage,
          isVerified: newUser.isVerified,
          status: newUser.status,
        },
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => ({
        message: err.message,
      }));

      return res.status(400).json({
        StatusCode: 400,
        IsSuccess: false,
        ErrorMessage: messages,
        Result: null,
      });
    }

    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [
        { message: "Internal Server Error while registering user." },
      ],
      Result: null,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        StatusCode: 401,
        IsSuccess: false,
        ErrorMessage: [{ message: "Invalid email or password" }],
        Result: null,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        StatusCode: 401,
        IsSuccess: false,
        ErrorMessage: [{ message: "Invalid email or password" }],
        Result: null,
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      config.jwtSecret,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          kycImage: user.kycImage,
          isVerified: user.isVerified,
          status: user.status,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: "Internal server error during login" }],
      Result: null,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    const verifiedUsers = users.filter((u) => u.isVerified);
    const unverifiedUsers = users.filter((u) => !u.isVerified);

    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        allUsers: users,
        verifiedUsers,
        unverifiedUsers,
      },
    });
  } catch (error) {
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: "Error fetching users" }],
      Result: null,
    });
  }
};

export const updateUserStatus = async (req, res) => {
  const { userId } = req.params;
  const { status } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: [{ message: "User not found" }],
        Result: null,
      });
    }

    user.status = status;
    if (status === "approved") {
      user.isVerified = true;
    }
    await user.save();

    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Status updated successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          status: user.status,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: "Error updating status" }],
      Result: null,
    });
  }
};
