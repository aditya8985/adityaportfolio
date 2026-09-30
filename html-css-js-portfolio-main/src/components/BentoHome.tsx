import { useState, type ComponentType } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Play,
  ThumbsUp,
  Globe2,
  Search,
  Scale,
  Palette,
  PenTool,
  FileText,
  type LucideProps,
} from "lucide-react";
import { site } from "../data/content";
import { FoodPhoneApp } from "./FoodPhoneApp";
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

type DocIcon = ComponentType<LucideProps>;
type WorkspaceDoc = { title: string; url?: string; icon?: DocIcon };

const workspaceByApp: Record<
  string,
  { mark: string; title: string; docs: WorkspaceDoc[] }
> = {
  notion: {
    mark: "N",
    title: "NOTION",
    docs: [
      {
        title: "Research Methods",
        icon: Search,
        url: "https://app.notion.com/p/Research-Methods-3eb2e5ee3d7e808b9341f7fce965980e?source=copy_link",
      },
      {
        title: "UX Laws",
        icon: Scale,
        url: "https://app.notion.com/p/UX-Laws-3eb2e5ee3d7e80899ce3f11c045decf8?source=copy_link",
      },
      {
        title: "UI Design",
        icon: Palette,
        url: "https://app.notion.com/p/UI-Design-ad7a45dba98e46c4baf0f353035bc93e?source=copy_link",
      },
      {
        title: "UX Design",
        icon: PenTool,
        url: "https://app.notion.com/p/UX-Design-3e92e5ee3d7e80378adbc65c242c33f0?source=copy_link",
      },
    ],
  },
  figma: {
    mark: "F",
    title: "FIGMA",
    docs: [
      { title: "Design System", icon: FileText },
      { title: "Mobile Flows", icon: FileText },
      { title: "Component Library", icon: FileText },
      { title: "Prototype", icon: FileText },
    ],
  },
  procreate: {
    mark: "P",
    title: "PROCREATE",
    docs: [
      { title: "Sketch Studies", icon: FileText },
      { title: "Texture Pack", icon: FileText },
      { title: "Illustration Set", icon: FileText },
      { title: "Brush Set", icon: FileText },
    ],
  },
  certifications: {
    mark: "C",
    title: "CERTIFICATIONS",
    docs: [
      { title: "Google UX", icon: FileText },
      { title: "NN/g UX", icon: FileText },
      { title: "Figma Advanced", icon: FileText },
      { title: "Accessibility", icon: FileText },
    ],
  },
  mockup: {
    mark: "M",
    title: "MOCKUP",
    docs: [
      { title: "Device Frames", icon: FileText },
      { title: "App Store Kit", icon: FileText },
      { title: "Web Browser", icon: FileText },
      { title: "Presentation", icon: FileText },
    ],
  },
  miro: {
    mark: "M",
    title: "MIRO",
    docs: [
      { title: "Affinity Map", icon: FileText },
      { title: "User Journey", icon: FileText },
      { title: "Workshop Board", icon: FileText },
      { title: "IA Map", icon: FileText },
    ],
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
  const [foodEngaged, setFoodEngaged] = useState(false);
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
              {workspace.docs.map((doc, i) => {
                const className = `ws-doc${docIndex === i ? " active" : ""}`;
                const Icon = doc.icon ?? FileText;
                const inner = (
                  <>
                    <span className="ws-doc-icon" aria-hidden>
                      <Icon size={18} strokeWidth={1.9} />
                    </span>
                    <span className="ws-doc-title">{doc.title}</span>
                    <span className="ws-doc-sub">{site.name}'s Workspace</span>
                  </>
                );

                if (doc.url) {
                  return (
                    <a
                      key={doc.title}
                      href={doc.url}
                      target="_blank"
                      rel="noreferrer"
                      className={className}
                      onClick={() => setDocIndex(i)}
                    >
                      {inner}
                    </a>
                  );
                }

                return (
                  <button
                    key={doc.title}
                    type="button"
                    className={className}
                    onClick={() => setDocIndex(i)}
                  >
                    {inner}
                  </button>
                );
              })}
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
                looking && !foodEngaged
                  ? { opacity: 1, y: [0, 5, 0] }
                  : { opacity: 1, y: 0 }
              }
              transition={
                looking && !foodEngaged
                  ? { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
                  : { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.35 }
              }
              onPointerDown={() => setFoodEngaged(true)}
            >
              <FoodPhoneApp />
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
