import Router from "express";
import {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";

import authenticate from "../middlewares/auth.middleware.js";

const blogRouter = Router();

blogRouter.get("/", getAllBlogs);

blogRouter.get("/:slug", getBlogBySlug);

blogRouter.post("/", authenticate, createBlog);

blogRouter.put("/:slug", authenticate, updateBlog);

blogRouter.delete("/:slug", authenticate, deleteBlog);

export default blogRouter;
