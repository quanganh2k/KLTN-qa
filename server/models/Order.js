const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
    },

    deliveryDate: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: String,
      enum: ["Đang giao hàng", "Đã giao hàng"],
    },
    paymentStatus: {
      type: String,
      enum: ["Đã thanh toán", "Chưa thanh toán"],
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "customers",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", OrderSchema);
