const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const readingListSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // The user who saved the blog
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog", // The blog that is saved
      required: true,
    },
    savedAt: {
      type: Date,
      default: Date.now, // Tracks when the blog was saved
    },
  },
  { timestamps: true }
);

// Ensure a user can only save a blog once in their reading list
readingListSchema.index({ user: 1, blog: 1 }, { unique: true });

const ReadingList = mongoose.model("ReadingList", readingListSchema);
module.exports = ReadingList;
