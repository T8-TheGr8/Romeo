import "../styles/WeeklySummary.css";

export default function WeeklySummary({ stats }) {
  return (
    <div className="weekly-summary card">
      {stats.map((item) => (
        <div className="weekly-item" key={item.label}>
          <span className="metric-title">{item.label}</span>
          <span className="metric-value small">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
