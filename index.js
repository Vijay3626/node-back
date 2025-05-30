import express from "express";
import authRouter from "./routes/authRoute.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
dotenv.config();
const port = 1502;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.get("/request", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/", authRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
