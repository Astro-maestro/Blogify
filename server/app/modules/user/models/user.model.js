const userSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: {
        type: String,
        required: function () {
          return this.authProvider === "manual"; // Password is required only for manually registered users
        },
        minLength: 8,
      },
      googleId: {
        type: String,
        unique: true,
        default: null, // This will be null for manually registered users
      },
      authProvider: {
        type: String,
        enum: ["manual", "google"], // Specifies the method of login
        default: "manual",
      },
      role: {
        type: Schema.Types.ObjectId, // Reference to the Role model
        ref: "Role",
        required: true,
      },
      image: {
        type: String,
        default:
          "https://www.jotform.com/blog/wp-content/uploads/2022/12/how-to-add-link-to-google-form-1280x500.jpg",
      },
      bio: {
        type: String,
        maxLength: 500,
      },
      isAdmin: { type: Boolean, default: false },
      isVerified: { type: Boolean, default: false },
      isMuted: { 
        type: Boolean, 
        default: false 
      },
      isBanned: { type: Boolean, default: false},
      subscription: {
        type: Schema.Types.ObjectId,
        ref: "Subscription", // Premium subscription details
        default: null,
      },
      stats: {
        type: Schema.Types.ObjectId,
        ref: "Stats", // Tracks detailed user stats
      },
      drafts: [
        {
          type: Schema.Types.ObjectId,
          ref: "Draft", // References user's drafts
        },
      ],
      readingList: [
        {
          type: Schema.Types.ObjectId,
          ref: "ReadingList", // User's saved blogs
        },
      ],
      readingHistory: [
        {
          type: Schema.Types.ObjectId,
          ref: "ReadingHistory", // User's reading history
        },
      ],
      notifications: [
        {
          type: Schema.Types.ObjectId,
          ref: "Notification",
        },
      ],
      // Removed user references from here
      followers: [
        {
          type: Schema.Types.ObjectId,
          ref: "Follow", // Follower details are managed in the Follow model
        },
      ],
      following: [
        {
          type: Schema.Types.ObjectId,
          ref: "Follow", // Following details are managed in the Follow model
        },
      ],
      muted: [
        {
          type: Schema.Types.ObjectId,
          ref: "Mute", // Muted entities managed in Mute model
        },
      ],
      shares: [
        {
          type: Schema.Types.ObjectId,
          ref: "Share", // Reference to the Share model
        },
      ],
      topicsFollowed: [
        {
          type: Schema.Types.ObjectId,
          ref: "Topic", // Tracks the topics the user follows
        },
      ],
    },
    { timestamps: true }
  );
  
  const User = mongoose.model("User", userSchema);
  module.exports = User;
  