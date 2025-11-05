import Card from "@/components/ui/Card"
import "../styles/FilterBar.css";

export default function FilterBar({ search, setSearch, sort, setSort }) {
  return (
    <Card className="filter-bar" layout="row" sunken="false">
      <input
        type="text"
        placeholder="Search runs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="filter-input sunken"
      />

      <select
        className="filter-select"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="longest">Longest Distance</option>
        <option value="fastest">Fastest Pace</option>
      </select>
    </Card>
  );
}
