export const getWeeklyMilage = (runs) => {
  if (!runs || runs.length === 0) return [];

  const sorted = [...runs].sort((a, b) => new Date(a.date) - new Date(b.date));

  const weeks = new Map();

  sorted.forEach((run) => {
    const date = new Date(run.date);

    const monday = new Date(date);
    const day = monday.getDay();
    const diff = monday.getDate() - day + (day === 0 ? -6 : 1);
    monday.setDate(diff);
    monday.setHours(0, 0, 0, 0);

    const key = monday.toISOString();

    const miles = run.distance
    weeks.set(key, (weeks.get(key) || 0) + miles);
  });


  return [...weeks.entries()].map(([weekStart, miles]) => {
    const d = new Date(weekStart);
    const label = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    console.log(label, miles); 
    return { label, miles };
  });
}