const userService = require("../services/user.service");
const mongoose = require("mongoose");

const createUser = async (req, res) => {
  const { name, email, password, age } = req.body;

  if (!name || !email || !password || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await userService.createUser({
    name,
    email,
    password,
    age,
  });

  res.status(201).json({ message: "User created successfully", data: user });
};

const getAllUsers = async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = Number(page);
  limit = Number(limit);

  const { users, total } = await userService.getAllUsers(page, limit);

  res.json({
    message: "Users fetched successfully",
    data: users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User fetched successfully", data: user });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const updatedUser = await userService.updateUser(id, { name, email, age });

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User updated successfully", data: updatedUser });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const deletedUser = await userService.deleteUser(id);

  if (!deletedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User deleted successfully" });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
