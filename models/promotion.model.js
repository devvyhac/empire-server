import mongoose from "mongoose";

// 9. Promotion Schema (New, covers discounts and promotions)
// Can be coupons, site-wide discounts, or product-specific promotions.
// Type: 'percentage' or 'fixed' discount.
// Applicable to products, categories, or orders.
// Indexes: code (unique), startDate, endDate for active promotions.
const promotionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Promotion name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    code: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Promotion code is required"],
      match: [/^[A-Za-z0-9-]+$/, "Please provide a valid code"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: null,
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: [true, "Discount type is required"],
    },
    discountValue: {
      type: Number,
      required: [true, "Discount value is required"],
      min: [0, "Discount value cannot be negative"],
    },
    minPurchaseAmount: {
      type: Number,
      min: [0, "Minimum purchase amount cannot be negative"],
      default: 0,
    },
    applicableTo: {
      type: String,
      enum: ["order", "product", "category"],
      required: [true, "Applicable scope is required"],
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        default: [], // If applicableTo 'product'
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: [], // If applicableTo 'category'
      },
    ],
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "End date must be after start date",
      },
    },
    usageLimit: {
      type: Number,
      min: [0, "Usage limit cannot be negative"],
      default: null, // Null for unlimited
    },
    usedCount: {
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

promotionSchema.index({ code: 1 });
promotionSchema.index({ startDate: 1, endDate: 1 });
promotionSchema.index({ isActive: 1 });

const Promotion = mongoose.model("Promotion", promotionSchema);
