const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      maxLength: 1000, // Limit the length of the comment
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model for who created the comment
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog", // Reference to the Blog model
      required: true,
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment", // Self-reference for replies
      default: null,
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment", // Array of reply comments
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // Users who liked the comment
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // Users who disliked the comment
      },
    ],
    reports: [{ type: Schema.Types.ObjectId, ref: "Report" }],
    isEdited: {
      type: Boolean,
      default: false, // Tracks if the comment has been edited
    },
    isDeleted: {
      type: Boolean,
      default: false, // Indicates if the comment has been deleted
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
