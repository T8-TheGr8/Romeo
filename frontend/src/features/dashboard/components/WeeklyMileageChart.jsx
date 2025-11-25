import Card from "@/components/ui/Card";
import {getWeeklyMilage} from "@/utils/getWeeklyMileage.js";
import "../styles/WeeklyMileageChart.css";


export default function WeeklyMileageChart({ data }) {

  const weeklyData = getWeeklyMilage(data); 

  return (
    <Card title="Weekly Mileage">
      <div className="chart-wrapper">
        <div className="y-axis-title">Miles</div>

        <div className="chart-container">
          {weeklyData.map((week, idx) => (
            <div className="chart-bar-wrapper" key={idx}>
              <div
                className="chart-bar"
                style={{ height: `${week.miles * 3}px` }}
              />
              <span className="chart-label">{week.label}</span>
            </div>
          ))}
        </div>

        <div className="x-axis-title">Week of (starting on Monday)</div>
      </div>
    </Card>
  );
}
