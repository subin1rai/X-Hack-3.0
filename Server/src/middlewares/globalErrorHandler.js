import { HttpError } from "http-errors";
import config from "../config/config.js";

const createErrorResponse = (statusCode, errorMessage, errorStack) => ({
  StatusCode: statusCode,
  IsSuccess: false,
  ErrorMessage: [
    {
      message: errorMessage,
      errorStack: errorStack,
    },
  ],
  Result: null,
});

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err instanceof HttpError ? err.statusCode : 500;
  const errorMessage = err.message;
  const errorStack = config.env === "development" ? err.stack : "";

  res
    .status(statusCode)
    .json(createErrorResponse(statusCode, errorMessage, errorStack));
};

export default globalErrorHandler;
