const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const viewSchema = new Schema(
  {
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog", // The blog being viewed
      required: true,
    },
    viewer: {
      type: Schema.Types.ObjectId,
      ref: "User", // The user who viewed the blog (optional for guest views)
    },
  },
  { timestamps: true }
);

// Middleware or index can be added later if needed for unique view tracking

const View = mongoose.model("View", viewSchema);
module.exports = View;
