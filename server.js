import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectToDatabase from "./config/shop.db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import orderRouter from "./routes/order.routes.js";
import productRouter from "./routes/product.routes.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true,
  })
);
app.use(cookieParser());
console.log(process.env.FRONTEND);

// USING ROUTERS BELOW HERE
app.use("/api/auth/", authRouter);
app.use("/api/user/", userRouter);
app.use("/api/order/", orderRouter);
app.use("/api/products/", productRouter);

// Error handling for invalid routes
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `The requested resource ${req.originalUrl} was not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong!",
  });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  connectToDatabase();
  console.log(`Server listening on port ${PORT}`);
});

export default app;
