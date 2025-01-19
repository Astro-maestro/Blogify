const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensure each topic name is unique
      trim: true, // Remove extra spaces
      maxLength: 100, // Limit the length of the topic name
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the user who created the topic
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true, // Allows topics to be deactivated if needed
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // Users who follow this topic
      },
    ],
  },
  { timestamps: true }
);

const Topic = mongoose.model("Topic", topicSchema);
module.exports = Topic;
