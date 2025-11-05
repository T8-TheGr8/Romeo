import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [useAltTheme, setUseAltTheme] = useState(() => {
    return localStorage.getItem("useAltTheme") === "true";
  });

  useEffect(() => {
    const root = document.documentElement; 
    if (useAltTheme) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("useAltTheme", useAltTheme);
  }, [useAltTheme]);

  return (
    <button className="btn" onClick={() => setUseAltTheme((prev) => !prev)}>
      {useAltTheme ? "Switch to Default Theme" : "Switch to Dark Theme"}
    </button>
  );
}
