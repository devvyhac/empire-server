import { Router } from "express";
import {
  register,
  login,
  logout,
  refreshToken,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.post("/refresh-token", refreshToken);

authRouter.post("/forgot-password", (req, res) => {
  res.send("Forgotten password");
});

authRouter.post("/reset-password", (req, res) => {
  res.send("Reset password");
});

authRouter.post("/refresh-token", (req, res) => {
  res.send("Refresh token");
});

authRouter.post("/verify-email", (req, res) => {
  res.send("Verify email");
});

authRouter.post("/resend-verification", (req, res) => {
  res.send("Resend verification email");
});

authRouter.put("/change-password", (req, res) => {
  res.send("Change your passord");
});

export default authRouter;
