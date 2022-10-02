const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "orders",
    },
    shoe: {
      type: Schema.Types.ObjectId,
      ref: "shoes",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orderDetails", OrderDetailSchema);
