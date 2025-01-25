import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/sellerRoutes.js";
import farmerRouter from "./routes/farmerRouter.js";
import plantRouter from "./routes/plantRouter.js";
import plantRequestRouter from "./routes/plantRequestRouter.js";
import blogRouter from "./routes/blogRouter.js";

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "ngrok-skip-browser-warning",
  ],
};

const app = express();

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Let's hack the hackathon..." });
});

app.use("/api", userRouter);  
app.use("/api/farmers", farmerRouter);
app.use("/api/plants", plantRouter);
app.use("/api/plantsrequest", plantRequestRouter);
app.use("/api/blogs", blogRouter);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export default app;
