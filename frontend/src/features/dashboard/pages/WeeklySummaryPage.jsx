import Card from "@/components/ui/Card.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import WeeklySummary from "@/features/dashboard/components/WeeklySummary.jsx"; 
import { formatPace } from "@/utils/formatPace.js";
import { formatDate } from "@/utils/formatDate.js"; 
import RunCard from "@/features/runs/components/RunCard.jsx";


export default function WeeklySummaryPage() {
  const [stats, setStats] = useState(null); 
  const [weekInfo, setWeekInfo] = useState(null); 
  const [runs, setRuns] = useState(null); 
  const { date } = useParams();
  const navigate = useNavigate(); 

  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  function computeWeeklyStats(runs) {
    if (!runs || runs.length === 0) {
      return [
        { label: "Miles", value: "0.0" },
        { label: "Runs", value: 0 },
        { label: "Avg Pace", value: "--" },
        { label: "Longest Run", value: "0.0 mi" },
      ];
    }
    const totalMiles = runs.reduce((sum, r) => sum + (r.distance || 0), 0);
    const longestRun = Math.max(...runs.map((r) => r.distance || 0));
    const avgPaceSec = getSecondsRan(runs);

    return [
      { label: "Miles", value: totalMiles.toFixed(1) },
      { label: "Runs", value: runs.length },
      { label: "Avg Pace", value: formatPace(avgPaceSec, totalMiles) },
      { label: "Longest Run", value: `${longestRun.toFixed(1)} mi` },
    ];
  }

  function getSecondsRan(runs) {
    let totalSeconds = 0; 

    for (const i in runs) {
      totalSeconds += runs[i].duration;
    }
    return totalSeconds; 
  }

  useEffect(() => {
    async function loadWeeklySummary() {
      try {
        const res = await fetch(`${API_URL}/api/dashboard/weeklySummary/${date}`);
        const data = await res.json(); 
    
        const correctedEnd = new Date(data.weekEnd); 
        correctedEnd.setDate(correctedEnd.getDate() - 1); 

        setWeekInfo( {
          weekStart: data.weekStart, 
          weekEnd: correctedEnd.toISOString().split("T")[0],
        })


        setRuns(data.runs); 

        setStats(computeWeeklyStats(data.runs)); 
      } catch (err) {
        console.error("Error fetching weekly summary: ", err); 
      }
    }

    loadWeeklySummary(); 
  }, [date]);

  if (stats === null) {
    return (
      <div className="page">
        <button className="btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <Card title="Loading...">Shouldn't take longer than 10 seconds</Card>
      </div>
    );
  }

  return (
    <div className="page">
      <button className="btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <WeeklySummary
        stats={stats}
        title={`Week of: ${formatDate(weekInfo.weekStart)} to ${formatDate(
          weekInfo.weekEnd
        )}`}
      />
      {stats[1].value ? (
        runs.map((run) => (
          <RunCard run={run} onClick={() => navigate(`/runs/${run._id}`)} />
        ))
      ) : (
        <Card title="No Runs So Far">There's still time!</Card>
      )}
    </div>
  );
}
