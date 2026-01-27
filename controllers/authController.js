import { Op } from "sequelize";
import User from "../models/User.js";

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
  req.session.user = newUser;

  res.status(201).json({ success: true });
};

const login = async (req, res) => {
  console.log("hello");
  const name = req.body.name;
  const email = req.body.email;
  const user = await User.findOne({
    where: {
      [Op.and]: {
        name: name,
        email: email,
      },
    },
  });
  if (!user) {
    return res.status(403).json({ message: "user not found" });
  }
  req.session.user = user;

  res.status(201).json({ success: true, user });
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
