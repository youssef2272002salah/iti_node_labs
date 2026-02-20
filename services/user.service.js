const User = require("../models/user.model");

const createUser = async (userData) => {
  return await User.create(userData);
};

const getAllUsers = async (page, limit) => {
  const skip = (page - 1) * limit;
  const users = await User.find({}, { password: 0 }).skip(skip).limit(limit);
  const total = await User.countDocuments();
  return { users, total };
};

const getUserById = async (id) => {
  return await User.findOne({ _id: id }, { password: 0 });
};

const updateUser = async (id, userData) => {
  return await User.findOneAndUpdate({ _id: id }, userData, { new: true });
};

const deleteUser = async (id) => {
  return await User.findOneAndDelete({ _id: id });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
