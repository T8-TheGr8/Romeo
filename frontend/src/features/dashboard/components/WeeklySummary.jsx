import Card from "@/components/ui/Card";
import "../styles/WeeklySummary.css";
import { useNavigate } from "react-router-dom"; 

export default function WeeklySummary({ stats, title="This Week's Summary", clickable=false}) {
  const navigate = useNavigate(); 
  
  const today = new Date(); 
  const day = today.getDay(); 
  today.setHours(0, 0, 0, 0); 
  const distance = (day + 6) % 7; 

  today.setDate(today.getDate() - distance); 
  console.log(today.toISOString().split("T")[0]); 
  return (
    <Card
      title={title}
      className="weekly-summary"
      layout="row"
      onClick={clickable ? () =>
        navigate(
          `/dashboard/weeklySummary/${today.toISOString().split("T")[0]}`
        ) : undefined
      }
    >
      {stats.map((item) => (
        <div className="weekly-item" key={item.label}>
          <span className="metric-title">{item.label}</span>
          <span className="metric-value">{item.value}</span>
        </div>
      ))}
    </Card>
  );
}
