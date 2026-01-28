import jwt from "jsonwebtoken";

const authMiddle = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.SESSION_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.log("JWT Error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
export { authMiddle };
