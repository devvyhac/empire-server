import { Router } from "express";

const productRouter = Router();

productRouter.get("/", (req, res) => {
  res.send("GET all products");
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
