const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    address: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    ward: {
      type: String,
      required: true,
    },

    statusOrder: {
      type: String,
      enum: ["Đang giao hàng", "Đã giao hàng"],
      default: "Đang giao hàng",
    },
    payment: {
      type: String,
      required: true,
      enum: ["cod", "online"],
    },
    paymentStatus: {
      type: String,
      enum: ["Đã thanh toán", "Chưa thanh toán"],
      default: "Chưa thanh toán",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", OrderSchema);
