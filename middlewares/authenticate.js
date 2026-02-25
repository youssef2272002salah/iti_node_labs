const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const APIError = require("../utils/APIError");

const authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new APIError("Authorization header missing or invalid", 401);
    }

    const token = authHeader.slice(7); // Remove "Bearer " prefix
    //TODO:
    // Verify token using promisify
    const verifyAsync = promisify(jwt.verify);
    const decoded = await verifyAsync(token, process.env.JWT_SECRET);

    // Attach user information to request object
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      throw new APIError("Invalid or expired token", 401);
    }
    throw error;
  }
};

module.exports = authenticate;
