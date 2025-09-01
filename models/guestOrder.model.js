import mongoose from "mongoose";

// 5. Order Schema
// No major changes, but allow reference to payment method from user's stored methods.
// Indexes: buyer, status for user order history and admin dashboards.
const guestOrderSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    isGuest: {
      type: Boolean,
      default: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: true,
          min: [0, "Price cannot be negative"],
        }, // Snapshot of price at purchase
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: [0, "Total amount cannot be negative"],
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
      required: true,
    },
    shippingDetails: {
      street: { type: String, trim: true, required: true },
      city: { type: String, trim: true, required: true },
      state: { type: String, trim: true, required: true },
      country: { type: String, trim: true, required: true },
      postalCode: { type: String, trim: true, required: true },
    },
    payment: {
      status: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending",
        required: true,
      },
      method: {
        type: String,
        enum: ["credit_card", "paypal", "bank_transfer", "others"],
        required: true,
      },
      transactionId: {
        type: String,
        trim: true,
      },
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// orderSchema.index({ buyer: 1 });
// orderSchema.index({ status: 1 });

const GuestOrder = mongoose.model("GuestOrder", guestOrderSchema);
