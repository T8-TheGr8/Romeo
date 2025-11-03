import { useMemo } from "react";
import { useRunContext } from "../context/RunContext";

export function useWeeklyStats() {
  const { runs } = useRunContext();

  return useMemo(() => {
    const today = new Date();
    const startOfWeek = new Date();
    const day = today.getDay(); // 0 = Sunday
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const thisWeeksRuns = runs.filter((run) => {
      const runDate = new Date(run.date);
      return runDate >= startOfWeek && runDate <= today;
    });

    if (thisWeeksRuns.length === 0) {
      return [
        { label: "Miles", value: "0" },
        { label: "Runs", value: "0" },
        { label: "Avg Pace", value: "--" },
        { label: "Longest Run", value: "--" },
      ];
    }
    const totalMiles = thisWeeksRuns.reduce(
      (sum, run) => sum + run.distance,
      0
    );
    const totalDuration = thisWeeksRuns.reduce(
      (sum, run) => sum + run.duration,
      0
    );
    const avgPaceSec = totalDuration / totalMiles;
    const longestRun = Math.max(...thisWeeksRuns.map((run) => run.distance));

    const formatPace = (seconds) => {
      const min = Math.floor(seconds / 60);
      const sec = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");
      return `${min}:${sec}/mi`;
    };

    return [
      { label: "Miles", value: totalMiles.toFixed(1) },
      { label: "Runs", value: thisWeeksRuns.length },
      { label: "Avg Pace", value: formatPace(avgPaceSec) },
      { label: "Longest Run", value: `${longestRun.toFixed(1)} mi` },
    ];
  }, [runs]);
}
