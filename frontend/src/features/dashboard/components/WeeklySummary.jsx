import Card from "@/components/ui/Card";
import "../styles/WeeklySummary.css";

export default function WeeklySummary({ stats, title="This Week's Summary" }) {
  return (
    <Card title={title} className="weekly-summary" layout="row">
      {stats.map((item) => (
        <div className="weekly-item" key={item.label}>
          <span className="metric-title">{item.label}</span>
          <span className="metric-value">{item.value}</span>
        </div>
      ))}
    </Card>
  );
}
