const authMiddle = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "authentication required" });
  }
  next();
};

export { authMiddle };
