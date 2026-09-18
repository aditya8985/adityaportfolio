import { useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "./MicroPlayground.css";

const segments = ["Overview", "Insights", "Billing"] as const;

export function MicroPlayground() {
  const [seg, setSeg] = useState(0);
  const [dark, setDark] = useState(false);
  const [toast, setToast] = useState(false);
  const [pressed, setPressed] = useState(false);

  const btnRef = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 18 });
  const sy = useSpring(my, { stiffness: 260, damping: 18 });
  const shadow = useTransform(
    [sx, sy],
    (latest) => {
      const x = latest[0] as number;
      const y = latest[1] as number;
      return `${-x * 0.15}px ${8 - y * 0.1}px 24px rgba(0,0,0,0.18)`;
    },
  );

  const onMove = (e: MouseEvent) => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    const pull = Math.max(0, 1 - dist / 140);
    mx.set(dx * 0.28 * pull);
    my.set(dy * 0.28 * pull);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const fireToast = () => {
    setToast(true);
    window.setTimeout(() => setToast(false), 2200);
  };

  return (
    <div className={`micro-play${dark ? " is-dark" : ""}`}>
      <p className="micro-play-kicker">Live playground — try these</p>

      <div className="micro-play-grid">
        <div className="micro-card">
          <span className="micro-label">Morphing segments</span>
          <div className="micro-seg" role="tablist" aria-label="Segmented control">
            <motion.span
              className="micro-seg-pill"
              layout
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              style={{
                width: `calc((100% - 8px) / ${segments.length})`,
                left: `calc(4px + ((100% - 8px) / ${segments.length}) * ${seg})`,
              }}
            />
            {segments.map((label, i) => (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={seg === i}
                className={seg === i ? "is-on" : undefined}
                onClick={() => setSeg(i)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="micro-card" onMouseMove={onMove} onMouseLeave={reset}>
          <span className="micro-label">Magnetic CTA</span>
          <motion.button
            ref={btnRef}
            type="button"
            className="micro-magnet"
            style={{ x: sx, y: sy, boxShadow: shadow }}
            whileTap={{ scale: 0.96 }}
            onClick={fireToast}
          >
            Save changes
          </motion.button>
        </div>

        <div className="micro-card">
          <span className="micro-label">Theme bloom</span>
          <button
            type="button"
            className={`micro-toggle${dark ? " is-on" : ""}`}
            aria-pressed={dark}
            onClick={() => setDark((v) => !v)}
          >
            <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 34 }} />
            <em>{dark ? "Dark" : "Light"}</em>
          </button>
        </div>

        <div className="micro-card">
          <span className="micro-label">Soft press depth</span>
          <motion.button
            type="button"
            className="micro-press"
            animate={{
              scale: pressed ? 0.94 : 1,
              y: pressed ? 2 : 0,
              boxShadow: pressed
                ? "0 2px 6px rgba(0,0,0,0.12)"
                : "0 10px 24px rgba(0,0,0,0.12)",
            }}
            transition={{ type: "spring", stiffness: 520, damping: 28 }}
            onPointerDown={() => setPressed(true)}
            onPointerUp={() => setPressed(false)}
            onPointerLeave={() => setPressed(false)}
            onClick={fireToast}
          >
            Tap me
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="micro-toast"
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
          >
            Saved — motion feels right
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
