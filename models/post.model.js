const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    tags: [String],
    published: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Post", postSchema);
