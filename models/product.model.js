import mongoose from "mongoose";

// A sub-schema for product specifications, designed to be flexible
const specificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  value: {
    type: [mongoose.Schema.Types.Mixed],
    required: true,
  },
  isVariant: {
    type: Boolean,
    default: false,
  },
});

// 3. Product Schema
// Added SKU field (unique).
// Indexes: seller, category for filtering by seller/category; text index on name and description for search.
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [3, "Product name must be at least 3 characters"],
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    // The brand field is added here as a top-level attribute
    brand: {
      type: String,
      required: [true, "Product brand is required"],
      trim: true,
      maxlength: [100, "Product brand cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      maxlength: [2000, "Product description cannot exceed 2000 characters"],
    },
    originalPrice: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    discountPrice: {
      type: Number,
      min: [0, "Discount price cannot be negative"],
      default: null,
      validate: {
        validator: function (value) {
          return value === null || value < this.originalPrice;
        },
        message: "Discount price must be less than original price",
      },
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
    },
    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      trim: true,
      match: [/^[A-Za-z0-9-]+$/, "Please provide a valid SKU"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    tag: {
      type: String,
      trim: true,
      default: "",
    },
    // The attributes field is an array of embedded specification schemas.
    attributes: [specificationSchema],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Seller is required"],
    },
    images: [
      {
        url: { type: String, required: true },
        altText: { type: String, trim: true, default: "" },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
productSchema.index({ seller: 1 });
productSchema.index({ category: 1 });
productSchema.index({ name: "text", description: "text" }); // For full-text search

const Product = mongoose.model("Product", productSchema);

export default Product;
