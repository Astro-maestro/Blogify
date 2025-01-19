const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dislikeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // The user who liked the post or comment
      required: true,
    },
    target: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "onModel", // Dynamic reference to either "Blog" or "Comment"
    },
    onModel: {
      type: String,
      required: true,
      enum: ["Blog", "Comment"], // Can only like a Blog or Comment
    },
  },
  { timestamps: true }
);

// Ensure a user can like a specific target only once
dislikeSchema.index({ user: 1, target: 1, onModel: 1 }, { unique: true });

const Dislike = mongoose.model("Like", dislikeSchema);
module.exports = Dislike;
