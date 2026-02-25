const express = require("express");
const postController = require("../controllers/post.controller");
const schemas = require("../schemas");
const validate = require("../middlewares/validate");
const asyncHandler = require("../utils/asyncHandler");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post(
  "/",
  asyncHandler(authenticate),
  validate(schemas.posts.createPostSchema),
  asyncHandler(postController.createPost),
);
router.get(
  "/",
  asyncHandler(authenticate),
  validate(schemas.posts.getAllPostsSchema),
  asyncHandler(postController.getAllPosts),
);
router.get(
  "/:id",
  asyncHandler(authenticate),
  asyncHandler(postController.getPostById),
);
router.patch(
  "/:id",
  asyncHandler(authenticate),
  validate(schemas.posts.updatePostSchema),
  asyncHandler(postController.updatePostById),
);
router.delete(
  "/:id",
  asyncHandler(authenticate),
  asyncHandler(postController.deletePostById),
);

module.exports = router;
