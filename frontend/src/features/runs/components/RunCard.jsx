import Card from "@/components/ui/Card";
import RunMap from "./RunMap";
import { formatTime } from "@/utils/formatTime";
import { formatPace } from "@/utils/formatPace";
import { formatDate } from "@/utils/formatDate"
import "../styles/RunCard.css";

export default function RunCard({ run, onClick, title="" }) {
  const runningTime =
    typeof run.duration === "number" ? run.duration : Number(run.duration) || 0;
  const pace = formatPace(runningTime, run.distance);

  return (
    <Card title={`${title}`} className="run-card" onClick={onClick} hover layout="split">
      <div className="left-panel">
        {run.name && (
          <div>
            <h2>{run.name}</h2>
          </div>
        )}

        <div>
          <span className="metric-title">Distance</span>
          <div className="metric-value">
            {run.distance ? `${parseFloat(run.distance).toFixed(2)} mi` : "--"}
          </div>
        </div>

        <div>
          <span className="metric-title">Pace</span>
          <div className="metric-value">{pace}</div>
        </div>

        <div>
          <span className="metric-title">Time</span>
          <div className="metric-value">
            {runningTime ? formatTime(runningTime) : "--"}
          </div>
        </div>

        <div>
          <span className="metric-title">Date</span>
          <div className="metric-value">{formatDate(run.date) || "--"}</div>
        </div>

        {run.notes && <p className="note">{run.notes}</p>}
      </div>

      <div className="right-panel">
        {run.route ? <RunMap route={run.route} /> : <div>No route data</div>}
      </div>
    </Card>
  );
}
