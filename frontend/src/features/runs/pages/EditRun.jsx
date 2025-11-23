import { useParams } from "react-router-dom"; 
import { useEffect, useState } from "react"; 
import Card from "@/components/ui/Card.jsx";
import RunMap from "@/features/runs/components/RunMap.jsx"; 

export default function EditRun () {
  const { id } = useParams(); 
  const [run, setRun] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"; 


  useEffect(() => {
    const fetchRun = async () => {
      try {
        const res = await fetch(`${API_URL}/api/runs/${id}`);
        const data = await res.json(); 
        setRun(data); 
      } catch (err) {
        console.error("Error fetching run, ", err);
      } finally {
        setLoading(false); 
      }
    }

    fetchRun(); 
  }, [id]);

  if (loading) return <Card>Loading...</Card>; 
  if (!run) return <Card>Run not found</Card>;

  return (
    <div>
      <Card title="Edit Run" sunken="false"></Card>
      <RunMap route={run.route} />
    </div>
  );
}