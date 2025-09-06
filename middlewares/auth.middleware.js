import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Not Authorized! No token provided!",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized! Invalid or expired token!",
    });
  }
};

export default authenticate;

// 68b75a85adbd39843d02b6c2, 68b7782798208009977353e9, 68b779089820800997735432
