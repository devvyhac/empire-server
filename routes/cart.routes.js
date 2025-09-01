import { Router } from "express";

const cartRouter = Router();

cartRouter.get("/me", (req, res) => {
  res.send("Get current user's cart");
});

cartRouter.post("/me/items", (req, res) => {
  res.send("Add item to cart");
});

cartRouter.put("/me/items/:productId", (req, res) => {
  res.send("Update item quantity");
});

cartRouter.delete("/me/items/:productId", (req, res) => {
  res.send("Delete item from cart");
});

cartRouter.delete("/me", (req, res) => {
  res.send("Clear entire cart");
});

export default cartRouter;
