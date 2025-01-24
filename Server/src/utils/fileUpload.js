import path from "path";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (
  filePath,
  folder,
  publicId,
  format
) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      public_id: publicId,
      format: format,
    });
    return result.secure_url;
  } catch (error) {
    throw new Error(`Error uploading to Cloudinary: ${error.message}`);
  }
};

const getFilePath = (filename) => {
  return path.resolve(__dirname, "../../public/data/uploads", filename);
};

export { uploadToCloudinary, getFilePath };
