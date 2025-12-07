import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { RunProvider } from "./context/RunContext.jsx";
import Navbar from "@/components/layout/Navbar.jsx";
import Dashboard from "@/features/dashboard/pages/Dashboard.jsx";
import Runs from "@/features/runs/pages/Runs.jsx";
import RunDetails from "@/features/runs/pages/RunDetails.jsx";
import Upload from "@/features/upload/pages/Upload.jsx";
import Settings from "@/features/settings/pages/Settings.jsx";
import EditRun from "@/features/runs/pages/EditRun.jsx";
import WeeklySummaryPage from "@/features/dashboard/pages/WeeklySummaryPage.jsx";
import "./styles/App.css";
import "./components/layout/ScrollToTop.jsx";
import ScrollToTop from "./components/layout/ScrollToTop.jsx";
import { AnimatePresence } from "framer-motion";

export default function App() {
  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("useAltTheme") === "true";

    if (storedTheme) {
      root.classList.add("rework");
    } else {
      root.classList.remove("rework");
    }
  }, []);

  function Layout() {
    const location = useLocation();
    const hideNavbar = location.pathname.startsWith("/sideProject");

    return (
      <>
        {!hideNavbar && <Navbar />}
        <div className="app-container">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/runs" element={<Runs />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/runs/:id" element={<RunDetails />} />
              <Route path="/edit/:id" element={<EditRun />} />
              <Route
                path="/dashboard/weeklySummary/:date"
                element={<WeeklySummaryPage />}
              />
            </Routes>
          </AnimatePresence>
        </div>
      </>
    );
  }

  return (
    <RunProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout />
      </BrowserRouter>
    </RunProvider>
  );
}
