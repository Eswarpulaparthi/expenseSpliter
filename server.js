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
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://expense-frontend-peach-three.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    name: "MyExpenseWebAppCookieName",
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      path: "/",
    },
    store: sessionStore,
  }),
);

app.use("/auth", authRoutes);

app.use(authMiddle);
// Add this right after session middleware
app.get("/debug/session", (req, res) => {
  res.json({
    sessionID: req.sessionID,
    session: req.session,
    cookies: req.headers.cookie,
    user: req.session?.user,
    headers: {
      origin: req.headers.origin,
      host: req.headers.host,
    },
  });
});

app.get("/debug/set-test-cookie", (req, res) => {
  req.session.test = "test-value-" + Date.now();
  req.session.save((err) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json({
      message: "Cookie should be set",
      sessionID: req.sessionID,
      test: req.session.test,
    });
  });
});

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
