const User = require("../models/user.model");

// Create a new user
const createUser = async (userData) => {
  return await User.create(userData);
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
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
