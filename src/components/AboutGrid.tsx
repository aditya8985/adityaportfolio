import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aboutParagraphs, listening, photos, site } from "../data/content";
import { Play, Pause } from "lucide-react";
import "./AboutGrid.css";

export function AboutGrid() {
  const [playing, setPlaying] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [photo, setPhoto] = useState(0);

  return (
    <div className="about-layout container">
      <div className="about-copy">
        {aboutParagraphs.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
          >
            {p}
          </motion.p>
        ))}
      </div>

      <div className="about-widgets">
        <motion.div
          className="widget twitter"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="tw-head">
            <div className="tw-avatar">{site.name.charAt(0)}</div>
            <div>
              <strong>{site.fullName}</strong>
              <small>{site.handle}</small>
            </div>
          </div>
          <p>cooking up something new · design + code · less, but better.</p>
        </motion.div>

        <motion.div
          className="widget music"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          <div className="music-now">
            <img src={listening[playing].cover} alt="" />
            <div>
              <small>Now playing</small>
              <strong>{listening[playing].title}</strong>
              <span>{listening[playing].artist}</span>
            </div>
            <button
              className="music-play"
              onClick={() => setIsPlaying((v) => !v)}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            </button>
          </div>
          <div className="music-list">
            {listening.map((track, i) => (
              <button
                key={track.title}
                className={`music-row${playing === i ? " active" : ""}`}
                onClick={() => {
                  setPlaying(i);
                  setIsPlaying(true);
                }}
              >
                <img src={track.cover} alt="" />
                <div>
                  <strong>{track.title}</strong>
                  <small>{track.artist}</small>
                </div>
              </button>
            ))}
          </div>
          {isPlaying && (
            <div className="music-bars" aria-hidden>
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  animate={{ scaleY: [0.4, 1, 0.55, 0.9, 0.4] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.08 }}
                />
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          className="widget photos"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div
            className="photo-stage"
            role="button"
            tabIndex={0}
            aria-label="Tap to see next photo"
            onClick={() => setPhoto((i) => (i + 1) % photos.length)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setPhoto((i) => (i + 1) % photos.length);
              }
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={photo}
                src={photos[photo]}
                alt=""
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              />
            </AnimatePresence>
          </div>
          <div className="photo-thumbs">
            {photos.map((src, i) => (
              <button key={src} className={photo === i ? "active" : ""} onClick={() => setPhoto(i)}>
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
