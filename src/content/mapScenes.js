// Animated placeholder map scenes, keyed by principle. Used on draft pages
// until each chapter gets its own interaction model. Colors are theme token
// names (accent | muted | risk), resolved in DummyMapPanel.
export const MAP_SCENES = {
  fairness: {
    title: "Coverage parity map",
    subtitle: "Urban/rural service balance",
    routes: [
      { x1: 90, y1: 75, x2: 300, y2: 170, color: "accent", duration: "8s" },
      { x1: 300, y1: 170, x2: 520, y2: 95, color: "muted", duration: "6s" },
      { x1: 140, y1: 250, x2: 430, y2: 230, color: "accent", duration: "7s" },
    ],
    nodes: [
      { x: 90, y: 75, color: "accent", delay: "0s", label: "Urban" },
      { x: 300, y: 170, color: "accent", delay: "0.8s", label: "Peri-urban" },
      { x: 520, y: 95, color: "muted", delay: "1.4s", label: "Remote" },
      { x: 140, y: 250, color: "accent", delay: "2s", label: "Rural" },
    ],
    hotzones: [
      { x: 510, y: 88, r: 40, color: "accent", delay: "0s" },
      { x: 160, y: 245, r: 34, color: "accent", delay: "1.2s" },
    ],
  },
  privacy: {
    title: "Redaction boundary map",
    subtitle: "Sensitive-area masking",
    routes: [
      { x1: 120, y1: 80, x2: 470, y2: 90, color: "accent", duration: "6s" },
      { x1: 470, y1: 90, x2: 470, y2: 250, color: "risk", duration: "4s" },
      { x1: 120, y1: 250, x2: 470, y2: 250, color: "accent", duration: "7s" },
    ],
    nodes: [
      { x: 120, y: 80, color: "accent", delay: "0s", label: "Public layer" },
      { x: 470, y: 90, color: "risk", delay: "0.9s", label: "Restricted" },
      { x: 470, y: 250, color: "risk", delay: "1.6s", label: "Critical site" },
      { x: 120, y: 250, color: "accent", delay: "2.1s", label: "Aggregate view" },
    ],
    hotzones: [
      { x: 470, y: 170, r: 55, color: "risk", delay: "0.5s" },
      { x: 270, y: 250, r: 36, color: "accent", delay: "1.4s" },
    ],
  },
  transparency: {
    title: "Lineage trace map",
    subtitle: "Input-to-output explainability",
    routes: [
      { x1: 80, y1: 90, x2: 250, y2: 90, color: "accent", duration: "5s" },
      { x1: 250, y1: 90, x2: 400, y2: 170, color: "accent", duration: "7s" },
      { x1: 400, y1: 170, x2: 530, y2: 235, color: "muted", duration: "6s" },
      { x1: 250, y1: 90, x2: 250, y2: 230, color: "muted", duration: "8s" },
    ],
    nodes: [
      { x: 80, y: 90, color: "accent", delay: "0s", label: "Raw scene" },
      { x: 250, y: 90, color: "muted", delay: "0.7s", label: "Preprocess" },
      { x: 400, y: 170, color: "accent", delay: "1.4s", label: "Model output" },
      { x: 530, y: 235, color: "muted", delay: "2s", label: "Decision card" },
    ],
    hotzones: [
      { x: 250, y: 165, r: 46, color: "accent", delay: "0.3s" },
      { x: 408, y: 168, r: 36, color: "accent", delay: "1.2s" },
    ],
  },
  accountability: {
    title: "Escalation ownership map",
    subtitle: "RACI and incident routing",
    routes: [
      { x1: 90, y1: 160, x2: 240, y2: 85, color: "accent", duration: "7s" },
      { x1: 240, y1: 85, x2: 390, y2: 160, color: "accent", duration: "5s" },
      { x1: 390, y1: 160, x2: 540, y2: 85, color: "muted", duration: "6s" },
      { x1: 390, y1: 160, x2: 540, y2: 245, color: "risk", duration: "4s" },
    ],
    nodes: [
      { x: 90, y: 160, color: "accent", delay: "0s", label: "Detection" },
      { x: 240, y: 85, color: "accent", delay: "0.8s", label: "Model owner" },
      { x: 390, y: 160, color: "muted", delay: "1.5s", label: "Risk board" },
      { x: 540, y: 85, color: "muted", delay: "2.2s", label: "Operations" },
      { x: 540, y: 245, color: "risk", delay: "2.8s", label: "Legal/compliance" },
    ],
    hotzones: [
      { x: 390, y: 160, r: 52, color: "accent", delay: "0.5s" },
      { x: 540, y: 245, r: 42, color: "risk", delay: "1.5s" },
    ],
  },
  robustness: {
    title: "Fallback resilience map",
    subtitle: "Sensor-switching under disruption",
    routes: [
      { x1: 95, y1: 90, x2: 280, y2: 90, color: "accent", duration: "6s" },
      { x1: 95, y1: 230, x2: 280, y2: 230, color: "muted", duration: "7s" },
      { x1: 280, y1: 90, x2: 470, y2: 160, color: "accent", duration: "5s" },
      { x1: 280, y1: 230, x2: 470, y2: 160, color: "muted", duration: "8s" },
      { x1: 470, y1: 160, x2: 540, y2: 160, color: "accent", duration: "4s" },
    ],
    nodes: [
      { x: 95, y: 90, color: "accent", delay: "0s", label: "Optical feed" },
      { x: 95, y: 230, color: "muted", delay: "0.7s", label: "SAR feed" },
      { x: 280, y: 90, color: "risk", delay: "1.4s", label: "Cloud risk" },
      { x: 280, y: 230, color: "muted", delay: "2s", label: "Fallback trigger" },
      { x: 470, y: 160, color: "accent", delay: "2.6s", label: "Fusion model" },
      { x: 540, y: 160, color: "accent", delay: "3.2s", label: "Safe output" },
    ],
    hotzones: [
      { x: 280, y: 90, r: 40, color: "risk", delay: "0.2s" },
      { x: 470, y: 160, r: 48, color: "accent", delay: "1.1s" },
    ],
  },
};
