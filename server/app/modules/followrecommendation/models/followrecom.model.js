const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followRecommendationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // The user for whom recommendations are generated
      required: true,
    },
    recommendations: [
      {
        target: {
          type: Schema.Types.ObjectId,
          refPath: "onModel", // Dynamic reference to either User or Topic
          required: true,
        },
        onModel: {
          type: String,
          required: true,
          enum: ["User", "Topic", "Tag"], // Recommendations can be for Users or Topics
        },
        reason: {
          type: String, // Reason for recommendation (e.g., "mutual followers", "shared topics")
          maxLength: 250,
        },
      },
    ],
  },
  { timestamps: true }
);

const FollowRecommendation = mongoose.model(
  "FollowRecommendation",
  followRecommendationSchema
);
module.exports = FollowRecommendation;
