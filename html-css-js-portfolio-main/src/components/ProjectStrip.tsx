import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/content";
import "./ProjectStrip.css";

export function ProjectStrip() {
  return (
    <section className="project-strip page-pad">
      <div className="strip-grid">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to={p.href} className="strip-card">
              <span className="strip-emoji">{p.emoji}</span>
              <div>
                <strong>{p.title}</strong>
                <small>{p.subtitle}</small>
              </div>
              <span className="strip-arrow">↗</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
