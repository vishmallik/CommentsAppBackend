var express = require("express");
const Comment = require("../models/Comments");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.end("Root Path");
});

router.post("/comment", async (req, res) => {
  const { author, content } = req.body;
  try {
    await Comment.create({
      author,
      content,
      date: new Date(),
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

router.put("/comment", async (req, res) => {
  try {
    const { id, author, content } = req.body;
    console.log(id, author, content);
    await Comment.findByIdAndUpdate(id, {
      $push: { replies: { author, content, date: new Date() } },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = router;
