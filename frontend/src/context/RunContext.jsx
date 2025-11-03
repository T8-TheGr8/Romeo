// src/context/RunContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const RunContext = createContext();
const API_URL = "http://localhost:3000/api/runs";

export function RunProvider({ children }) {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRuns = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setRuns(data);
      } catch (err) {
        console.error("❌ Failed to fetch runs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRuns();
  }, []);

  const addRun = async (runData) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(runData),
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(`Failed to add run: ${errMsg}`);
      }

      const savedRun = await res.json();
      setRuns((prev) => [savedRun, ...prev]);
    } catch (err) {
      console.error("❌ Failed to add run:", err);
    }
  };

  const deleteRun = async (id, password) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Failed to delete run");
      }

      setRuns((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Failed to delete run:", err);
      throw err;
    }
  };

  return (
    <RunContext.Provider value={{ runs, addRun, deleteRun, loading }}>
      {children}
    </RunContext.Provider>
  );
}

export const useRunContext = () => useContext(RunContext);
