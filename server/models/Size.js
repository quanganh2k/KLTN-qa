const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SizeSchema = new Schema(
  {
    sizeNumber: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("sizes", SizeSchema);

