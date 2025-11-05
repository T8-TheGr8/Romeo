import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [useAltTheme, setUseAltTheme] = useState()

  useEffect(() => {
    const root = document.documentElement; 
    if (useAltTheme) {
      root.classList.add("rework");
    } else {
      root.classList.remove("rework");
    }
    localStorage.setItem("useAltTheme", useAltTheme);
  }, [useAltTheme]);

  return (
    <button className="btn" onClick={() => setUseAltTheme((prev) => !prev)}>
      {useAltTheme ? "Switch to Default Theme" : "Switch to Reworked Theme"}
    </button>
  );
}
