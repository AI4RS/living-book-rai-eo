export const clamp = (n, min = 0, max = 100) => Math.min(max, Math.max(min, n));

export const levelFromScore = (score) => {
  if (score < 34) return "Low";
  if (score < 67) return "Moderate";
  return "High";
};

export const barColor = (score, reverse = false) => {
  if (!reverse) {
    if (score < 34) return "bg-emerald-500";
    if (score < 67) return "bg-amber-500";
    return "bg-rose-500";
  }

  if (score < 34) return "bg-rose-500";
  if (score < 67) return "bg-amber-500";
  return "bg-emerald-500";
};
