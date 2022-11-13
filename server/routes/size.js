const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const paginatedResults = require("../pagination/paginatedResults");

const Size = require("../models/Size.js");
const Shoe = require("../models/Shoe.js");

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
router.get("/", paginatedResults(Size), async (req, res) => {
  const sizes = res.paginatedResults;
  res.json({ success: true, sizes });
});

// @route DELETE api/size/:id
// @desc Delete size
// @access Only admin
router.delete("/:id", auth, authAdmin, async (req, res) => {
  try {
    const shoeSize = await Shoe.find({ "sizes.size": req.params.id });
    for (let i = 0; i < shoeSize.length; i++) {
      const shoe = shoeSize[i];
      await Shoe.findByIdAndUpdate(shoe._id, {
        $set: {
          sizes: shoe.sizes.filter(
            (item) => item.size.toString() !== req.params.id
          ),
        },
      });
    }

    const deletedSize = await Size.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Bạn đã xoá thành công size này",
      size: deletedSize,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/search", paginatedResults(Size), async (req, res) => {
  try {
    const filterSize = res.paginatedResults;

    res.json({ success: true, sizes: filterSize });
  } catch (error) {
    console.log(error);
  }
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
      { _id: req.params.id },
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
