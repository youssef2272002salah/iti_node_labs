const postService = require("../services/post.service");
const APIError = require("../utils/APIError");

const createPost = async (req, res) => {
  const post = await postService.createPost(req.body, req.user.userId);
  res.status(201).json({
    message: "Post created successfully",
    success: true,
    data: post,
  });
};

const getAllPosts = async (req, res) => {
  const result = await postService.getAllPosts(req.query, req.user.userId);

  res.json({
    message: "Posts fetched successfully",
    success: true,
    data: result.posts,
    pagination: result.pagination,
  });
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await postService.getPostById(id, req.user.userId);

  if (!post) {
    throw new APIError("Post not found", 404);
  }

  res.json({
    message: "Post fetched successfully",
    success: true,
    data: post,
  });
};

const updatePostById = async (req, res) => {
  const { id } = req.params;
  const updatedPost = await postService.updatePostById(
    id,
    req.body,
    req.user.userId,
  );

  if (!updatedPost) {
    throw new APIError("Post not found", 404);
  }

  res.json({
    message: "Post updated successfully",
    success: true,
    data: updatedPost,
  });
};

const deletePostById = async (req, res) => {
  const { id } = req.params;
  const deletedPost = await postService.deletePostById(id, req.user.userId);

  if (!deletedPost) {
    throw new APIError("Post not found", 404);
  }

  res.json({
    message: "Post deleted successfully",
    success: true,
  });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
