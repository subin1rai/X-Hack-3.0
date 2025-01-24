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
