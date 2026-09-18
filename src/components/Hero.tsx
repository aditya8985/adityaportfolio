import { motion } from "framer-motion";
import { site } from "../data/content";
import "./Hero.css";

export function Hero() {
  return (
    <section className="hero container">
      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
      >
        {site.tagline}
      </motion.h1>
      <motion.p
        className="hero-emphasis"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
      >
        <em>* {site.emphasis}</em>
      </motion.p>
    </section>
  );
}
