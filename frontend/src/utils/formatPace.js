/*
Parameters: duration - total time in seconds
            distance - total distance in miles 

Returns: string formatted as "7:00/mi" 
*/
export const formatPace = (duration, distance) => {
  if (!duration || !distance) return "--";
  const secPerMile = duration / parseFloat(distance);
  const mins = Math.floor(secPerMile / 60);
  const secs = Math.round(secPerMile % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}/mi`;
};
