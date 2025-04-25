import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import pool from "./.config/db";

console.log("hello");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`The database name is ${result.rows[0].current_database}`);
});

app.listen("3000", () => {
  console.log("Server started on localhost:3000");
});
