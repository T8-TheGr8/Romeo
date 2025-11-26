/*
Parameters: isoDate - date string in ISO format

Returns: formatted date string (weekday, Mon DD, YYYY)
*/
export const formatDate = (isoDate) => {
  if (!isoDate) return ""; 
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(y, m - 1, d); 

  const now = new Date();

  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";

  const weekday = date.toLocaleString("en-US", { weekday: "short" });
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${weekday}, ${month} ${day}, ${year}`;
};
