const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const Size = require("../models/Size.js");

// @route POST api api/size
// @desc Create size
// @access Only admin
router.post("/", auth, authAdmin, async (req, res) => {
  try {
    const { sizeNumber } = req.body;
    if (!sizeNumber) {
      return res
        .status(400)
        .json({ success: false, message: "Bạn cần nhập size của sản phẩm" });
    }

    const size = await Size.findOne({ sizeNumber });
    if (size) {
      return res
        .status(400)
        .json({ success: false, message: "Size sản phẩm đã tồn tại" });
    }

    const newSize = new Size({ sizeNumber });

    await newSize.save();

    res.json({
      success: true,
      message: "Thêm mới thành công size của sản phẩm",
      size: newSize,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route GET api/size
// @desc Get All Sizes
// @access Public
router.get("/", async (req, res) => {
  const sizes = await Size.find();

  res.json({ success: true, sizes });
});

// @route DELETE api/size/:id
// @desc Delete size
// @access Only admin
router.delete("/:id", auth, authAdmin, async (req, res) => {
  try {
    const deletedSize = await Size.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Bạn đã xoá thành công size của sản phẩm",
      size: deletedSize,
    });
  } catch (error) {}
});

// @route PUT api/size/:id
// @desc Update size
// @access only admin
router.put("/:id", auth, authAdmin, async (req, res) => {
  const { sizeNumber } = req.body;
  if (!sizeNumber) {
    return res
      .status(400)
      .json({ success: false, message: "Size sản phẩm không được để trống" });
  }
  try {
    const updatedSize = await Size.findOneAndUpdate(
      { id: req.params.id },
      { sizeNumber },
      { new: true }
    );

    res.json({
      success: true,
      message: "Bạn đã sửa thành công tên size sản phẩm này",
      size: updatedSize,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});
module.exports = router;
