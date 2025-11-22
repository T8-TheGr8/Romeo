import Card from "@/components/ui/Card";
import "../styles/WeeklyMileageChart.css";


export default function WeeklyMileageChart({ data }) {
  return (
    <Card title="Weekly Mileage... Coming Soon">
      <div className="chart-container">
        {data.map((week, idx) => (
          <div className="chart-bar-wrapper" key={idx}>
            <div
              className="chart-bar"
              style={{ height: `${week.miles * 3}px` }}
            ></div>
            <span className="chart-label">{week.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
