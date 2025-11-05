import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RunProvider } from "./context/RunContext.jsx";
import Navbar from "@/components/layout/Navbar.jsx";
import Dashboard from "@/features/dashboard/pages/Dashboard.jsx";
import Runs from "@/features/runs/pages/Runs.jsx";
import RunDetails from "@/features/runs/pages/RunDetails.jsx";
import Upload from "@/features/upload/pages/Upload.jsx";
import Settings from "@/features/settings/components/Settings.jsx";
import "./styles/App.css";

export default function App() {
  return (
    <RunProvider>
      <BrowserRouter>
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/runs" element={<Runs />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/runs/:id" element={<RunDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </RunProvider>
  );
}

