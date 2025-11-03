/*
Parameters: str - duration string in "H:MM:SS", "MM:SS", or "SS" format

Returns: total duration in seconds as a number
*/
export const parseDurationToSeconds = (str) => {
  if (!str) return 0;
  const parts = str.split(":").map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return Number(str);
};
