const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    shoe: {
      type: Schema.Types.ObjectId,
      ref: "shoes",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("feedbacks", FeedbackSchema);
