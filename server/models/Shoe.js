const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShoeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      trim: true,
      required: true,
    },

    sold: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Number,
    },

    checked: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    size: {
      type: Schema.Types.ObjectId,
      ref: "sizes",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("shoes", ShoeSchema);
