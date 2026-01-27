import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import session from "express-session";
import genFunc from "connect-pg-simple";
import { config } from "dotenv";
config();

import authRoutes from "./routes/authRoutes.js";
import { User, UserGroup, Group, Expense } from "./models/associations.js";
import groupRoutes from "./routes/groupRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import { authMiddle } from "./middlewares/authMiddleware.js";

const PostgresqlStore = genFunc(session);
const sessionStore = new PostgresqlStore({
  conString: process.env.DATABASE_URI,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://expense-frontend-peach-three.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none",
    },
    store: sessionStore,
  }),
);

app.use("/auth", authRoutes);

app.use(authMiddle);
app.get("/api/me", (req, res) => {
  const user = req.session.user;
  res.json({ user });
});

app.use(groupRoutes);
app.use(expenseRoutes);
try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");

  await sequelize.sync({ alter: true });
  console.log("Models synchronized successfully.");

  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
