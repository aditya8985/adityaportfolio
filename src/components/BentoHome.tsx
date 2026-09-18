import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { site, notionDocs, restaurants } from "../data/content";
import "./BentoHome.css";

const manifesto = [
  "i design things.",
  "i think design can change things.",
  "i think the things we design are just as important as the things we choose not to.",
  "i think we should design things that do the things we don't enjoy, and make the things we do enjoy, even better.",
  "i think there are too many things.",
  "i think there should be fewer, but better things.",
  "the best things. an optimal amount.",
];
const dockApps = [
  { id: "finder", label: "Finder", color: "#5ac8fa", icon: "📁" },
  { id: "notion", label: "Notion", color: "#000", icon: "N", active: true },
  { id: "figma", label: "Figma", color: "#a259ff", icon: "F" },
  { id: "webflow", label: "Webflow", color: "#4353ff", icon: "W" },
  { id: "linear", label: "Linear", color: "#5e6ad2", icon: "L" },
  { id: "slack", label: "Slack", color: "#e01e5a", icon: "S" },
  { id: "arc", label: "Arc", color: "#1a1a1a", icon: "A" },
];

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export function BentoHome() {
  const [activeApp, setActiveApp] = useState("notion");
  const [docIndex, setDocIndex] = useState(0);
  const [looking, setLooking] = useState(false);

  return (
    <section className="bento page-pad">
      <div className="bento-top">
        <motion.div
          className="bento-card bento-intro"
          {...fadeUp}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <h1 className="intro-title">
            <strong>{site.name}</strong> is building{" "}
            <Link to="/work" className="intro-product">
              Orbit.
            </Link>
          </h1>
          <div className="intro-lines">
            {manifesto.map((line) => (
              <p key={line}>
                {line}
                {line.includes("fewer, but better") ? (
                  <span className="intro-star">*</span>
                ) : null}
              </p>
            ))}
          </div>
        </motion.div>

        <div className="bento-right">
          <button
            type="button"
            className={`look-around${looking ? " playing" : ""}`}
            onClick={() => setLooking((v) => !v)}
          >
            <Play size={11} fill="currentColor" />
            Look around...
          </button>

          <motion.div
            className="bento-card bento-workspace"
            initial={{ opacity: 0, y: 18 }}
            animate={
              looking
                ? { opacity: 1, y: [0, -6, 0] }
                : { opacity: 1, y: 0 }
            }
            transition={
              looking
                ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.25 }
            }
          >
            <div className="ws-header">
              <span className="ws-label">
                <span className="ws-notion-mark">N</span> NOTION
              </span>
            </div>

            <div className="ws-docs">
              {notionDocs.slice(0, 4).map((doc, i) => (
                <button
                  key={doc}
                  type="button"
                  className={`ws-doc${docIndex === i ? " active" : ""}`}
                  onClick={() => setDocIndex(i)}
                >
                  <span className="ws-doc-icon">📄</span>
                  <span className="ws-doc-title">{doc}</span>
                  <span className="ws-doc-sub">{site.name}'s Workspace</span>
                </button>
              ))}
            </div>

            <div className="ws-dock">
              {dockApps.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  className={`ws-app${activeApp === app.id ? " active" : ""}`}
                  onClick={() => setActiveApp(app.id)}
                  title={app.label}
                  style={{ ["--app-color" as string]: app.color }}
                >
                  <span>{app.icon}</span>
                  {app.active || activeApp === app.id ? <i className="ws-new">new</i> : null}
                </button>
              ))}
            </div>

            <Link to="/work/design-system" className="ws-link" aria-label="Open project">
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>

          <div className="bento-bottom-row">
            <motion.div
              className="bento-card bento-phone"
              initial={{ opacity: 0, y: 18 }}
              animate={
                looking
                  ? { opacity: 1, y: [0, 5, 0] }
                  : { opacity: 1, y: 0 }
              }
              transition={
                looking
                  ? { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
                  : { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.35 }
              }
            >
              <div className="phone-preview">
                <div className="pp-status">
                  <span>9:41</span>
                  <span className="pp-notch" />
                  <span>●●●</span>
                </div>
                <p className="pp-deliver">Delivering to → Brooklyn</p>
                <h3 className="pp-discover">Discover</h3>
                <div className="pp-search">Search restaurants & dishes</div>
                <div className="pp-chips">
                  {["Trivia", "Express", "Japanese", "Pizza"].map((c, i) => (
                    <span key={c} className={i === 0 ? "on" : ""}>
                      {c}
                    </span>
                  ))}
                </div>
                <div className="pp-cards">
                  {restaurants.slice(0, 2).map((r) => (
                    <div key={r.name} className="pp-card">
                      <img src={r.image} alt="" />
                      <strong>{r.name}</strong>
                      <small>{r.type}</small>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bento-card bento-social"
              {...fadeUp}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
            >
              <div className="social-head">
                <img
                  className="social-avatar"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces"
                  alt=""
                />
                <div className="social-meta">
                  <strong>{site.fullName}</strong>
                  <span>{site.handle}</span>
                </div>
                <span className="social-x" aria-hidden>
                  𝕏
                </span>
              </div>
              <p className="social-bio">
                cooking up • product design • prev{" "}
                <a href="https://figma.com" target="_blank" rel="noreferrer">
                  @figma
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
