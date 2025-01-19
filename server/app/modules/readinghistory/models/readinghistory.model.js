const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const readingHistorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // The user who read the blog
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog", // The blog that was read
      required: true,
    },
    lastReadAt: {
      type: Date,
      default: Date.now, // Tracks the most recent read time
    },
    progress: {
      type: Number,
      default: 0, // Percentage of blog read (e.g., 0 to 100)
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

// Ensure a user can only have one reading history entry per blog
readingHistorySchema.index({ user: 1, blog: 1 }, { unique: true });

const ReadingHistory = mongoose.model("ReadingHistory", readingHistorySchema);
module.exports = ReadingHistory;
