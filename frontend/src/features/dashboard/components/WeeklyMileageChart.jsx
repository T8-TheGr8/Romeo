import Card from "@/components/ui/Card";
import { getWeeklyMilage } from "@/utils/getWeeklyMileage.js";
import { useNavigate } from "react-router-dom"; 
import "../styles/WeeklyMileageChart.css";

export default function WeeklyMileageChart({ data }) {
  const weeklyData = getWeeklyMilage(data);
  const navigate = useNavigate(); 

  const maxMiles = weeklyData.length
    ? Math.max(...weeklyData.map((w) => w.miles))
    : 0;

  const roundedMax = maxMiles > 0 ? Math.ceil(maxMiles / 10) * 10 : 10;

  const ticks = [];
  for (let m = 0; m <= roundedMax; m += 10) {
    ticks.push(m);
  }

  return (
    <Card title="Weekly Mileage Chart">
      <div className="chart-wrapper">
        <div className="y-axis-labels">
          {ticks.reverse().map((tick) => (
            <span>{tick}</span>
          ))}
        </div>

        <div className="chart-container">
          {weeklyData.map((week, idx) => (
            <div className="chart-bar-wrapper" key={idx}>
              <div
                className="chart-bar"
                data-miles={`${week.miles.toFixed(2)} mi`}
                style={{ height: `${week.miles * 3 + 5}px` }}
                onClick={() =>
                  navigate(
                    `/dashboard/weeklySummary/${week.startDate.split("T")[0]}`
                  )
                }
              />
            </div>
          ))}
        </div>
        <div className="x-axis-labels">
          {weeklyData.map((week, idx) => (
            <span className="chart-label">{week.label}</span>
          ))}
        </div>

        <div className="x-axis-title">Week of (starting on Monday)</div>
      </div>
    </Card>
  );
}
