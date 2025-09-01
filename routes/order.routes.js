import { Router } from "express";

export const orderRouter = Router();

orderRouter.post("/", (req, res) => {
  res.send("create order from cart");
});

orderRouter.get("/me", (req, res) => {
  res.send("get current user orders (authenticated)");
});

orderRouter.get("/:id", (req, res) => {
  res.send("get specific order details");
});

orderRouter.put("/:id/status", (req, res) => {
  res.send("update order status");
});

orderRouter.put("/:id/payment", (req, res) => {
  res.send("update payment status");
});

orderRouter.get("/", (req, res) => {
  res.send("GET all orders");
});

orderRouter.delete("/:id", (req, res) => {
  res.send("cancel order");
});

export default orderRouter;
