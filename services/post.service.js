const Post = require("../models/post.model");

const createPost = async (postData) => {
  return await Post.create(postData);
};

const getAllPosts = async (page, limit) => {
  const skip = (page - 1) * limit;
  const posts = await Post.find({}).skip(skip).limit(limit);
  const total = await Post.countDocuments();
  return { posts, total };
};

const getPostById = async (id) => {
  return await Post.findOne({ _id: id });
};

const updatePost = async (id, postData) => {
  return await Post.findOneAndUpdate({ _id: id }, postData, { new: true });
};

const deletePost = async (id) => {
  return await Post.findOneAndDelete({ _id: id });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
