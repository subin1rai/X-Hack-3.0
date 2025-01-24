import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "This email is already registered"],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\+?[\d\s]{3,}$/, "Please provide a valid phone number"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    farmSize: {
      type: Number,
      required: [true, "Farm size in acres is required"],
    },
    farmName: {
      type: String,
      required: [true, "Farm name is required"],
    },
    agriculturalLicenseNumber: {
      type: String,
      required: [true, "Agricultural license number is required"],
      unique: [true, "This license number is already registered"],
    },
    primaryCrops: {
      type: [String],
      required: [true, "At least one primary crop is required"],
      validate: [arrayLimit, "Specify at least one primary crop"],
    },
    licenseImage: {
      type: String,
      required: [true, "Agricultural license image is required"],
    },
    role: {
      type: String,
      enum: ["admin", "farmer", "seller"],
      default: "farmer",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

function arrayLimit(val) {
  return val.length > 0;
}

const Farmer = mongoose.model("Farmer", farmerSchema);
export default Farmer;
