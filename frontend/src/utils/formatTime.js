/*
Parameters: seconds - total time in seconds

Returns: string formatted as "H:MM:SS" or "M:SS"
*/
export const formatTime = (seconds) => {
  if (!seconds && seconds !== 0) return "";
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
