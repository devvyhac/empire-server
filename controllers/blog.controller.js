import Blog from "../models/blog.model.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      {
        new: true,
      }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findOneAndDelete({ slug: req.params.slug });
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(deletedBlog);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
