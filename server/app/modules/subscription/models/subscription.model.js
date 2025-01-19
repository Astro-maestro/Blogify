const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // The user who subscribed
      required: true,
    },
    plan: {
      type: String,
      enum: ["monthly", "yearly"], // Example of subscription plans
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now, // Defaults to current date
    },
    endDate: {
      type: Date,
      required: true, // When the subscription expires
    },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"], // Subscription status
      default: "active",
    },
    subscribedBlogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog", // Premium blogs the user has access to
      },
    ],
    payments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Payment", // References to payments made for this subscription
      },
    ],
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
