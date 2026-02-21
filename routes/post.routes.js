const express = require("express");
const postController = require("../controllers/post.controller");
const schemas = require("../schemas");
const validate = require("../middlewares/validate");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.post("/", validate(schemas.posts.createPostSchema), asyncHandler(postController.createPost));
router.get("/", validate(schemas.posts.getAllPostsSchema), asyncHandler(postController.getAllPosts));
router.get("/:id", asyncHandler(postController.getPostById));
router.patch("/:id", validate(schemas.posts.updatePostSchema), asyncHandler(postController.updatePostById));
router.delete("/:id", asyncHandler(postController.deletePostById));

module.exports = router;
