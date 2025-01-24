import dotenv from "dotenv";
dotenv.config();

const _config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.MONGO_URI,
  env: process.env.NODE_ENV,
  ngrokAuthToken: process.env.NGROK_AUTH_TOKEN,
  cloudinaryCloud: process.env.CLOUDINARY_CLOUD,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinarySecret: process.env.CLOUDINARY_API_SECRET,
};

export default Object.freeze(_config);
