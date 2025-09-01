import { Router } from "express";

const reviewRouter = Router();

reviewRouter.get("/", (req, res) => {
  res.send("GET all reviews");
});

reviewRouter.get("/:id", (req, res) => {
  res.send("GET a single review");
});

reviewRouter.post("/", (req, res) => {
  res.send("Create a new review");
});

reviewRouter.put("/:id", (req, res) => {
  res.send("Update a single review");
});

reviewRouter.delete("/:id", (req, res) => {
  res.send("Delete a single review");
});

export default reviewRouter;
