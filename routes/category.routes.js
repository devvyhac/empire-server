import { Router } from "express";

const categoryRouter = Router();

categoryRouter.get("/", (req, res) => {
  res.send("GET all categories");
});

categoryRouter.get("/:id", (req, res) => {
  res.send("GET a single category");
});

categoryRouter.post("/", (req, res) => {
  res.send("Create a new category");
});

categoryRouter.put("/:id", (req, res) => {
  res.send("Update a single category");
});

categoryRouter.delete("/:id", (req, res) => {
  res.send("Delete a single category");
});

export default categoryRouter;
