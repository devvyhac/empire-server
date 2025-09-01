import { Router } from "express";

const promotionRouter = Router();

promotionRouter.post("/", (req, res) => {
  res.send("Create new promotion");
});

promotionRouter.get("/", (req, res) => {
  res.send("Get all promotions");
});

promotionRouter.get("/:promoId", (req, res) => {
  res.send("Get specific promotion");
});

promotionRouter.put("/:promoId", (req, res) => {
  res.send("Update a specific promotion");
});

promotionRouter.delete("/:promoId", (req, res) => {
  res.send("Delete a specific promotion");
});

promotionRouter.post("/validate", (req, res) => {
  res.send("Validate promo code during checkout");
});
