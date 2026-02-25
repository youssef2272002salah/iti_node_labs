const Post = require("../models/post.model");
const APIError = require("../utils/APIError");

// Create a new post
const createPost = async (postData, userId) => {
  return await Post.create({
    ...postData,
    userId,
  });
};

// Get all posts with pagination
const getAllPosts = async (query, userId) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  //TODO:
  const posts = await Post.find({})
    .populate("userId", "name email")
    .skip(skip)
    .limit(limit);
  const total = await Post.countDocuments();

  // Add isOwner flag to each post
  const postsWithOwner = posts.map((post) => {
    const postObject = post.toObject();
    postObject.isOwner = post.userId._id.toString() === userId.toString();
    return postObject;
  });

  return {
    posts: postsWithOwner,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// Get post by ID
const getPostById = async (id, userId) => {
  const post = await Post.findById(id).populate("userId", "name email");

  if (!post) {
    return null;
  }

  const postObject = post.toObject();
  postObject.isOwner = post.userId._id.toString() === userId.toString();
  return postObject;
};

// Update post by ID
const updatePostById = async (id, postData, userId) => {
  const post = await Post.findById(id);

  if (!post) {
    return null;
  }

  // Check if user is the author
  if (post.userId.toString() !== userId.toString()) {
    throw new APIError("You can only update your own posts", 403);
  }

  return await Post.findByIdAndUpdate(id, postData, {
    new: true,
    runValidators: true,
  });
};

// Delete post by ID
const deletePostById = async (id, userId) => {
  const post = await Post.findById(id);

  if (!post) {
    return null;
  }

  // Check if user is the author
  if (post.userId.toString() !== userId.toString()) {
    throw new APIError("You can only delete your own posts", 403);
  }

  return await Post.findByIdAndDelete(id);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
