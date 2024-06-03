var express = require("express");
const Comment = require("../models/Comment");
var router = express.Router();

router.post("/comment", async (req, res) => {
  const { id, author, content } = req.body;
  try {
    await Comment.create({
      author,
      content,
      date: new Date(),
      parentId: id || null,
    });
    return res.json({
      success: true,
      message: "Comment added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.get("/comment", async (req, res) => {
  try {
    const comments = await Comment.find({});
    return res.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.post("/upvote/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndUpdate(
      id,
      { $inc: { votes: 1 } },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Upvoted successfully",
      data: comment.votes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    });
  }
});
router.post("/downvote/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndUpdate(id, {
      $inc: { votes: -1 },
    });
    return res.json({
      success: true,
      message: "Downvoted successfully",
      data: comment.votes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = router;
