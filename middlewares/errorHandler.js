const APIError = require("../utils/APIError");

module.exports = (err, req, res, next) => {
  // Handle APIError instances
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      message: err.message,
      success: false,
      isClientError: err.isClientError,
    });
  }

  // Handle MongoDB CastError (invalid ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json({
      message: `Invalid ${err.path}: ${err.value}`,
      success: false,
      isClientError: true,
    });
  }

  // Handle MongoDB duplicate key error
  if (err.name === "MongoServerError" && err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      message: `${field} already exists`,
      success: false,
      isClientError: true,
    });
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      message: messages.join(", "),
      success: false,
      isClientError: true,
    });
  }

  // Handle unexpected errors
  console.error("Unexpected Error:", err);
  return res.status(500).json({
    message: "Internal Server Error",
    success: false,
    isClientError: false,
  });
};
