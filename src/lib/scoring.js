export const clamp = (n, min = 0, max = 100) => Math.min(max, Math.max(min, n));

export const levelFromScore = (score) => {
  if (score < 34) return "Low";
  if (score < 67) return "Moderate";
  return "High";
};

export const barColor = (score, reverse = false) => {
  if (!reverse) {
    if (score < 34) return "bg-safe";
    if (score < 67) return "bg-warn";
    return "bg-risk";
  }

  if (score < 34) return "bg-risk";
  if (score < 67) return "bg-warn";
  return "bg-safe";
};
