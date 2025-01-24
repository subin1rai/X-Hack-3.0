import http from "http";
import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/db.js";

const startServer = async () => {
  try {
    await connectDB();

    const port = config.port || 3000;
    const server = http.createServer(app);

    server.listen(port, () => {
      console.log(`✅ Server is running on port: ${port}`);
      console.log(`🌐 Click to open: http://localhost:${port}`);
    });
  } catch (error) {
    console.error(`❌ Error starting the server: ${error.message}`);
  }
};

startServer();
