const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const paginatedResults = require("../pagination/paginatedResults");


const Feedback = require("../models/Feedback");

router.post("/", auth, async (req, res) => {
  try {
    const { content, user, shoe } = req.body;
    if (!content) {
      return res
        .status(400)
        .json({ success: false, message: "Bạn cần nhập nội dung bình luận" });
    }
    if (!user) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Bạn cần nhập đăng nhập để bình luận",
        });
    }
    const newFeedback = new Feedback({ content, user, shoe });
    await newFeedback.save();
    res.json({
      success: true,
      message: "Đăng tải bình luận thành công",
      feedback: newFeedback,
    });
  } catch {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/', paginatedResults(Feedback,["user","shoe"]),async (req, res) => {
    try {
        const feedback = res.paginatedResults
        res.json({success: true, feedback})
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const feedback = await Feedback.find({shoe: id}).populate("user")
        res.json({success: true, feedback})
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
})



module.exports = router;
