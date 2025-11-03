import "../styles/FilterBar.css";

export default function FilterBar({ search, setSearch, sort, setSort }) {
  return (
    <div className="filter-bar card">
      <input
        type="text"
        placeholder="Search runs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="filter-input"
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
    </div>
  );
}
