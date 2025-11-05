import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import Card from "@/components/ui/Card"
import "../styles/Settings.css";

export default function Settings() {
  const navigate = useNavigate();
  const handleClearData = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all saved data? This will delete all your runs and cannot be undone."
    );
    if (confirmClear) {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
      <div className="settings-page">
        <div className="settings-card">
      <Card title="Data Management" layout="column">
        <div>
          <p>
            Use this option to clear all locally saved run data (used for
            testing prior to database connection)
          </p>
        </div>
        <button className="btn" onClick={handleClearData}>
          Clear All Data
        </button>
      </Card>
      </div>

      <div className="settings-card">
      <Card title="Theme Toggle" layout="column">
        <div>
          <p>Click this button to toggle themes!</p>
        </div>
        <ThemeToggle />
      </Card>
      </div>
    </div>
  );
}
