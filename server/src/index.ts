import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import pool from "./.config/db";
import passport from "passport";
import User from "./models/user";
import session from "express-session";
import connectSessionSequelize from "connect-session-sequelize";
import sequelize from "./models/index";
import { Strategy as LocalStrategy } from "passport-local";

// Store initialization
const SequelizeStore = connectSessionSequelize(session.Store);

// Express Initialization
const app = express();
const port = process.env.PORT as string;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    name: "lock-in-session-id",
    secret: process.env.PORT || "thisisasecret",
    store: new SequelizeStore({
      db: sequelize,
      expiration: 30 * 24 * 60 * 60 * 1000,
    }),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

// Passport Initialization
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async function (
      email: string,
      password: string,
      done: (error: any, user?: any, options?: any) => void
    ) {
      try {
        console.log(email, password);
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
          console.log("user not found");
          return done(null, false, { message: "Incorrect email or password" });
        }
        console.log("user found");

        const isValid = await user.verifyPassword(password);
        console.log("Is Valid:", isValid);

        if (!isValid) {
          return done(null, false, { message: "Incorrect email or password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id as number);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(passport.initialize());
app.use(passport.session());

app.get("/", async (req: Request, res: Response) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`The database name is ${result.rows[0].current_database}`);
});

app.post("/api/signup", async (req: Request, res: Response) => {
  console.log(req.body);
  const { username, password, email } = req.body;

  const userExists = await User.findOne({ where: { email: email } });
  if (userExists) {
    res.status(401).json({ message: "User Already Exists" });
  }

  const newUser = await User.create(req.body);
  await newUser.save();
  res.status(200).json({ message: "New User Created", userExists });
});

app.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err: any, user?: any, info?: any) => {
    console.log("IIII MADDDDE ITTTT INSIDEEEE");
    if (err)
      return res.status(500).json({ message: "Server error", error: err });

    if (!user)
      return res.status(400).json({ message: info?.message || "Login failed" });

    req.login(user, (err) => {
      if (err)
        return res.status(500).json({ message: "Login failed", error: err });

      return res.status(200).json({ message: "Logged in successfully", user });
    });
  })(req, res, next);
});

app.post("/api/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("test-cookie");
    res.send({ message: "Logged out successfully" });
  });
});

app.get("/api/session", async (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

app.listen(port, () => {
  console.log(`Server started on localhost:${port}`);
});
