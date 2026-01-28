import { Op } from "sequelize";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const user = await User.findOne({
    where: {
      [Op.or]: {
        name: name,
        email: email,
      },
    },
  });
  if (user) {
    return res
      .status(409)
      .json({ message: "user exists with email or password" });
  }
  const newUser = await User.create({ name: name, email: email });

  res.status(201).json({ success: true, message: "Registration success" });
};

const login = async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findOne({
    where: {
      name: name,
      email: email,
    },
  });

  if (!user) {
    return res.status(403).json({ message: "user not found" });
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.SESSION_SECRET, {
    expiresIn: "7d",
  });

  res.status(200).json({ success: true, user: payload, token });
};

const logout = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "No active session" });
  }
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Could not log out" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
};
export { register, login, logout };
