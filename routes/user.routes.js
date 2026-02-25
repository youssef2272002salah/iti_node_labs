const express = require("express");
const userController = require("../controllers/user.controller");
const schemas = require("../schemas");
const validate = require("../middlewares/validate");
const asyncHandler = require("../utils/asyncHandler");
const authenticate = require("../middlewares/authenticate");
const restrictTo = require("../middlewares/restrictTo");

const router = express.Router();

// Public routes
router.post(
  "/sign-up",
  validate(schemas.users.signUpSchema),
  asyncHandler(userController.signUp),
);
router.post(
  "/sign-in",
  validate(schemas.users.signInSchema),
  asyncHandler(userController.signIn),
);

// Protected routes
router.get(
  "/",
  asyncHandler(authenticate),
  restrictTo(["admin"]),
  validate(schemas.users.getAllUsersSchema),
  asyncHandler(userController.getAllUsers),
);
router.get(
  "/:id",
  asyncHandler(authenticate),
  restrictTo(["admin"]),
  asyncHandler(userController.getUserById),
);
router.patch(
  "/:id",
  asyncHandler(authenticate),
  restrictTo(["admin"]),
  validate(schemas.users.updateUserSchema),
  asyncHandler(userController.updateUserById),
);
router.delete(
  "/:id",
  asyncHandler(authenticate),
  restrictTo(["admin"]),
  asyncHandler(userController.deleteUserById),
);

module.exports = router;
