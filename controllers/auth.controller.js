import User from "../models/user.model.js";
import RefreshToken from "../models/refreshToken.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import "dotenv/config";

const accessTokenOption = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  maxAge: 15 * 60 * 1000, // 15 minutes
};

const refreshTokenOption = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(401).json({
      success: false,
      message: "Missing details",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });
    await user.save();

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const refreshToken = crypto.randomBytes(64).toString("hex");
    const refreshTokenExpiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

    await RefreshToken.create({
      refreshToken: refreshToken,
      userId: user._id,
      expiresAt: refreshTokenExpiry,
    });

    // SENDING ACCESS AND REFRESH TOKENS TO THE USE BROWSER BELOW HERE
    res.cookie("accessToken", accessToken, accessTokenOption);
    res.cookie("refreshToken", refreshToken, refreshTokenOption);
    return res.json({
      success: true,
      message: `User successfully logged in!`,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
        id: user._id,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password are required!",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User with email does not exist here.",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = crypto.randomBytes(64).toString("hex");
    const refreshTokenExpiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

    await RefreshToken.create({
      refreshToken,
      userId: user._id,
      expiresAt: refreshTokenExpiry,
    });

    // SENDING ACCESS AND REFRESH TOKENS TO THE USE BROWSER BELOW HERE
    res.cookie("accessToken", accessToken, accessTokenOption);
    res.cookie("refreshToken", refreshToken, refreshTokenOption);

    return res.json({
      success: true,
      message: `User successfully logged in!`,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
        id: user._id,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res
      .status(401)
      .json({ success: false, message: "No refresh refresh token provided" });
  }

  const storedToken = await RefreshToken.findOne({
    refreshToken: refreshToken,
  });
  if (!storedToken || storedToken.expiresAt < Date.now()) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res
      .status(401)
      .json({ success: false, message: "Invalid or Expired refresh token!" });
  }

  const accessToken = jwt.sign(
    { userId: storedToken.userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );

  res.cookie("accessToken", accessToken, accessTokenOption);

  const user = await User.findById(storedToken.userId);

  if (!user) {
    return res.json({ success: false, message: "User not found!" });
  }

  console.log("i work here");

  return res.json({
    success: true,
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
      id: user._id,
    },
  });
};

export const logout = async (req, res) => {
  const { refreshToken } = req.cookies;
  try {
    if (refreshToken) {
      await RefreshToken.deleteOne({ refreshToken: refreshToken });
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.json({ success: true, message: "Logged Out!" });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
