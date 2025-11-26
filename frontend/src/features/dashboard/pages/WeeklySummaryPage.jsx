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
    const avgPaceSec =
      runs.reduce((sum, r) => sum + (r.avgPaceSec || 0), 0) / runs.length;
    const longestRun = Math.max(...runs.map((r) => r.distance || 0));

    return [
      { label: "Miles", value: totalMiles.toFixed(1) },
      { label: "Runs", value: runs.length },
      { label: "Avg Pace", value: formatPace(avgPaceSec) },
      { label: "Longest Run", value: `${longestRun.toFixed(1)} mi` },
    ];
  }

  useEffect(() => {
    async function loadWeeklySummary() {
      try {
        const res = await fetch(`${API_URL}/api/dashboard/weeklySummary/${date}`);
        const data = await res.json(); 
    
        setWeekInfo( {
          weekStart: data.weekStart, 
          weekEnd: data.weekEnd
        })

        setRuns(data.runs); 

        const newDate = new Date(date);
        setStats(computeWeeklyStats(data.runs)); 
      } catch (err) {
        console.error("Error fetching weekly summary: ", err); 
      }
    }

    loadWeeklySummary(); 
  }, [date]);

  if (stats === null) {
    return <Card title="Loading...">Shouldn't take longer than 10 seconds</Card>
  }

  return (
    <div className="page">
      <WeeklySummary stats={stats} title={`Week of: ${formatDate(weekInfo.weekStart)} to ${formatDate(weekInfo.weekEnd)}`} />
      {stats[1].value ? runs.map(run => (
        <RunCard run={run} onClick={() => navigate(`/runs/${run._id}`)}/>
      )) : <Card title="No Runs So Far">There's still time!</Card>}
    </div>
  )
}
