import User from "../models/user.model.js";

export const getUserData = async (req, res) => {
  const user = await User.findById(req.user.userId);
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

export const getUsersData = async (req, res) => {
  res.json({ message: "hello there" });
};
