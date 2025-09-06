import { Router } from "express";
import authenticate from "../middlewares/auth.middleware.js";
import {
  placeOrder,
  verifyOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
  getAllOrders,
  cancelOrder,
  deleteOrder,
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/", authenticate, placeOrder);
orderRouter.post("/verify", authenticate, verifyOrder);
orderRouter.get("/me", authenticate, getUserOrders);
orderRouter.get("/me/:id", authenticate, getOrderById);
orderRouter.put("/me/:id/status", authenticate, updateOrderStatus);
orderRouter.put("/me/:id/cancel", authenticate, cancelOrder);
orderRouter.delete("/me/:id", authenticate, deleteOrder);

// Payment status update route for admins
orderRouter.put("/me/:id/payment", authenticate, updatePaymentStatus);
orderRouter.get("/me", authenticate, getAllOrders);

export default orderRouter;

// , , 
// ORD-20250902-C69B84A0, ORD-20250904-3CEEC77C, 

