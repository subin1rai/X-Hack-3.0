import Farmer from "../models/FarmerModel.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const registerFarmer = async (req, res) => {
  const {
    fullName,
    email,
    password,
    phone,
    address,
    farmSize,
    farmName,
    agriculturalLicenseNumber,
    primaryCrops,
    licenseImage,
  } = req.body;

  try {
    const existingFarmer = await Farmer.findOne({ email });
    if (existingFarmer) {
      return res.status(400).json({
        StatusCode: 400,
        IsSuccess: false,
        ErrorMessage: "Farmer already exists with this email.",
        Result: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let uploadedImageUrl = licenseImage;
    if (req.file) {
      const imageResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "license_images",
        public_id: `license_${Date.now()}`,
        resource_type: "image",
      });
      uploadedImageUrl = imageResult.secure_url;
    }

    const newFarmer = new Farmer({
      fullName,
      email,
      password: hashedPassword,
      phone,
      address,
      farmSize,
      farmName,
      agriculturalLicenseNumber,
      primaryCrops,
      licenseImage: uploadedImageUrl,
      isVerified: false,
      status: "pending",
    });

    await newFarmer.save();

    res.status(201).json({
      StatusCode: 201,
      IsSuccess: true,
      ErrorMessage: null,
      Result: {
        message: "Farmer registered successfully",
        farmerId: newFarmer._id,
        isVerified: false,
        status: newFarmer.status,
      },
    });
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        StatusCode: 400,
        IsSuccess: false,
        ErrorMessage: `An entry with the same ${field} already exists.`,
        Result: null,
      });
    } else {
      console.error("Error registering farmer:", error);
      res.status(500).json({
        StatusCode: 500,
        IsSuccess: false,
        ErrorMessage: "Internal server error during registration.",
        Result: null,
      });
    }
  }
};

export const loginFarmer = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      StatusCode: 400,
      IsSuccess: false,
      ErrorMessage: "Email and password are required.",
      Result: null,
    });
  }

  try {
    const farmer = await Farmer.findOne({ email });
    if (!farmer) {
      return res.status(401).json({
        StatusCode: 401,
        IsSuccess: false,
        ErrorMessage: "Invalid email or password",
        Result: null,
      });
    }

    // Ensure that the password field in the database is not null or undefined
    if (!farmer.password) {
      return res.status(401).json({
        StatusCode: 401,
        IsSuccess: false,
        ErrorMessage: "Authentication failed. No password set for this user.",
        Result: null,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, farmer.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        StatusCode: 401,
        IsSuccess: false,
        ErrorMessage: "Invalid email or password",
        Result: null,
      });
    }

    const token = jwt.sign(
      { farmerId: farmer._id, role: farmer.role },
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
        farmer: {
          id: farmer._id,
          name: farmer.fullName,
          email: farmer.email,
          role: farmer.role,
          farmName: farmer.farmName,
          isVerified: farmer.isVerified,
          status: farmer.status,
        },
      },
    });
  } catch (error) {
    console.error("Error during farmer login:", error);
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Internal server error during login",
      Result: null,
    });
  }
};
