const express = require("express");
const userController = require("../controllers/user.controller");
const schemas = require("../schemas");
const validate = require("../middlewares/validate");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.post(
  "/",
  validate(schemas.users.createUserSchema),
  asyncHandler(userController.createUser),
);
router.get(
  "/",
  validate(schemas.users.getAllUsersSchema),
  asyncHandler(userController.getAllUsers),
);
router.get("/:id", asyncHandler(userController.getUserById));
router.patch(
  "/:id",
  validate(schemas.users.updateUserSchema),
  asyncHandler(userController.updateUserById),
);
router.delete("/:id", asyncHandler(userController.deleteUserById));

module.exports = router;
