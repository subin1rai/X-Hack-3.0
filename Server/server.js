import http from "http";
import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/db.js";
import ngrok from "ngrok";

const startNgrok = async (port) => {
  try {
    const url = await ngrok.connect({
      addr: port,
      authtoken: config.ngrokAuthToken,
      region: 'in', 
      proto: 'http',
      onStatusChange: (status) => {
        // console.log(`Ngrok Status: ${status}`);
      },
      onLogEvent: (log) => {
        // console.log(`Ngrok Log: ${log}`);
      }
    });
    return url;
  } catch (error) {
    console.error('Ngrok connection error:', error);
    throw error;
  }
};

const startServer = async () => {
  try {
    await connectDB();
    const port = config.port || 3000;
    const server = http.createServer(app);

    server.listen(port, async () => {
      console.log(`✅ Server running on port: ${port}`);
      console.log(`🌐 Local: http://localhost:${port}`);
      
      try {
        const ngrokUrl = await startNgrok(port);
        console.log(`🚀 Ngrok URL: ${ngrokUrl}`);
      } catch (error) {
        console.error('Failed to start ngrok:', error);
      }
    });

  } catch (error) {
    console.error(`Server error: ${error.message}`);
    process.exit(1);
  }
};

const cleanup = async () => {
  await ngrok.kill();
  process.exit(0);
};

process.on("SIGTERM", cleanup);
process.on("SIGINT", cleanup);

startServer();