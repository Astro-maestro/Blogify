const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Analytics Schema
const analyticsSchema = new Schema(
  {
    blog: { 
      type: Schema.Types.ObjectId, 
      ref: "Blog", 
      required: true 
    },
    // Aggregate Fields
    totalViews: {
      type: Number,
      default: 0
    },
    totalLikes: {
      type: Number,
      default: 0
    },
    totalDislikes: {
      type: Number,
      default: 0
    },
    totalShares: {
      type: Number,
      default: 0
    },
    totalComments: {
      type: Number,
      default: 0
    },
    totalReports: {
        type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

analyticsSchema.pre("save", async function (next) {
  if (!this.isModified("totalLikes") && !this.isModified("totalComments")) {
    return next();
  }

  // Update any other dependent stats here (e.g., views, followers, etc.)
  next();
});

// Create and export the Analytics model
const Analytics = mongoose.model("Analytics", analyticsSchema);
module.exports = Analytics;
