import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRunContext } from "@/context/RunContext";
import RunCard from "../components/RunCard";
import FilterBar from "../components/FilterBar";
import LoadMoreTrigger from "../components/LoadMoreTrigger";
import { formatPace } from "@/utils/formatPace";

export default function Runs() {
  const navigate = useNavigate();
  const { runs } = useRunContext();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(3);
  const triggerRef = useRef(null);

  const filteredRuns = runs
    .filter((r) => {
      const query = search.toLowerCase();

      const searchableText = [
        r.name,
        r.notes,
        r.date,
        r.type,
        r.distance?.toString(),
        formatPace(r.duration, r.distance),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    })
    .sort((a, b) => {
      if (sort === "newest") return new Date(b.date) - new Date(a.date);
      if (sort === "oldest") return new Date(a.date) - new Date(b.date);
      if (sort === "longest") return b.distance - a.distance;
      if (sort === "fastest") {
        const paceA =
          a.duration && a.distance ? a.duration / a.distance : Infinity;
        const paceB =
          b.duration && b.distance ? b.duration / b.distance : Infinity;
        return paceA - paceB;
      }
      return 0;
    });

  const visibleRuns = filteredRuns.slice(0, visibleCount);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((prev) => prev + 3);
      }
    });

    const current = triggerRef.current;
    if (current) observer.observe(current);

    return () => current && observer.unobserve(current);
  }, []);

  return (
    <div className="page">
      <FilterBar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />

      {visibleRuns.map((run) => (
        <RunCard
          key={run._id}
          run={{
            ...run,
            pace: formatPace(run.duration, run.distance),
          }}
          onClick={() => navigate(`/runs/${run._id}`)}
        />
      ))}

      <LoadMoreTrigger triggerRef={triggerRef} />
    </div>
  );
}
