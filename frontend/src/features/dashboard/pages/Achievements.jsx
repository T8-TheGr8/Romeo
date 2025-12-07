import { useNavigate } from "react-router-dom"; 

export default function Achievements() {
  const navigate = useNavigate(); 
  return (
    <div className="page">
      <button className="btn" onClick={() => navigate(-1)}>← Back</button>
    </div>
  );
}
