const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const Shoe = require("../models/Shoe");
const Size = require("../models/Size");
const Feedback = require("../models/Feedback");
const Category = require("../models/Category")
const paginatedResults = require("../pagination/paginatedResults");

router.get("/", auth, authAdmin, paginatedResults(Order), async (req, res) => {
  // const orders = await Order.find()
  const orders = res.paginatedResults;
  res.json({ success: true, orders });
});

router.get("/search", paginatedResults(Order), async (req, res) => {
  try {
    const filterOrder = res.paginatedResults;

    res.json({ success: true, orders: filterOrder });
  } catch (error) {
    console.log(error);
  }
});

router.get("/searchById", paginatedResults(OrderDetail), async (req, res) => {
  try {
    const filterOrder = res.paginatedResults;

    res.json({ success: true, orderDetail: filterOrder });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const orderDetail = await OrderDetail.find({ order: id }).populate("shoe");

    res.json({ success: true, orderDetail });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/:id", auth, authAdmin, async (req, res) => {
  try {
    const {statusOrder,paymentStatus }= {...req.body}
    const updatedOrder = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          statusOrder:statusOrder,
          paymentStatus: paymentStatus,
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Bạn cập nhật trạng thái đơn hàng thành công",
      order: updatedOrder,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});


// xoa order detail
router.delete("/", auth, authAdmin, async (req, res) => {
  try {
    const filter = {};
   
    const deletedOrder = await Feedback.deleteMany(filter);

    res.json({
      success: true,
      message: "Bạn đã xoá thành công sản phẩm này",
      shoe: deletedOrder,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;


