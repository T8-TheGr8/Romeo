import express from "express"; 
import Run from "../models/Run.js"; 

const router = express.Router(); 

router.get("/weeklySummary/:date", async (req, res) => {
  try {
    const { date } = req.params;

    // Monday
    const weekStart = new Date(date);
    weekStart.setHours(0, 0, 0, 0);
    const weekStartStr = weekStart.toISOString().split("T")[0];

    // Next Monday
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    const weekEndStr = weekEnd.toISOString().split("T")[0];

    console.log("Querying from", weekStartStr, "to", weekEndStr);

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