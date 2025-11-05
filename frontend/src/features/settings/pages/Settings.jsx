import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
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
      <div className="settings-card card">
        <h3>Data Management</h3>
        <p>
          Use this option to clear all locally saved run data (used for testing
          prior to database connection)
        </p>

        <button className="btn" onClick={handleClearData}>
          Clear All Data
        </button>
      </div>
      <div className="card">
        <h3>Theme Toggle</h3>
        <ThemeToggle />
      </div>
    </div>
  );
}
