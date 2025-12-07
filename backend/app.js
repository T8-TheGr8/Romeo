import express from "express";
import cors from "cors";
import runRoutes from "./routes/runs.js";
import dashboardRoutes from "./routes/dashboard.js"; 
import dotenv from "dotenv"; 
import mongoose from "mongoose"; 

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["https://elaborate-froyo-0477a8.netlify.app",
      "http://localhost:5173",
     ],
     methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/runs", runRoutes);
app.use("/api/dashboard", dashboardRoutes); 

export default app;
