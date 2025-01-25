import mongoose from "mongoose";
const { Schema, model } = mongoose;

const plantRequestSchema = new Schema(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    plantId: {
      type: Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
    requestedPrice: {
      type: Number,
      required: true,
    },
    deliveryLocation: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
    notes: String,
    isPaymentComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const PlantRequest = model("PlantRequest", plantRequestSchema);
export default PlantRequest;
