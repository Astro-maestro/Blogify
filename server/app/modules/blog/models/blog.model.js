const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subtitle: { type: String, required: true},
    content: { type: String, required: true },
    description: { type: String, required: true},
    author: { type: Schema.Types.ObjectId, ref: "User" },
    publication: { type: Schema.Types.ObjectId, ref: "User" },
    url: { type: String,unique: true, required: true },
    featuredImage: {
        type: String,
        default:
          "https://www.jotform.com/blog/wp-content/uploads/2022/12/how-to-add-link-to-google-form-1280x500.jpg",
      },
    isPremium: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    topics: [
      {
        type: Schema.Types.ObjectId,
        ref: "Topic", // Reference to the Topic model
      },
    ],
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag", // Reference to the Tag model
      },
    ],
    readingTimeMinutes: {
      type: Number,
      default: 0,
      min: 0,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    analytics: { type: Schema.Types.ObjectId, ref: "Analytics" },
    views: [{ type: Schema.Types.ObjectId, ref: "Views" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "Dislike" }],
    shares: [
        {
          type: Schema.Types.ObjectId,
          ref: "Share", // Reference to the Share model
        },
      ],
    followRecommendations: [
        {
          type: Schema.Types.ObjectId,
          ref: "FollowRecommendation", // User recommendations for blogs to follow
        },
      ],
    reports: [
      {
        type: Schema.Types.ObjectId,
        ref: "Report", // Reports against comments or the blog
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false, // Indicates if the comment has been deleted
    },
    commentsDisabled: { type: Boolean, default: false },
    notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }], // Array of comment IDs referencing the Comment model. Each comment ID is a unique ID.
  },
  { timestamps: true }
);

// Middleware to generate slug and URL before saving
blogSchema.pre("save", async function (next) {
    // Generate slug if it doesn't already exist
    if (!this.slug) {
      this.slug = this.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-"); // Replace spaces with hyphens
    }
  
    // Generate full URL
    if (!this.url) {
      const baseUrl = "http://localhost:3000/blogs"; // Replace with your domain
      this.url = `${baseUrl}/${this.slug}`;
    }
  
    next();
  });

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
