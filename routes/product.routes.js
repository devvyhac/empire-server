import { Router } from "express";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import {
  getAllProducts,
  getProductBySlug,
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);

productRouter.get("/:slug", getProductBySlug);

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
