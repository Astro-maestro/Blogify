const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // The user making the payment
      required: true,
    },
    subscription: {
      type: Schema.Types.ObjectId,
      ref: "Subscription", // The subscription being paid for
      required: true,
    },
    transactionId: {
      type: String,
      required: true, // Unique transaction ID from the payment gateway
    },
    amount: {
      type: Number,
      required: true, // Amount paid for the subscription
    },
    paymentMethod: {
      type: String,
      enum: ["credit-card", "paypal", "bank-transfer", "other"], // Supported payment methods
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now, // The date when the payment was made
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"], // Payment status
      default: "completed",
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
