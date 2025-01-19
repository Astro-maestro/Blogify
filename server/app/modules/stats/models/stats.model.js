const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statsSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Total number of blogs published by the user
    blogsPublished: {
      type: Number,
      default: 0,
    },
    // Total views across all blogs written by the user
    totalViews: {
      type: Number,
      default: 0,
    },
    // Total number of likes across all blogs written by the user
    totalLikes: {
      type: Number,
      default: 0,
    },
    // Total number of comments made on blogs written by the user
    totalComments: {
      type: Number,
      default: 0,
    },
    // Total shares of blogs written by the user
    totalShares: {
      type: Number,
      default: 0,
    },
    // Total number of followers the user has
    totalFollowers: {
      type: Number,
      default: 0,
    },
    // Total number of users the user is following
    totalFollowing: {
      type: Number,
      default: 0,
    },
    // Total number of blogs in the user's reading list
    totalReadingList: {
      type: Number,
      default: 0,
    },
    // Total number of blogs the user has read
    totalReadingHistory: {
      type: Number,
      default: 0,
    },
    totalReports: {
        type: Number,
      default: 0
    },
    totalDislikes: {
        type: Number,
        default: 0,
      },
  },
  { timestamps: true }
);

// Middleware to update stats after certain actions (like creating a blog, liking a blog, etc.)
statsSchema.pre("save", async function (next) {
  if (!this.isModified("totalLikes") && !this.isModified("totalComments")) {
    return next();
  }

  // Update any other dependent stats here (e.g., views, followers, etc.)
  next();
});

const Stats = mongoose.model("Stats", statsSchema);
module.exports = Stats;
