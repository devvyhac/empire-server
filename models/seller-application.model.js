import mongoose from "mongoose";

// 2. Seller Application Schema
// No changes needed, but add index on user and status for quick lookups.
const sellerApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      unique: true, // One application per user
    },
    businessName: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
      minlength: [2, "Business name must be at least 2 characters"],
      maxlength: [100, "Business name cannot exceed 100 characters"],
    },
    businessDescription: {
      type: String,
      required: [true, "Business description is required"],
      trim: true,
      maxlength: [1000, "Business description cannot exceed 1000 characters"],
    },
    taxId: {
      type: String,
      required: [true, "Tax ID is required"],
      trim: true,
      match: [/^[A-Za-z0-9-]+$/, "Please provide a valid tax ID"],
    },
    businessAddress: {
      street: { type: String, trim: true, required: true },
      city: { type: String, trim: true, required: true },
      state: { type: String, trim: true, required: true },
      country: { type: String, trim: true, required: true },
      postalCode: { type: String, trim: true, required: true },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    reviewedAt: {
      type: Date,
      default: null,
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin who reviews
      default: null,
    },
    rejectionReason: {
      type: String,
      trim: true,
      default: null,
      maxlength: [500, "Rejection reason cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true,
  }
);

sellerApplicationSchema.index({ user: 1 });
sellerApplicationSchema.index({ status: 1 });

const SellerApplication = mongoose.model(
  "SellerApplication",
  sellerApplicationSchema
);
