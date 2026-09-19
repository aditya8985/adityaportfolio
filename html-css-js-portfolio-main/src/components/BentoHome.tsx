import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, ThumbsUp, Globe2 } from "lucide-react";
import { site, restaurants } from "../data/content";
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
  { id: "notion", label: "Notion", logo: "/dock/notion.svg" },
  { id: "figma", label: "Figma", logo: "/dock/figma.svg" },
  { id: "procreate", label: "Procreate", logo: "/dock/procreate.png", cover: true },
  { id: "certifications", label: "Certifications", logo: "/dock/certifications.svg" },
  { id: "mockup", label: "Mockup", logo: "/dock/mockup.png", cover: true },
  { id: "miro", label: "Miro", logo: "/dock/miro.png", cover: true },
];

const workspaceByApp: Record<string, { mark: string; title: string; docs: string[] }> = {
  notion: {
    mark: "N",
    title: "NOTION",
    docs: ["DotOS Notes", "1-on-1 Meeting Notes", "Project Timeline", "Tasks"],
  },
  figma: {
    mark: "F",
    title: "FIGMA",
    docs: ["Design System", "Mobile Flows", "Component Library", "Prototype"],
  },
  procreate: {
    mark: "P",
    title: "PROCREATE",
    docs: ["Sketch Studies", "Texture Pack", "Illustration Set", "Brush Set"],
  },
  certifications: {
    mark: "C",
    title: "CERTIFICATIONS",
    docs: ["Google UX", "NN/g UX", "Figma Advanced", "Accessibility"],
  },
  mockup: {
    mark: "M",
    title: "MOCKUP",
    docs: ["Device Frames", "App Store Kit", "Web Browser", "Presentation"],
  },
  miro: {
    mark: "M",
    title: "MIRO",
    docs: ["Affinity Map", "User Journey", "Workshop Board", "IA Map"],
  },
};

const linkedInPost = {
  url: "https://www.linkedin.com/posts/aditya-mote-aa78b4199_uiux-activity-7247502098802585601-bDYp?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC6VzB8B2bgs5-yZmawjrJug8wJJ3GV1Vps",
  headline: "UX UI Designer | Computer Engineer",
  body: "Learning glassmorphism in UI/UX involves mastering the use of transparency, blur, and layering to create depth while ensuring accessibility and clarity in design.",
  tag: "#uiux",
  likes: 24,
  when: "1yr",
  media: ["/linkedin/glass-mobile.png", "/linkedin/glass-dash.png"],
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export function BentoHome() {
  const [activeApp, setActiveApp] = useState("notion");
  const [docIndex, setDocIndex] = useState(0);
  const [looking, setLooking] = useState(false);
  const workspace = workspaceByApp[activeApp] ?? workspaceByApp.notion;

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
                <span className="ws-notion-mark">{workspace.mark}</span> {workspace.title}
              </span>
            </div>

            <div className="ws-docs">
              {workspace.docs.map((doc, i) => (
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
                  onClick={() => {
                    setActiveApp(app.id);
                    setDocIndex(0);
                  }}
                  title={app.label}
                  aria-label={app.label}
                  aria-pressed={activeApp === app.id}
                >
                  <img
                    className={`ws-app-logo${"cover" in app && app.cover ? " is-cover" : ""}`}
                    src={app.logo}
                    alt=""
                  />
                  {activeApp === app.id ? <i className="ws-new">new</i> : null}
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

            <motion.a
              href={linkedInPost.url}
              target="_blank"
              rel="noreferrer"
              className="bento-card bento-linkedin"
              {...fadeUp}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
            >
              <span className="li-orb li-orb-a" aria-hidden />
              <span className="li-orb li-orb-b" aria-hidden />
              <span className="li-frost" aria-hidden />

              <div className="li-head">
                <div className="li-avatar-wrap">
                  <img className="li-avatar" src={site.avatar} alt="" />
                </div>
                <div className="li-meta">
                  <div className="li-name-row">
                    <strong>{site.fullName}</strong>
                    <span className="li-you">You</span>
                  </div>
                  <span className="li-headline">{linkedInPost.headline}</span>
                  <span className="li-when">
                    {linkedInPost.when}
                    <Globe2 size={11} strokeWidth={2} aria-hidden />
                  </span>
                </div>
                <span className="li-mark" aria-hidden>
                  in
                </span>
              </div>

              <p className="li-body">
                {linkedInPost.body}{" "}
                <span className="li-tag">{linkedInPost.tag}</span>
              </p>

              <div className="li-media" aria-hidden>
                {linkedInPost.media.map((src) => (
                  <div key={src} className="li-shot">
                    <img src={src} alt="" />
                  </div>
                ))}
              </div>

              <div className="li-foot">
                <span className="li-likes">
                  <span className="li-like-icon">
                    <ThumbsUp size={11} strokeWidth={2.5} fill="currentColor" />
                  </span>
                  {linkedInPost.likes}
                </span>
                <span className="li-cta">
                  View post <ArrowUpRight size={13} strokeWidth={2.2} />
                </span>
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
