// src/utils/generateRunName.js

const BASE_NAMES = [
  "Steady Strides",
  "Finding My Pace",
  "Forward Motion",
  "Run and Done",
  "Road Rhythm",
  "Mind Over Miles",
  "One Foot Forward",
  "Mile by Mile",
  "Run the Day",
  "Pace and Purpose",
];

// Time-based additions
const TIME_BASED = {
  morning: ["Sunrise Miles", "Morning Strides", "Early Light Run"],
  afternoon: ["Midday Miles", "Lunch Break Run", "Afternoon Stride"],
  evening: ["Sunset Strides", "Evening Effort", "Golden Hour Run"],
  night: ["City Lights Run", "Night Miles", "Quiet Roads Run"],
};

// Distance-based additions
const DISTANCE_BASED = {
  short: ["Quick Run", "Short Strides", "Easy Miles"],
  medium: ["Steady Miles", "Daily Distance", "Rolling Miles"],
  long: ["Long Run", "Weekend Distance", "Endurance Miles"],
  marathon: ["Marathon Prep", "Big Miles Day", "The Extra Mile"],
};

// Determine which time bucket a run belongs in
function getTimeOfDay(dateString) {
  const d = new Date(dateString);
  const hour = d.getHours();
  if (hour >= 4 && hour < 10) return "morning";
  if (hour >= 10 && hour < 16) return "afternoon";
  if (hour >= 16 && hour < 21) return "evening";
  return "night";
}

// Determine distance category
function getDistanceCategory(distance) {
  if (distance < 3) return "short";
  if (distance < 6) return "medium";
  if (distance < 12) return "long";
  return "marathon";
}

export function generateRunName(date, distance) {
  const timeKey = getTimeOfDay(date);
  const distKey = getDistanceCategory(distance);

  // Priority: Time-based name if available
  const timeOption = TIME_BASED[timeKey] || [];
  const distOption = DISTANCE_BASED[distKey] || [];

  // Prefer a combo like "Sunrise Miles" or "Long Run"
  const options = [...timeOption, ...distOption, ...BASE_NAMES];

  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
