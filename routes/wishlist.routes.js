import { Router } from "express";

const wishlistRouter = Router();

wishlistRouter.get("/me", (req, res) => {
  res.send("Get current user's wishlist");
});

wishlistRouter.post("/me/items", (req, res) => {
  res.send("Add item to wishlist");
});

wishlistRouter.delete("/me/items/:productId", (req, res) => {
  res.send("Remove item from wishlist");
});

wishlistRouter.delete("/me", (req, res) => {
  res.send("Clear entire wishlist");
});

export default wishlistRouter;
