import express from "express";
import Run from "../models/Run.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const runs = await Run.find().sort({ date: -1 });
    res.json(runs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch runs", error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newRun = new Run(req.body);
    const savedRun = await newRun.save();
    res.status(201).json(savedRun);
  } catch (err) {
    res.status(400).json({ message: "Failed to save run", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { password } = req.body;

  if (!password || password !== process.env.DELETE_PASSWORD) {
    return res.status.status(403).json({ message: "Unauthorized" });
  }
  
  try {
    const deleted = await Run.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Run not found" });
    res.json({ message: "Run deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete run", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const run = await Run.findById(req.params.id);

    if (!run) {
      return res.status(404).json({ message: "Run not found"});
    }

    res.json(run); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedRun = await Run.findByIdAndUpdate(req.params.id, 
      {
        name: req.body.name, 
        notes: req.body.notes
      }, 
      { new: true }
    );

    res.json(updatedRun); 
  } catch (err) {
    res.status(500).json({ error: "Failed to update run"});
  }
});

export default router;
