const Post = require("../models/post.model");

// Create a new post
const createPost = async (postData) => {
  return await Post.create(postData);
};

// Get all posts with pagination
const getAllPosts = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  const posts = await Post.find({}).skip(skip).limit(limit);
  const total = await Post.countDocuments();

  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// Get post by ID
const getPostById = async (id) => {
  return await Post.findById(id);
};

// Update post by ID
const updatePostById = async (id, postData) => {
  return await Post.findByIdAndUpdate(id, postData, {
    new: true,
    runValidators: true,
  });
};

// Delete post by ID
const deletePostById = async (id) => {
  return await Post.findByIdAndDelete(id);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
