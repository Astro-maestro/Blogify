const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    reporter: {
      type: Schema.Types.ObjectId,
      ref: "User", // The user who is reporting
      required: true,
    },
    target: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "onModel", // Dynamic reference to the target being reported (User, Blog, or Comment)
    },
    onModel: {
      type: String,
      required: true,
      enum: ["User", "Blog", "Comment"], // Can report a User, Blog, or Comment
    },
    reason: {
      type: String,
      required: true,
      maxLength: 500, // Limit the length of the reason for reporting
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Resolved"], // Tracks the status of the report
      default: "Pending",
    },
    resolvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // Admin who resolved the report (optional)
    },
    resolutionNotes: {
      type: String,
      trim: true, // Notes added by admin upon resolving
      maxLength: 1000,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;