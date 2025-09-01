import { Router } from "express";

const sellerApplicationRouter = Router();

sellerApplicationRouter.post("/", (req, res) => {
  res.send("Submit an application to be a seller");
});

sellerApplicationRouter.get("/me", (req, res) => {
  res.send("GET a Seller's Application (authenticated)");
});

sellerApplicationRouter.get("/", (req, res) => {
  res.send("GET all Sellers Application");
});

sellerApplicationRouter.get("/:id", (req, res) => {
  res.send("GET a specific Application");
});

sellerApplicationRouter.put("/:id", (req, res) => {
  res.send("Review a particular Application");
});

sellerApplicationRouter.delete("/:id", (req, res) => {
  res.send("Delete a particular Seller Application");
});

export default sellerApplicationRouter;
