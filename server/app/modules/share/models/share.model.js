const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shareSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // The user who is sharing the blog
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog", // The blog being shared
      required: true,
    },
    platform: {
      type: String,
      enum: ["Facebook", "Twitter", "Instagram", "Whatsapp"], // Platform where the blog is shared
      required: true,
    },
    sharedUrl: {
      type: String,
      required: true, // URL link to the shared blog
    },
  },
  { timestamps: true }
);

// Middleware to populate sharedUrl from the blog model before saving
shareSchema.pre("save", async function (next) {
  if (!this.sharedUrl) {
    const Blog = mongoose.model("Blog");
    const blog = await Blog.findById(this.blog).select("url");

    if (blog && blog.url) {
      this.sharedUrl = blog.url;
    } else {
      return next(new Error("Blog URL not found"));
    }
  }
  next();
});

const Share = mongoose.model("Share", shareSchema);
module.exports = Share;
