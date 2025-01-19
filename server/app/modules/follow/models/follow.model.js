const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followSchema = new Schema(
  {
    follower: {
      type: Schema.Types.ObjectId,
      ref: "User", // The user who is following
      required: true,
    },
    following: {
      type: Schema.Types.ObjectId,
      ref: "User", // The user being followed
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure a user can follow another user only once
followSchema.index({ follower: 1, following: 1 }, { unique: true });

const Follow = mongoose.model("Follow", followSchema);
module.exports = Follow;
