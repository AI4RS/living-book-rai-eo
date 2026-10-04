import { MAP_SCENES } from "../content/mapScenes";

export default function DummyMapPanel({ sceneKey }) {
  const scene = MAP_SCENES[sceneKey];
  if (!scene) return null;
  const gradientId = `map-bg-${sceneKey}`;

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
        {scene.title}
      </h3>
      <p className="mb-3 mt-1 text-xs text-slate-400">{scene.subtitle}</p>
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
        <svg viewBox="0 0 620 320" className="h-60 w-full">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="620" height="320" fill={`url(#${gradientId})`} />
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`grid-v-${i}`}
              x1={i * 88}
              y1="0"
              x2={i * 88}
              y2="320"
              stroke="rgba(148,163,184,0.12)"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={`grid-h-${i}`}
              x1="0"
              y1={i * 70}
              x2="620"
              y2={i * 70}
              stroke="rgba(148,163,184,0.12)"
              strokeWidth="1"
            />
          ))}
          {scene.hotzones.map((zone, index) => (
            <circle
              key={`zone-${index}`}
              cx={zone.x}
              cy={zone.y}
              r={zone.r}
              fill={zone.color}
              className="map-heat"
              style={{ animationDelay: zone.delay }}
            />
          ))}
          {scene.routes.map((route, index) => (
            <line
              key={`route-${index}`}
              x1={route.x1}
              y1={route.y1}
              x2={route.x2}
              y2={route.y2}
              stroke={route.color}
              strokeWidth="2.5"
              className="map-track"
              style={{ animationDuration: route.duration }}
            />
          ))}
          {scene.nodes.map((node) => (
            <g key={node.label}>
              <circle
                cx={node.x}
                cy={node.y}
                r="6"
                fill={node.color}
                className="map-node"
                style={{ animationDelay: node.delay }}
              />
              <text
                x={node.x + 10}
                y={node.y - 10}
                fill="#cbd5e1"
                fontSize="11"
                fontFamily="ui-sans-serif, system-ui"
              >
                {node.label}
              </text>
            </g>
          ))}
          <rect x="-200" y="0" width="160" height="320" className="map-scanline" />
        </svg>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Dummy animated map placeholder for discussion and future real EO layer
        integration.
      </p>
    </article>
  );
}
