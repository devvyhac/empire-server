import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  refreshToken: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expiresAt: { type: Date, required: true },
});
const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

export default RefreshToken;
