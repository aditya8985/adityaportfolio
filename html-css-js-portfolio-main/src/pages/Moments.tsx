import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { momentShots, type MomentShot } from "../data/moments";
import "./Moments.css";

function pinHeight(i: number) {
  const pattern = [280, 360, 240, 320, 400, 260, 340, 300];
  return pattern[i % pattern.length];
}

export function Moments() {
  const [active, setActive] = useState<MomentShot | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const idx = momentShots.findIndex((m) => m.src === active.src);
        if (idx < 0) return;
        const next =
          e.key === "ArrowRight"
            ? momentShots[(idx + 1) % momentShots.length]
            : momentShots[(idx - 1 + momentShots.length) % momentShots.length];
        setActive(next);
      }
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <main className="page moments-page">
      <div className="moments-shell page-pad">
        <header className="moments-hero">
          <Link to="/" className="moments-back">
            <ArrowLeft size={16} strokeWidth={2} />
            Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="moments-kicker">Personal scrapbook</p>
            <h1>Small Moments</h1>
            <p className="moments-lead">
              Sketches, street rides, snacks, and the little frames that feel like home.
            </p>
          </motion.div>
        </header>

        <div className="moments-masonry">
          {momentShots.map((pin, i) => (
            <motion.button
              key={pin.src}
              type="button"
              className={`moments-pin tone-${pin.tone}`}
              style={{ "--pin-h": `${pinHeight(i)}px` } as CSSProperties}
              onClick={() => setActive(pin)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="moments-pin-media">
                <img src={pin.src} alt={pin.caption} loading="lazy" />
              </span>
              <span className="moments-pin-meta">
                <b>{pin.label}</b>
                <em>{pin.caption}</em>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="moments-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              className="moments-lightbox-close"
              aria-label="Close"
              onClick={() => setActive(null)}
            >
              <X size={20} />
            </button>
            <motion.figure
              className="moments-lightbox-card"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={active.src} alt={active.caption} />
              <figcaption>
                <b>{active.label}</b>
                <span>{active.caption}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
