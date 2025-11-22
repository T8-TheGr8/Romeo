import Card from "@/components/ui/Card.jsx";
import "../styles/AchievementsPanel.css";

export default function AchievementsPanel({ achievements, onSelect }) {
  return (
    <Card title="Achievements - (Example... Coming Soon)" sunken="true">
      <ul className="achievement-list">
        {achievements.map((ach, index) => (
          <li
            key={index}
            className="achievement-item"
            onClick={() => onSelect && onSelect(ach)}
          >
            <span className="metric-value achievement">{ach.name}</span>
            <span className="metric-title">{ach.date}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
