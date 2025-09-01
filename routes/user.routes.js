import { Router } from "express";
import authenticate from "../middlewares/auth.middleware.js";
import { getUserData } from "../controllers/user.controller.js";

const userRouter = Router();

// Create, Read, Update and Delete User Data.
userRouter.get("/me", authenticate, getUserData);

userRouter.post("/", (req, res) => {
  res.send("Create another user account");
});

userRouter.get("/:id", (req, res) => {
  res.send("GET a single user details");
});

userRouter.put("/:id", (req, res) => {
  res.send("Update a single user details");
});

userRouter.delete("/:id", (req, res) => {
  res.send("Delete a single user details");
});

// Add, Update and Delete a user Address
userRouter.put("/:id/addresses", (req, res) => {
  res.send("Update a single user addresses");
});

userRouter.post("/:id/addresses", (req, res) => {
  res.send("Add a new user address");
});

userRouter.delete("/:id/addresses", (req, res) => {
  res.send("Delete a user address");
});

// Add, Update and Delete a payment method.
userRouter.post("/:id/payment-methods", (req, res) => {
  res.send("Add a new paymet method");
});

userRouter.put("/:id/payment-methods", (req, res) => {
  res.send("Update existing payment method");
});

userRouter.delete("/:id/payment-methods", (req, res) => {
  res.send("Delete a payment method");
});

export default userRouter;
