import { Router } from "express";

const integrationRouter = Router();

integrationRouter.post("/webhooks/payment", (req, res) => {
  res.send("Handle payment gateway webhooks");
});

integrationRouter.get("/search/products", (req, res) => {
  res.send("Proxy or integrate with Strapi for product search");
});

export default integrationRouter;
