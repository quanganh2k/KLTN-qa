const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const Shoe = require("../models/Shoe");
const Size = require("../models/Size");

// @route POST api/checkout
// @desc Checkout
// @access user
router.post("/", auth, async (req, res) => {
  console.log(req.user);
  try {
    const {
      fullname,
      phoneNumber,
      address,
      province,
      district,
      ward,
      payment,
      products,
      total
    } = req.body;

    if (
      !fullname ||
      !phoneNumber ||
      !address ||
      !province ||
      !district ||
      !ward
    ) {
      return res.status(400).json({
        success: false,
        message: "Bạn cần nhập đầy đủ thông tin nhận hàng",
      });
    }

    if (!payment) {
      return res.status(400).json({
        success: false,
        message: "Bạn cần lựa chọn phương thức thanh toán",
      });
    }

    const newOrder = await Order.create({
      fullname,
      phoneNumber,
      address,
      province,
      district,
      ward,

      payment,
      total,
      user: req.user.userId,
    });

    for (const product of products) {
      await OrderDetail.create({
        sizeChoice: product.sizeChoice,
        quantity: product.quantity,
        order: newOrder._id,
        shoe: product._id,
        price: product.price,
      });

      // tìm xem giày khách mua  ứng với  giày nào trong db
      const shoeFind = await Shoe.findOne({ _id: product._id });

      // tìm xem size khách chọn ứng với size nào trong db
      const findSize = await Size.findOne({ sizeNumber: product.sizeChoice });

      
      for (let i = 0; i < shoeFind.sizes.length; i++) {
        const size = shoeFind.sizes[i];

        
        if (JSON.stringify(findSize._id) === JSON.stringify(size.size)) {
          size.inStock = size.quantity - product.quantity;
        }
      }

      await Shoe.findByIdAndUpdate(shoeFind._id, shoeFind);
    }

    

    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
