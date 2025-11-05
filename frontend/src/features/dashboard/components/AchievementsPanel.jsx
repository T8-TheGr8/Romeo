import "../styles/AchievementsPanel.css";

export default function AchievementsPanel({ achievements, onSelect }) {
  return (
    <div className="achievements-panel card">
      <h3 className="panel-title">Achievements -  (Example... Coming Soon)</h3>

      <ul className="achievement-list">
        {achievements.map((ach, index) => (
          <li 
            key={index}
            className="achievement-item sunken"
            onClick={() => onSelect && onSelect(ach)}
          >
            <span className="achievement-name">{ach.name}</span>
            <span className="achievement-date">{ach.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
