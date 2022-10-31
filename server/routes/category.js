const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const Category = require("../models/Category");

const paginatedResults = require("../pagination/paginatedResults");

// @route POST api/category
// @desc Create Category
// @access only admin
router.post("/", auth, authAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Bạn cần nhập tên loại sản phẩm" });
    }
    const category = await Category.findOne({ name });
    if (category) {
      return res
        .status(400)
        .json({ success: false, message: "Loại sản phẩm này đã tồn tại" });
    }
    const newCategory = new Category({ name });

    await newCategory.save();
    res.json({
      success: true,
      message: "Thêm mới thành công một thể loại sản phẩm",
      category: newCategory,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route GET api/category
// @desc Get ALl Categories
// @access public
router.get("/",  async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, categories });
    // res.json(res.paginatedResults)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route DELETE api/category/:id
// @desc Delete Category
// @access only admin
router.delete("/:id", auth, authAdmin, async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Bạn đã xoá thành công loại sản phẩm này",
      category: deletedCategory,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route UPDATE api/category/:id
// @desc Update Category
// @access only admin
router.put("/:id", auth, authAdmin, async (req, res) => {
  const { name } = req.body;

  // Validation
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Tên thể loại sản phẩm không được để trống",
    });
  }

  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { name },
      { new: true }
    );

    res.json({
      success: true,
      message: "Bạn đã sửa thành công tên loại sản phẩm này",
      category: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
