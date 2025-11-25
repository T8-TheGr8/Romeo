export const getWeeklyMilage = (runs) => {
    if (!runs || runs.length === 0) return [];

    const sorted = [...runs].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const getWeekStart = (date) => {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      d.setDate(diff);
      d.setHours(0, 0, 0, 0);
      return new Date(d);
    };

    const firstWeek = getWeekStart(sorted[0].date);
    const lastWeek = getWeekStart(new Date());

    const allWeeks = [];
    let current = new Date(firstWeek);

    while (current <= lastWeek) {
      allWeeks.push(new Date(current));
      current.setDate(current.getDate() + 7);
    }

    const mileageMap = new Map();

    sorted.forEach((run) => {
      const weekStart = getWeekStart(run.date).toISOString();
      const miles = run.distance || 0;
      mileageMap.set(weekStart, (mileageMap.get(weekStart) || 0) + miles);
    });

    const result = allWeeks.map((weekDate) => {
      const key = weekDate.toISOString();
      const miles = mileageMap.get(key) || 0;

      return {
        startDate: key,
        label: weekDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        miles,
      };
    });

    return result;
}