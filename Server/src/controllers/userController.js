import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import cloudinary from "../config/coludinary.js";

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

    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          kycImage: user.kycImage,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: "Internal server error during login" }],
      Result: null,
    });
  }
};
