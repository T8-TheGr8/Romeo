import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ReadMeModal from "../ui/ReadMeModal";
import "../styles/Navbar.css";

export default function Navbar() {
  const [showReadMe, setShowReadMe] = useState(false);
  
  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenReadMe");
    if (!hasSeen) {
      setShowReadMe(true); 
      localStorage.setItem("hasSeenReadMe", "true");
    }
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <span
            className="brand"
            onClick={() => setShowReadMe(true)}
            style={{ cursor: "pointer" }}
          >
            ROMEO
          </span>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/" end>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/runs">Runs</NavLink>
          </li>
          <li>
            <NavLink to="/upload">Upload</NavLink>
          </li>
          <li>
            <NavLink to="/settings">Settings</NavLink>
          </li>
        </ul>
      </nav>

      <ReadMeModal show={showReadMe} onClose={() => setShowReadMe(false)} />
    </>
  );
}
