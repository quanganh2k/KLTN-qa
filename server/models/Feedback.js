const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "customers",
    },
    shoe: {
      type: Schema.Types.ObjectId,
      ref: "shoes",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("feedbacks", FeedbackSchema);
