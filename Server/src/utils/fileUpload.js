import path from "path";
import { promises as fs } from "fs";
import { uploader } from "../config/coludinary.js";

const uploadToCloudinary = async (filePath, folder, filename, format) => {
  try {
    const resourceType = format === "pdf" ? "raw" : "image";
    const result = await uploader.upload(filePath, {
      folder,
      public_id: filename,
      resource_type: resourceType,
    });
    await fs.unlink(filePath);
    return result.secure_url;
  } catch (error) {
    await fs.unlink(filePath);
    throw error;
  }
};

const getFilePath = (filename) => {
  return path.resolve(__dirname, "../../public/data/uploads", filename);
};

export { uploadToCloudinary, getFilePath };
