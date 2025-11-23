import { formatPace } from "@/utils/formatPace";
import { haversine } from "@/utils/haversine";
import Card from "@/components/ui/Card" 
import "../styles/SplitChart.css";

export default function SplitChart({ run }) {
  let totalDistance = 0;
  let distanceTravelled = 0;
  const MIN_SPEED = 1; // m/s (2.2mph)
  const splits = [];

  if (run.route && run.distance > 1) {
    let splitStartTime = run.route[0].time;
    for (let i = 0; i < run.route.length - 1; i++) {
      let speed = 0;
      let seconds = 0;
      distanceTravelled = haversine(run.route[i], run.route[i + 1]); // distance in meters

      seconds = (run.route[i + 1].time - run.route[i].time) / 1000;
      if (seconds > 0) {
        speed = distanceTravelled / seconds;
      }

      if (speed > MIN_SPEED) {
        totalDistance += distanceTravelled;
      } else {
        splitStartTime += seconds * 1000;
      }

      if (totalDistance >= 1609) {
        const mileSplit = (run.route[i + 1].time - splitStartTime) / 1000; // mile split in seconds
        splitStartTime = run.route[i + 1].time;
        splits.push([mileSplit, 1]);
        totalDistance -= 1609;
      }
    }
    const mileSplit =
      (run.route[run.route.length - 1].time - splitStartTime) / 1000;
    splits.push([mileSplit, totalDistance / 1609]);
  } else if (run.distance <= 1) {
    splits.push([run.duration, run.distance]);
  }

  splits[splits.length - 1][0] = splits[splits.length - 1][0] / splits[splits.length - 1][1] * (run.distance - (splits.length - 1)); 
  splits[splits.length - 1][1] = (run.distance - (splits.length - 1)); 

  return (
    <Card title="Splits">
      <table className="splits-table">
        <thead>
          <tr>
            <th>Mile</th>
            <th>Pace</th>
            <th>Distance</th>
          </tr>
        </thead>
        <tbody>
          {splits.map((s, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{formatPace(s[0], s[1])}</td>
              <td>{s[1].toFixed(2)} mi</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
