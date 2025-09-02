import { Router } from "express";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const products = await Product.find().populate({
    path: "category",
    model: Category,
    select: "_id name parent_category",
  });
  res.status(200).json({ success: true, products });
});

productRouter.get("/:id", (req, res) => {
  res.send("GET a single product");
});

productRouter.post("/", (req, res) => {
  res.send("Create a new product");
});

productRouter.put("/:id", (req, res) => {
  res.send("Update a single product");
});

productRouter.delete("/:id", (req, res) => {
  res.send("Delete a single product");
});

export default productRouter;
