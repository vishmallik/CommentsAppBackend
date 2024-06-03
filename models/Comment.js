const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: String,
  content: String,
  votes: { type: Number, default: 0 },
  date: Date,
  parentId: { type: mongoose.Types.ObjectId, ref: "Comment" },
});

module.exports = mongoose.model("Comment", CommentSchema);
