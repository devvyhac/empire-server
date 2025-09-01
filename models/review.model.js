import mongoose from "mongoose";

// 7. Review Schema
// Indexes: product, user (composite unique already), product for product reviews.
const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [1000, "Comment cannot exceed 1000 characters"],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Composite unique index already defined
reviewSchema.index({ product: 1 });

const Review = mongoose.model("Review", reviewSchema);
