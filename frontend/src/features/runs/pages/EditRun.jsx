import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "@/components/ui/Card.jsx";
import RunMap from "@/features/runs/components/RunMap.jsx";
import SplitChart from "@/features/runs/components/SplitChart.jsx";
import RunInput from "@/features/upload/components/RunInput.jsx";
import { useRunContext } from "@/context/RunContext.jsx";
import PageTransition from "@/components/layout/PageTransition.jsx";

export default function EditRun() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateRun } = useRunContext();

  const [run, setRun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [runTitle, setRunTitle] = useState("");
  const [runNotes, setRunNotes] = useState("");

  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchRun = async () => {
      try {
        const res = await fetch(`${API_URL}/api/runs/${id}`);
        const data = await res.json();

        setRun(data);
        setRunNotes(data.notes || "");
        setRunTitle(data.name || "");
      } catch (err) {
        console.error("Error fetching run, ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRun();
  }, [id]);

  const saveEdits = async () => {
    try {
      const res = await fetch(`${API_URL}/api/runs/${run._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: runTitle,
          notes: runNotes,
        }),
      });

      const updated = await res.json();
      updateRun(updated);
      if (res.ok) navigate(`/runs/${run._id}`);
    } catch (err) {
      console.error("Failed to save: ", err);
    }
  };

  if (loading) return <Card>Loading...</Card>;
  if (!run) return <Card>Run not found</Card>;

  return (
    <PageTransition>
      <div className="page">
        <button className="btn" onClick={() => navigate(-1)}>
          Back
        </button>
        <Card title="Edit Run" sunken="false">
          <RunInput
            label="Title:"
            onChange={(e) => setRunTitle(e.target.value)}
            value={runTitle}
            placeholder={runTitle}
          />
          <RunInput
            label="Notes:"
            onChange={(e) => setRunNotes(e.target.value)}
            multiline={true}
            value={runNotes}
            placeholder={runNotes}
          />
          <button className="btn" onClick={saveEdits}>
            Save
          </button>
        </Card>
        {!run.route || run.route.length === 0 ? (
          <Card>
            <p>GPS data not available for this run.</p>
          </Card>
        ) : (
          <>
            <div className="run-map">
              <RunMap route={run.route} />
            </div>
          </>
        )}
        {!run.route || run.route.length === 0 ? (
          <Card>
            <span>Split chart not available for this run</span>
          </Card>
        ) : (
          <SplitChart run={run} />
        )}
      </div>
    </PageTransition>
  );
}
