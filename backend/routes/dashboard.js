import express from "express"; 
import Run from "../models/Run.js"; 

const router = express.Router(); 

router.get("/weeklySummary/:date", async (req, res) => {
  try {
    const { date } = req.params;

    const weekStart = new Date(date);
    const weekStartStr = weekStart.toISOString().split("T")[0];

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    const weekEndStr = weekEnd.toISOString().split("T")[0];


    const runsInWeek = await Run.find({
      date: {
        $gte: weekStartStr,
        $lt: weekEndStr,
      },
    }).sort({ date: 1 });

    res.json({
      weekStart: weekStartStr,
      weekEnd: weekEndStr,
      totalRuns: runsInWeek.length,
      runs: runsInWeek,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching weekly summary" });
  }
});

export default router; 