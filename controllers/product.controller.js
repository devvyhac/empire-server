import Product from "../models/product.model.js";
import Category from "../models/category.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate({
      path: "category",
      model: Category,
      select: "_id name parent_category",
    });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findById(req.params.slug).populate({
      path: "category",
      model: Category,
      select: "_id name parent_category",
    });
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
