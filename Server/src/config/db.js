import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("🔗 MongoDB Connection Established");
  });

  mongoose.connection.on("error", (err) => {
    console.error("🚨 MongoDB Connection Error:", err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("⚠️ MongoDB Disconnected");
  });

  try {
    await mongoose.connect(config.databaseUrl);
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
