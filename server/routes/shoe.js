const express = require("express");
const router = express.Router();
const multer = require("multer");

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const Shoe = require("../models/Shoe");
const Category = require("../models/Category");
const Size = require("../models/Size");

const paginatedResults = require("../pagination/paginatedResults");
const { route } = require("./size");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  // kiểm tra định dạng file, nếu là 1 trong 2 định dạng này thì sẽ lưu
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // tối đa là 5mb
  },
  fileFilter: fileFilter,
});

// @route POST api/shoe
// @desc Create Shoe
// @access only admin
router.post("/", auth, authAdmin, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Bạn cần upload ảnh lên" });
    } else {
      console.log(req.file);
      const image = req.file.path.replace(/\\/g, "/");
      const { name, price, description, color, category, sizes } = req.body;

      if (
        !name ||
        !price ||
        !description ||
        !color ||
        !category ||
        !sizes ||
        sizes.length == 0 // sizes la mot array gom nhieu object [{size, quantity}]
      ) {
        return res
          .status(400)
          .json({ success: false, message: "Bạn cần điền đầy đủ thông tin" });
      }
      const shoe = await Shoe.findOne({ name });
      if (shoe) {
        return res
          .status(400)
          .json({ success: false, message: "Tên sản phẩm này đã tồn tại" });
      }

      for (const size of sizes) {
        if (!size.size || !size.quantity) {
          return res
            .status(400)
            .json({ success: false, message: "Bạn cần điền đầy đủ thông tin" });
        }
      }

      const newShoe = new Shoe({
        name,
        image,
        price,
        description,
        color,
        category,
        sizes,
      });

      await newShoe.save();
      res.json({
        success: true,
        message: "Thêm mới thành công sản phẩm",
        shoe: newShoe,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route GET api/shoe
// @desc Get ALl Shoes
// @access public
router.get("/", paginatedResults(Shoe), async (req, res) => {
  try {
    const shoes = res.paginatedResults;
    res.json({ success: true, shoes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route GET api/shoe/search
// @desc Search by name
// @access public
router.get("/search", paginatedResults(Shoe), async (req, res) => {
  try {
    const filterShoe = res.paginatedResults;

    res.json({ success: true, shoes: filterShoe });
  } catch (error) {
    console.log(error);
  }
});

// @route GET api/shoe/:id
// @desc Get 1 shoe
// @access public
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const shoe = await Shoe.findById(id).populate(["category", "sizes.size"]);

    res.json({ success: true, shoe });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route DELETE api/shoe/:id
// @desc Delete Shoe
// @access only admin
router.delete("/:id", auth, authAdmin, async (req, res) => {
  try {
    const deletedShoe = await Shoe.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Bạn đã xoá thành công sản phẩm này",
      category: deletedShoe,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route UPDATE api/shoe/:id
// @desc Update Shoe
// @access only admin
router.put(
  "/:id",
  auth,
  authAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "Bạn cần upload ảnh lên" });
      } else {
        const image = req.file.path;
        const { name, price, description, color, category, sizes } = req.body;

        if (
          !name ||
          !price ||
          !description ||
          !color ||
          !category ||
          !sizes ||
          sizes.length == 0
        ) {
          return res
            .status(400)
            .json({ success: false, message: "Bạn cần điền đầy đủ thông tin" });
        }

        for (const size of sizes) {
          if (!size.size || !size.quantity) {
            return res.status(400).json({
              success: false,
              message: "Bạn cần điền đầy đủ thông tin",
            });
          }
        }

        const updatedShoe = await Shoe.findOneAndUpdate(
          { _id: req.params.id },
          {
            name,
            image: image,
            price,
            description,
            color,
            category,
            sizes,
          },
          { new: true }
        );
        res.json({
          success: true,
          message: "Bạn đã sửa thành công thông tin về sản phẩm này",
          shoe: updatedShoe,
        });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
);

module.exports = router;
