import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRunContext } from "@/context/RunContext";
import { parseGpx } from "@/utils/parseGpx.js";
import { formatPace } from "@/utils/formatPace.js";
import { useWeeklyStats } from "@/hooks/useWeeklyStats.js";
import RunCard from "@/features/runs/components/RunCard.jsx";
import WeeklySummary from "@/features/dashboard/components/WeeklySummary.jsx";
import WeeklyMileageChart from "../components/WeeklyMileageChart.jsx";
import AchievementsPanel from "../components/AchievementsPanel.jsx";
import PageTransition from "@/components/layout/PageTransition.jsx";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [placeholderRun, setPlaceholderRun] = useState(null);
  const navigate = useNavigate();
  const { runs } = useRunContext();
  const sortedRuns = [...runs].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const latestRun = sortedRuns[0];

  useEffect(() => {
    if (runs.length === 0) {
      fetch("/assets/sample-run.gpx")
        .then((res) => res.text())
        .then(async (gpxText) => {
          const blob = new Blob([gpxText], { type: "application/gpx+xml" });
          const file = new File([blob], "sample-run.gpx", {
            type: "application/gpx+xml",
          });

          const parsed = await parseGpx(file);
          setPlaceholderRun({
            id: "demo-run",
            name: "Demo Run",
            date: parsed.date || new Date().toISOString(),
            distance: parsed.distanceMi || 3.1,
            duration: parsed.movingTime || 1600,
            elapsedTime: parsed.elapsedTime || parsed.movingTime,
            notes: "Example run — Waiting for backend server to boot up",
            route: parsed.route,
          });
        })
        .catch((err) => console.error("Error loading demo GPX:", err));
    }
  }, [runs]);

  const runToDisplay = latestRun || placeholderRun;

  const weeklyStats = useWeeklyStats();

  const achievements = [
    { name: "Fastest 10K", date: "Oct 10, 2025", runId: 1 },
    { name: "Longest Run", date: "Sep 30, 2025", runId: 2 },
    { name: "Weekly Mileage Record", date: "Sep 15, 2025", runId: 3 },
  ];

  return (
    <PageTransition>
      <div className="page">
        {runToDisplay ? (
          <RunCard
            title="Most Recent Run"
            run={{
              ...runToDisplay,
              pace: formatPace(runToDisplay.duration, runToDisplay.distance),
            }}
            onClick={() =>
              runToDisplay.id !== "demo-run" &&
              navigate(`/runs/${runToDisplay._id}`)
            }
          />
        ) : (
          <p className="no-runs">Loading demo run...</p>
        )}
        <WeeklySummary stats={weeklyStats} />
        <WeeklyMileageChart data={runs} />
        <AchievementsPanel
          achievements={achievements}
          onSelect={(ach) => alert(`Selected Achievement: ${ach.name}`)}
        />
      </div>
    </PageTransition>
  );
}
