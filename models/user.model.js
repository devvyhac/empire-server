import mongoose from "mongoose";

// 1. User Schema
// Updated to include multiple addresses and payment methods.
// Payment methods store non-sensitive info (e.g., tokenized via gateway like Stripe).
// Indexes: email (unique), role for quick role-based queries.
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [3, "First name must be at least 2 characters"],
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [3, "Last name must be at least 2 characters"],
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      // select: false, // Prevent password from being returned in queries
    },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[\d\s-]{10,15}$/, "Please provide a valid phone number"],
      default: null,
    },
    addresses: [
      {
        street: { type: String, trim: true, required: true },
        city: { type: String, trim: true, required: true },
        state: { type: String, trim: true, required: true },
        country: { type: String, trim: true, required: true },
        postalCode: { type: String, trim: true, required: true },
        isDefault: { type: Boolean, default: false },
      },
    ],
    paymentMethods: [
      {
        type: {
          type: String,
          enum: ["credit_card", "paypal", "bank_transfer"],
          required: true,
        },
        last4: { type: String, trim: true, default: null }, // e.g., last 4 digits of card
        token: { type: String, trim: true, default: null }, // Gateway token (sensitive, encrypt if needed)
        isDefault: { type: Boolean, default: false },
      },
    ],
    verifyOtp: {
      type: String,
      default: "",
    },
    verifyOtpExpiresAt: {
      type: Number,
      default: 0,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    resetOtp: {
      type: String,
      default: "",
    },
    resetOtpExpiresAt: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.index({ email: 1 }); // Already unique, but explicit index
userSchema.index({ role: 1 }); // For role-based queries

const User = mongoose.model("User", userSchema);

export default User;
