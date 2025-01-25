import Seller from "../models/sellerModel.js";
import Farmer from "../models/FarmerModel.js";
import bcrypt from "bcrypt";
import cloudinary from "../config/coludinary.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

export const registerSeller = async (req, res) => {
  const { name, email, password, kycImage, businessName, phone, address } =
    req.body;

  try {
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({
        StatusCode: 400,
        IsSuccess: false,
        ErrorMessage: [{ message: "Seller already exists with this email." }],
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

    const newSeller = new Seller({
      name,
      email,
      password: hashedPassword,
      kycImage: uploadedImageUrl,
      businessName,
      phone,
      address,
      isVerified: false,
      status: "pending",
    });

    await newSeller.save();

    res.status(201).json({
      StatusCode: 201,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Seller registered successfully",
        seller: {
          id: newSeller._id,
          name: newSeller.name,
          email: newSeller.email,
          businessName: newSeller.businessName,
          kycImage: newSeller.kycImage,
          phone: newSeller.phone,
          address: newSeller.address,
          isVerified: newSeller.isVerified,
          status: newSeller.status,
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
        { message: "Internal Server Error while registering seller." },
      ],
      Result: null,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await Seller.findOne({ email });
    if (seller && (await bcrypt.compare(password, seller.password))) {
      const token = jwt.sign(
        {
          id: seller._id,
          role: "seller",
        },
        config.jwtSecret,
        { expiresIn: "24h" }
      );

      return res.status(200).json({
        StatusCode: 200,
        IsSuccess: true,
        ErrorMessage: [],
        Result: {
          message: "Login successful",
          token,
          user: {
            id: seller._id,
            name: seller.name,
            email: seller.email,
            businessName: seller.businessName,
            role: seller.role,
            kycImage: seller.kycImage,
            isVerified: seller.isVerified,
            status: seller.status,
            phone: seller.phone,
            address: seller.address,
          },
        },
      });
    }

    const farmer = await Farmer.findOne({ email });
    if (farmer && (await bcrypt.compare(password, farmer.password))) {
      const token = jwt.sign(
        {
          id: farmer._id,
          role: "farmer",
        },
        config.jwtSecret,
        { expiresIn: "24h" }
      );

      return res.status(200).json({
        StatusCode: 200,
        IsSuccess: true,
        ErrorMessage: [],
        Result: {
          message: "Login successful",
          token,
          user: {
            id: farmer._id,
            name: farmer.name,
            email: farmer.email,
            role: farmer.role,
            kycImage: farmer.licenseImage,
            isVerified: farmer.isVerified,
            status: farmer.status,
            phone: farmer.phone,
            address: farmer.address,
          },
        },
      });
    }

    return res.status(401).json({
      StatusCode: 401,
      IsSuccess: false,
      ErrorMessage: [{ message: "Invalid email or password" }],
      Result: null,
    });
  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: "Internal server error during login" }],
      Result: null,
    });
  }
};

export const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find({}).select("-password");
    const verified = sellers.filter((s) => s.isVerified);
    const unverified = sellers.filter((s) => !s.isVerified);

    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        allSellers: sellers,
        verifiedSellers: verified,
        unverifiedSellers: unverified,
      },
    });
  } catch (error) {
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: "Error fetching sellers" }],
      Result: null,
    });
  }
};

export const updateSellerStatus = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.sellerId);
    if (!seller) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: [{ message: "Seller not found" }],
        Result: null,
      });
    }

    seller.status = req.body.status;
    if (req.body.status === "approved") seller.isVerified = true;
    await seller.save();

    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Status updated successfully",
        seller: {
          id: seller._id,
          name: seller.name,
          email: seller.email,
          status: seller.status,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: "Error updating status" }],
      Result: null,
    });
  }
};
