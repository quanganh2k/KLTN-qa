const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShoeSizeSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Number,
      // default: 0,
    },
    size: {
      type: Schema.Types.ObjectId,
      ref: "sizes",
    },
  },
  { timestamps: true }
);

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

   
    
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    sizes: [ShoeSizeSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("shoes", ShoeSchema);
