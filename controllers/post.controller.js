const postService = require("../services/post.service");
const mongoose = require("mongoose");

const createPost = async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res
      .status(400)
      .json({ message: "title, content, and author are required" });
  }

  const post = await postService.createPost({
    title,
    content,
    author,
  });

  res.status(201).json({ message: "Post created successfully", data: post });
};

const getAllPosts = async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = Number(page);
  limit = Number(limit);

  const { posts, total } = await postService.getAllPosts(page, limit);

  res.json({
    message: "Posts fetched successfully",
    data: posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  const post = await postService.getPostById(id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json({ message: "Post fetched successfully", data: post });
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, author, tags, published } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  const updatedPost = await postService.updatePost(id, {
    title,
    content,
    author,
    tags,
    published,
  });

  if (!updatedPost) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json({ message: "Post updated successfully", data: updatedPost });
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  const deletedPost = await postService.deletePost(id);

  if (!deletedPost) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json({ message: "Post deleted successfully" });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
