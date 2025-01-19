const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const muteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // The user who is muting
      required: true,
    },
    target: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "onModel", // Dynamic reference to either "User" or "Topic"
    },
    onModel: {
      type: String,
      required: true,
      enum: ["User", "Topic"], // Can mute either a User or a Topic
    },
  },
  { timestamps: true }
);

// Ensure a user can mute a specific target only once
muteSchema.index({ user: 1, target: 1, onModel: 1 }, { unique: true });

const Mute = mongoose.model("Mute", muteSchema);
module.exports = Mute;
