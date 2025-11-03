import express from "express";
import cors from "cors";
import runRoutes from "./routes/runs.js";
import dotenv from "dotenv"; 
import mongoose from "mongoose"; 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.use("/api/runs", runRoutes);

export default app;
