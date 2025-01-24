import http from "http";
import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/db.js";

const startServer = async () => {
  try {
    await connectDB();
    const server = http.createServer(app);

    server.listen(config.port, async () => {
      console.log(`✅ Server: http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

startServer();
