import mongoose from "mongoose";
import slugify from "slugify";
import { nanoid } from "nanoid";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 150,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

blogSchema.pre("save", function (next) {
  this.slug = slugify(`${this.title} ${nanoid()}`, {
    lower: true,
    strict: true,
  });

  next();
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
