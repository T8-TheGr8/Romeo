export const formatDate = (isoDate) => {
  if (!isoDate) return ""; 
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(y, m - 1, d); 

  const now = new Date();
  now.setHours(0, 0, 0, 0); 

  const target = new Date(date); 
  target.setHours(0, 0, 0, 0); 

  const diffDays = Math.floor((now - target) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";

  const weekday = date.toLocaleString("en-US", { weekday: "short" });
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${weekday}, ${month} ${day}, ${year}`;
};