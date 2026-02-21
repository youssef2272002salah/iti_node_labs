const userService = require("../services/user.service");
const APIError = require("../utils/APIError");

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json({
    message: "User created successfully",
    success: true,
    data: user,
  });
};

const getAllUsers = async (req, res) => {
  const result = await userService.getAllUsers(req.query);

  res.json({
    message: "Users fetched successfully",
    success: true,
    data: result.users,
    pagination: result.pagination,
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  if (!user) {
    throw new APIError("User not found", 404);
  }

  res.json({
    message: "User fetched successfully",
    success: true,
    data: user,
  });
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await userService.updateUserById(id, req.body);

  if (!updatedUser) {
    throw new APIError("User not found", 404);
  }

  res.json({
    message: "User updated successfully",
    success: true,
    data: updatedUser,
  });
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await userService.deleteUserById(id);

  if (!deletedUser) {
    throw new APIError("User not found", 404);
  }

  res.json({
    message: "User deleted successfully",
    success: true,
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
