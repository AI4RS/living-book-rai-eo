import { MAP_SCENES } from "../content/mapScenes";

// Resolve a theme token name to a CSS color (see :root in index.css).
const tone = (name, alpha = 1) => `rgb(var(--color-${name}) / ${alpha})`;

export default function DummyMapPanel({ sceneKey }) {
  const scene = MAP_SCENES[sceneKey];
  if (!scene) return null;

  return (
    <article className="card p-4">
      <h3 className="section-label">{scene.title}</h3>
      <p className="mb-3 mt-1 text-xs text-muted">{scene.subtitle}</p>
      <div className="overflow-hidden border border-line bg-subtle">
        <svg viewBox="0 0 620 320" className="h-60 w-full" role="img" aria-label={scene.title}>
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`grid-v-${i}`}
              x1={i * 88}
              y1="0"
              x2={i * 88}
              y2="320"
              style={{ stroke: tone("line") }}
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
              style={{ stroke: tone("line") }}
              strokeWidth="1"
            />
          ))}
          {scene.hotzones.map((zone, index) => (
            <circle
              key={`zone-${index}`}
              cx={zone.x}
              cy={zone.y}
              r={zone.r}
              className="map-heat"
              style={{ fill: tone(zone.color, 0.08), animationDelay: zone.delay }}
            />
          ))}
          {scene.routes.map((route, index) => (
            <line
              key={`route-${index}`}
              x1={route.x1}
              y1={route.y1}
              x2={route.x2}
              y2={route.y2}
              strokeWidth="1.5"
              className="map-track"
              style={{ stroke: tone(route.color, 0.7), animationDuration: route.duration }}
            />
          ))}
          {scene.nodes.map((node) => (
            <g key={node.label}>
              <rect
                x={node.x - 4}
                y={node.y - 4}
                width="8"
                height="8"
                className="map-node"
                style={{ fill: tone(node.color), animationDelay: node.delay }}
              />
              <text
                x={node.x + 10}
                y={node.y - 10}
                fontSize="11"
                fontFamily="ui-sans-serif, system-ui"
                style={{ fill: tone("ink") }}
              >
                {node.label}
              </text>
            </g>
          ))}
          <rect x="-200" y="0" width="160" height="320" className="map-scanline" />
        </svg>
      </div>
      <p className="mt-2 text-xs text-muted">
        Placeholder diagram for discussion; to be replaced by real EO layers.
      </p>
    </article>
  );
}
