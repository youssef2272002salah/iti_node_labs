const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const APIError = require("../utils/APIError");

// Sign up a new user
const signUp = async (userData) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new APIError("User with this email already exists", 400);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 12);

  // Create user with hashed password
  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });

  return user;
};

// Sign in a user
const signIn = async (email, password) => {
  // Find user by email
  const user = await User.findOne({ email });

  // Check if user exists and password is correct
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new APIError("Invalid email or password", 401);
  }
  //TODO:
  // Generate JWT token using promisify
  const signAsync = promisify(jwt.sign);
  const token = await signAsync(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  // Return token and user data (without password)
  const userObject = user.toObject();
  delete userObject.password;

  return {
    token,
    user: userObject,
  };
};

// Get all users with pagination
const getAllUsers = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  const users = await User.find({}, { password: 0 }).skip(skip).limit(limit);
  const total = await User.countDocuments();

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// Get user by ID
const getUserById = async (id) => {
  return await User.findById(id, { password: 0 });
};

// Update user by ID
const updateUserById = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  });
};

// Delete user by ID
const deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  signUp,
  signIn,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
