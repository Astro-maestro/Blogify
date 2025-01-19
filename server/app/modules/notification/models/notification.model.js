const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User", // The user who will receive the notification
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User", // The user who triggered the notification (optional for system notifications)
    },
    type: {
      type: String,
      enum: [
        "like",
        "comment",
        "follow",
        "share",
        "mention",
        "newBlog",
        "subscription",
        "reportStatus",
        "system",
      ],
      required: true,
    },
    message: {
      type: String,
      required: true, // Descriptive message for the notification
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog", // Reference to the blog if the notification is related to one
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment", // Reference to the comment if the notification is related to one
    },
    isRead: {
      type: Boolean,
      default: false, // Tracks whether the user has read the notification
    },
    metadata: {
      type: Map,
      of: String, // Allows for additional custom data related to the notification
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
