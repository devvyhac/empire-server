import { randomUUID } from "node:crypto"; // For Node.js
import axios from "axios";
import Order from "../models/order.model.js";
const {
  PAYSTACK_SECRET_KEY,
  PAYSTACK_INIT_PAYMENT_URL,
  PAYSTACK_VERIFY_PAYMENT_URL,
} = process.env;

export const generateSecureOrderId = () => {
  const prefix = "ORD";
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const uuid = randomUUID().split("-")[0].toUpperCase(); // Just use a part of the UUID

  return `${prefix}-${year}${month}${day}-${uuid}`;
};

const initializeTransaction = async (email, amount, reference) => {
  const payload = {
    email: email,
    amount: Number(amount),
    reference: reference,
  };

  const response = await axios.post(PAYSTACK_INIT_PAYMENT_URL, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    },
  });

  return response;
};

const verifyTransaction = async (reference) => {
  const response = await axios.get(
    `${PAYSTACK_VERIFY_PAYMENT_URL}/${reference}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  return response.data;
};

export const placeOrder = async (req, res) => {
  // GENERATING UNIQUE RANDOM ORDER_ID
  const orderId = generateSecureOrderId();

  // CRAFTING PAYLOADS FOR PAYSTACK INITIALIZE PAYMENT.
  const email = req.body.email;
  const amount = req.body.totalAmount * 100;
  const reference = orderId;
  // CRAFTING ORDER DETAILS TO INITIALLY SAVE TO DATABASE WITH PAYMENT_STATUS (PENDING)
  const order = req.body.order;
  order.totalAmount = amount;
  order.orderId = orderId;

  try {
    // Check the values before the function call
    const existingOrder = await Order.findOne({
      buyer: req.user.userId,
      paymentStatus: "pending",
    });
    if (existingOrder) {
      const newOrderId = generateSecureOrderId();
      const response = await initializeTransaction(email, amount, newOrderId);
      const { data } = response.data;
      existingOrder.items = req.body.order.items;
      existingOrder.totalAmount = amount;
      existingOrder.orderId = newOrderId;
      existingOrder.accessCode = data.access_code;
      await existingOrder.save();
      return res.status(200).json({ access_code: data.access_code });
    }

    // REQUESTING FOR A PAYMENT ACCESS CODE FROM PAYSTACK FROM HERE
    const response = await initializeTransaction(email, amount, reference);
    const { data } = response.data;

    // CRAFTING THE ORDER TO BE SAVED WITH PAYMENT STATUS (PENDING) AND CREATING AN ORDER
    order.accessCode = data.access_code;
    await Order.create({
      buyer: order.buyer,
      items: order.items,
      totalAmount: order.totalAmount,
      orderId: order.orderId,
      accessCode: order.accessCode,
      shippingDetails: order.shippingDetails,
    });

    return res.status(200).json({ access_code: data.access_code });
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Paystack API Error:", error.response.data);
      return res.status(400).json(error.response.data);
      //   throw new Error(error.response.data.message || "API error occurred");
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received from Paystack:", error.request);
      return res
        .status(500)
        .json({ success: false, error: error.request.message });
      //   throw new Error("No response from API");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Request setup error:", error.message);
      return res.status(401).json(error);
      //   throw new Error("Failed to send request");
    }
  }
};

export const verifyOrder = async (req, res) => {
  try {
    const reference = req.body.reference;
    const response = await verifyTransaction(reference);
    const { data } = response;
    console.log(data);

    if (response.status === true) {
      const order = await Order.findOne({ orderId: data.reference });
      console.log(order);
      order.paymentStatus = "completed";
      await order.save();
      console.log(order);
      return res.status(200).json({
        status: true,
        message: "Payment Success! Order now pending...",
      });
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Paystack API Error:", error.response.data);
      return res.status(400).json(error.response.data);
      //   throw new Error(error.response.data.message || "API error occurred");
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received from Paystack:", error.request);
      return res
        .status(500)
        .json({ success: false, error: error.request.message });
      //   throw new Error("No response from API");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Request setup error:", error.message);
      return res.status(401).json(error);
      //   throw new Error("Failed to send request");
    }
  }
};
