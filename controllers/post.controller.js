const postService = require("../services/post.service");
const APIError = require("../utils/APIError");

const createPost = async (req, res) => {
  const post = await postService.createPost(req.body);
  res.status(201).json({
    message: "Post created successfully",
    success: true,
    data: post,
  });
};

const getAllPosts = async (req, res) => {
  const result = await postService.getAllPosts(req.query);

  res.json({
    message: "Posts fetched successfully",
    success: true,
    data: result.posts,
    pagination: result.pagination,
  });
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await postService.getPostById(id);

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
  const updatedPost = await postService.updatePostById(id, req.body);

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
  const deletedPost = await postService.deletePostById(id);

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
