import mongoose from "mongoose";

const plantSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer",
      required: [true, "Farmer ID is required"],
    },
    name: {
      type: String,
      required: [true, "Plant name is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    deliveryTime: {
      type: Date,
      required: [true, "Delivery time is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["vegetable", "fruit", "grain", "other"],
        message: "{VALUE} is not a valid category",
      },
      lowercase: true,
    },
    harvestDate: {
      type: Date,
      required: [true, "Harvest date is required"],
    },
    shelfLife: {
      type: Number,
      required: [true, "Shelf life is required"],
    },
    images: [
      {
        type: String,
        required: [true, "At least one image is required"],
      },
    ],
  },
  { timestamps: true }
);

const Plant = mongoose.model("Plant", plantSchema);
export default Plant;
