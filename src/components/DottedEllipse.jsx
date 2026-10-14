import { useId } from "react";

// Dotted ellipse echoing the IADF logo globe. Decorative only; size, position,
// and opacity come from className.
export default function DottedEllipse({ className = "" }) {
  const id = useId();
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 520 360"
      className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${className}`}
    >
      <defs>
        <pattern id={`${id}dots`} width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="7" fill="#D8E8F8" />
        </pattern>
        <clipPath id={`${id}el`}>
          <ellipse cx="260" cy="180" rx="250" ry="170" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}el)`}>
        <rect width="520" height="360" fill={`url(#${id}dots)`} />
      </g>
    </svg>
  );
}
