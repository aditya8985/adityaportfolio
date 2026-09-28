import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { GlobeConfig, Position } from "./ui/Globe";

const World = lazy(() => import("./ui/Globe").then((m) => ({ default: m.World })));

const baseConfig = {
  pointSize: 3,
  showAtmosphere: true,
  atmosphereAltitude: 0.14,
  shininess: 0.55,
  ambientLight: "#ffffff",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#f5f5f7",
  pointLight: "#ffffff",
  arcTime: 1600,
  arcLength: 0.85,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 20.5937, lng: 78.9629 },
  autoRotate: true,
  autoRotateSpeed: 0.55,
} as const;

const idleConfig: GlobeConfig = {
  ...baseConfig,
  globeColor: "#ececef",
  atmosphereColor: "#ffffff",
  emissive: "#d8d8dc",
  emissiveIntensity: 0.18,
  polygonColor: "rgba(55, 55, 62, 0.42)",
};

/** Soft sky / ocean tint on hover — still light, fits the gallery */
const hoverConfig: GlobeConfig = {
  ...baseConfig,
  globeColor: "#d7e6f2",
  atmosphereColor: "#eef6fc",
  emissive: "#b7cfe0",
  emissiveIntensity: 0.28,
  shininess: 0.7,
  polygonColor: "rgba(35, 72, 98, 0.52)",
  autoRotateSpeed: 0.85,
};

const idlePalette = ["#9a9aa3", "#7a7a82", "#8a8a92"] as const;
const hoverPalette = ["#e07a5f", "#3d9b84", "#4a7fb5"] as const;

function buildArcs(colors: readonly string[]): Position[] {
  const pick = (i: number) => colors[i % colors.length];
  return [
    { order: 1, startLat: 28.6139, startLng: 77.209, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.35, color: pick(0) },
    { order: 1, startLat: 19.076, startLng: 72.8777, endLat: 40.7128, endLng: -74.006, arcAlt: 0.4, color: pick(1) },
    { order: 2, startLat: 35.6762, startLng: 139.6503, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.2, color: pick(2) },
    { order: 2, startLat: 1.3521, startLng: 103.8198, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.25, color: pick(0) },
    { order: 3, startLat: 48.8566, startLng: 2.3522, endLat: 52.52, endLng: 13.405, arcAlt: 0.12, color: pick(1) },
    { order: 3, startLat: 34.0522, startLng: -118.2437, endLat: 37.7749, endLng: -122.4194, arcAlt: 0.1, color: pick(2) },
    { order: 4, startLat: -22.9068, startLng: -43.1729, endLat: 40.7128, endLng: -74.006, arcAlt: 0.45, color: pick(0) },
    { order: 4, startLat: 25.2048, startLng: 55.2708, endLat: 28.6139, endLng: 77.209, arcAlt: 0.22, color: pick(1) },
    { order: 5, startLat: 37.5665, startLng: 126.978, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.15, color: pick(2) },
    { order: 5, startLat: 51.5072, startLng: -0.1276, endLat: 40.7128, endLng: -74.006, arcAlt: 0.3, color: pick(0) },
    { order: 6, startLat: 12.9716, startLng: 77.5946, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.28, color: pick(1) },
    { order: 6, startLat: -33.9249, startLng: 18.4241, endLat: 48.8566, endLng: 2.3522, arcAlt: 0.5, color: pick(2) },
    { order: 7, startLat: 41.9028, startLng: 12.4964, endLat: 25.2048, endLng: 55.2708, arcAlt: 0.25, color: pick(0) },
    { order: 7, startLat: 22.3193, startLng: 114.1694, endLat: -37.8136, endLng: 144.9631, arcAlt: 0.4, color: pick(1) },
    { order: 8, startLat: 55.7558, startLng: 37.6173, endLat: 28.6139, endLng: 77.209, arcAlt: 0.32, color: pick(2) },
    { order: 8, startLat: 39.9042, startLng: 116.4074, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.45, color: pick(0) },
    { order: 9, startLat: -34.6037, startLng: -58.3816, endLat: 19.4326, endLng: -99.1332, arcAlt: 0.35, color: pick(1) },
    { order: 9, startLat: 30.0444, startLng: 31.2357, endLat: 41.0082, endLng: 28.9784, arcAlt: 0.18, color: pick(2) },
    { order: 10, startLat: -6.2088, startLng: 106.8456, endLat: 13.7563, endLng: 100.5018, arcAlt: 0.2, color: pick(0) },
    { order: 10, startLat: 13.0827, startLng: 80.2707, endLat: 25.2048, endLng: 55.2708, arcAlt: 0.22, color: pick(1) },
    { order: 11, startLat: 41.9028, startLng: 12.4964, endLat: 40.4168, endLng: -3.7038, arcAlt: 0.14, color: pick(2) },
    { order: 11, startLat: 35.6895, startLng: 139.6917, endLat: 37.7749, endLng: -122.4194, arcAlt: 0.48, color: pick(0) },
  ];
}

export function GalleryGlobe() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [hot, setHot] = useState(false);

  const config = hot ? hoverConfig : idleConfig;
  const arcs = useMemo(() => buildArcs(hot ? hoverPalette : idlePalette), [hot]);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "120px", threshold: 0.15 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const card = hostRef.current?.closest(".wg-card");
    if (!card) return;

    const onEnter = () => setHot(true);
    const onLeave = () => setHot(false);
    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, [active]);

  return (
    <div className={`wg-visual wg-globe${hot ? " is-hot" : ""}`} ref={hostRef} aria-hidden>
      <div className="wg-globe-canvas">
        {active ? (
          <Suspense fallback={<div className="wg-globe-fallback" />}>
            <World globeConfig={config} data={arcs} />
          </Suspense>
        ) : (
          <div className="wg-globe-fallback" />
        )}
      </div>
    </div>
  );
}
