import { useParams, useNavigate } from "react-router-dom";
import { useRunContext } from "@/context/RunContext";
import RunMap from "../components/RunMap";
import { formatDate } from "@/utils/formatDate";
import { formatTime } from "@/utils/formatTime";
import { formatPace } from "@/utils/formatPace";
import SplitChart from "../components/SplitChart"; 
import "../styles/RunDetails.css";

export default function RunDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { runs } = useRunContext();
  const { deleteRun } = useRunContext(); 
  const run = runs.find((r) => r._id === id);

  if (!run) {
    return (
      <div className="run-details-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <p>Run not found.</p>
      </div>
    );
  }

  return (
    <div className="run-details-page">
      <button className="btn" onClick={() => navigate(-1)}>
        ← Back to Runs
      </button>

      <div className="card">
        <h2>Run Details</h2>
        <div className="sunken">
          {run.name && (
            <p>
              <strong>Name:</strong> {run.name}
            </p>
          )}
          <p>
            <strong>Date:</strong> {formatDate(run.date)}
          </p>
          <p>
            <strong>Distance:</strong> {parseFloat(run.distance).toFixed(2)} mi
          </p>
          <p>
            <strong>Running Time:</strong> {formatTime(run.duration)}
          </p>
          {run.elapsedTime && (
            <p>
              <strong>Elapsed Time:</strong> {formatTime(run.elapsedTime)}
            </p>
          )}
          <p>
            <strong>Pace:</strong> {formatPace(run.duration, run.distance)}
          </p>
          {run.notes && (
            <p>
              <strong>Notes:</strong> {run.notes}
            </p>
          )}
        </div>
      </div>

      {!run.route || run.route.length === 0 ? (
        <div className="no-gps card">
          <p>GPS data not available for this run.</p>
        </div>
      ) : (
        <>
          <div className="run-map card">
            <RunMap route={run.route} />
          </div>
        </>
      )}
      {!run.route || run.route.length === 0 ? (
        <div className="run-splits card">
          <span>Splits Chart Coming Soon 📊</span>
        </div>
      ) : (
        <SplitChart run={run} />
      )}

      <button
        className="btn"
        onClick={async () => {
          if (!window.confirm("Are you sure you want to delete this run?"))
            return;

          const password = prompt(
            "Deletion is password protected because it is irreversible. Please contact me for a demo of this feature."
          );
          if (!password) return;

          try {
            await deleteRun(run._id, password);
            navigate("/runs");
          } catch (err) {
            alert("Incorrect password — run was not deleted.");
          }
        }}
      >
        Delete Run
      </button>
    </div>
  );
}
