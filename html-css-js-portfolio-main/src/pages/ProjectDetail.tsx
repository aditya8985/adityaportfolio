import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Figma } from "lucide-react";
import { projects } from "../data/content";
import {
  caseStudies,
  type CaseSection,
  type ColorToken,
  type FlowStep,
  type GridToken,
  type Persona,
  type SpaceToken,
  type TimelineStep,
  type TypeStyle,
  type UiComponent,
} from "../data/caseStudies";
import "./ProjectDetail.css";

function isPhoneProject(id: string) {
  return id === "samayseva" || id === "arrow" || id === "irctc";
}

function hasSystemBlocks(ch?: CaseSection) {
  if (!ch) return false;
  return Boolean(
    ch.typeScale?.length ||
      ch.palette?.length ||
      ch.spacing?.length ||
      ch.grid?.length ||
      ch.components?.length,
  );
}

function TypeScaleBlock({ items }: { items: TypeStyle[] }) {
  return (
    <div className="sys-type">
      {items.map((t) => (
        <div key={t.name} className="sys-type-row">
          <div className="sys-type-meta">
            <strong>{t.name}</strong>
            <span>
              {t.size} · {t.weight} · LH {t.lineHeight}
            </span>
            <em>{t.usage}</em>
          </div>
          <p
            className="sys-type-sample"
            style={{
              fontSize: `${Math.min(parseInt(t.size, 10), 36)}px`,
              fontWeight: Number(t.weight),
              lineHeight: t.lineHeight,
            }}
          >
            {t.sample}
          </p>
        </div>
      ))}
    </div>
  );
}

function PaletteBlock({ items }: { items: ColorToken[] }) {
  return (
    <div className="sys-palette">
      {items.map((c) => (
        <div key={c.name} className="sys-swatch">
          <div
            className="sys-swatch-chip"
            style={{
              background: c.hex,
              borderColor: c.hex.toLowerCase() === "#ffffff" ? "rgba(0,0,0,0.12)" : "transparent",
            }}
          />
          <div>
            <strong>{c.name}</strong>
            <span>{c.hex}</span>
            <em>{c.role}</em>
          </div>
        </div>
      ))}
    </div>
  );
}

function SpaceGridBlock({
  spacing,
  grid,
}: {
  spacing?: SpaceToken[];
  grid?: GridToken[];
}) {
  return (
    <div className="sys-space">
      {spacing && (
        <div className="sys-space-list">
          {spacing.map((s) => (
            <div key={s.token} className="sys-space-row">
              <div className="sys-space-label">
                <strong>{s.token}</strong>
                <span>{s.px}</span>
              </div>
              <div className="sys-space-bar-wrap">
                <span
                  className="sys-space-bar"
                  style={{ width: Math.min(parseInt(s.px, 10) * 2.2, 220) }}
                />
              </div>
              <em>{s.use}</em>
            </div>
          ))}
        </div>
      )}
      {grid && (
        <div className="sys-grid-list">
          {grid.map((g) => (
            <div key={g.name} className="sys-grid-card">
              <strong>{g.name}</strong>
              <span>{g.detail}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ComponentsBlock({ items }: { items: UiComponent[] }) {
  return (
    <div className="sys-comps">
      {items.map((c) => (
        <article key={c.name} className="sys-comp">
          <header>
            <h3>{c.name}</h3>
            <span>{c.variants.length} variants</span>
          </header>
          <div className="sys-comp-group">
            <p>Variants</p>
            <div className="cs-tags">
              {c.variants.map((v) => (
                <span key={v}>{v}</span>
              ))}
            </div>
          </div>
          {c.states && (
            <div className="sys-comp-group">
              <p>States</p>
              <div className="cs-tags cs-tags-muted">
                {c.states.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

function TimelineBlock({ items }: { items: TimelineStep[] }) {
  return (
    <ol className="cs-timeline">
      {items.map((step, i) => (
        <li key={step.phase}>
          <div className="cs-timeline-marker">
            <span>{String(i + 1).padStart(2, "0")}</span>
          </div>
          <div className="cs-timeline-body">
            <div className="cs-timeline-top">
              <strong>{step.phase}</strong>
              <em>{step.days}</em>
            </div>
            <p>{step.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function PersonasBlock({ items }: { items: Persona[] }) {
  return (
    <div className="cs-personas">
      {items.map((p) => (
        <article key={p.name} className="cs-persona">
          <header>
            <div className="cs-persona-avatar" aria-hidden>
              {p.name.slice(0, 1)}
            </div>
            <div>
              <h3>
                {p.name}, {p.age}
              </h3>
              <span>{p.role}</span>
            </div>
          </header>
          <div className="cs-persona-row">
            <p className="cs-persona-label">Goal</p>
            <p>{p.goal}</p>
          </div>
          <div className="cs-persona-row">
            <p className="cs-persona-label">Frustration</p>
            <p>{p.frustration}</p>
          </div>
          {p.traits && (
            <div className="cs-tags">
              {p.traits.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

function FlowBlock({ items }: { items: FlowStep[] }) {
  return (
    <div className="cs-flow">
      {items.map((step, i) => (
        <div key={step.title} className="cs-flow-card">
          <div className="cs-flow-wire" aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <strong>
            <em>{String(i + 1).padStart(2, "0")}</em> {step.title}
          </strong>
          <p>{step.detail}</p>
        </div>
      ))}
    </div>
  );
}

function FinalUiBlock({
  items,
}: {
  items: { label: string; src: string }[];
}) {
  return (
    <div className="cs-final-ui">
      {items.map((screen) => (
        <figure key={screen.src} className="cs-final-phone">
          <div className="cs-final-frame">
            <img src={screen.src} alt={screen.label} />
          </div>
          <figcaption>{screen.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function SystemPreview({
  chapter,
  figmaUrl,
}: {
  chapter: CaseSection;
  figmaUrl?: string;
}) {
  if (chapter.typeScale?.length) {
    return (
      <div className="sys-preview">
        <p className="sys-preview-kicker">Live type scale</p>
        <div className="sys-preview-type">
          {chapter.typeScale.slice(0, 5).map((t) => (
            <div key={t.name}>
              <span>{t.name}</span>
              <strong
                style={{
                  fontSize: Math.min(parseInt(t.size, 10), 28),
                  fontWeight: Number(t.weight),
                }}
              >
                Aa
              </strong>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (chapter.palette?.length) {
    return (
      <div className="sys-preview">
        <p className="sys-preview-kicker">Token palette</p>
        <div className="sys-preview-palette">
          {chapter.palette.map((c) => (
            <div
              key={c.name}
              title={`${c.name} ${c.hex}`}
              style={{
                background: c.hex,
                borderColor: c.hex.toLowerCase() === "#ffffff" ? "rgba(0,0,0,0.1)" : "transparent",
              }}
            />
          ))}
        </div>
      </div>
    );
  }
  if (chapter.spacing?.length || chapter.grid?.length) {
    return (
      <div className="sys-preview">
        <p className="sys-preview-kicker">8px rhythm</p>
        <div className="sys-preview-space">
          {(chapter.spacing ?? []).slice(0, 6).map((s) => (
            <div key={s.token}>
              <span style={{ width: Math.min(parseInt(s.px, 10) * 1.6, 120) }} />
              <em>{s.px}</em>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (chapter.components?.length) {
    const src = chapter.media?.[0] ?? "/design-system-components.png";
    const href =
      figmaUrl ??
      "https://www.figma.com/design/WvCNNvmss0gNKzGyDz9Ona/Design-System?node-id=0-1&t=uC3Rb3KNAutfKkG7-1";
    return (
      <div className="sys-preview sys-preview-figma">
        <p className="sys-preview-kicker">Component library</p>
        <a
          className="sys-figma-cover"
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label="Open Design System in Figma"
        >
          <img src={src} alt="Design system component library sticker sheet" />
          <span className="sys-figma-cover-cta">
            <Figma size={14} />
            Open in Figma
            <ArrowUpRight size={13} />
          </span>
        </a>
      </div>
    );
  }
  return null;
}

function MediaStage({
  images,
  phone,
  label,
}: {
  images: string[];
  phone: boolean;
  label: string;
}) {
  const [active, setActive] = useState(0);
  const shown = images.length ? images : [];

  useEffect(() => {
    setActive(0);
  }, [images.join("|")]);

  useEffect(() => {
    if (shown.length < 2) return;
    const t = window.setInterval(() => {
      setActive((i) => (i + 1) % shown.length);
    }, 2800);
    return () => window.clearInterval(t);
  }, [shown.length, images.join("|")]);

  if (!shown.length) {
    return <div className="cs-stage-empty">No preview</div>;
  }

  if (phone) {
    return (
      <div className="cs-phone-stage">
        <div className="cs-phone">
          <div className="cs-phone-notch" />
          <AnimatePresence mode="wait">
            <motion.img
              key={shown[active]}
              src={shown[active]}
              alt={label}
              className="cs-phone-screen"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
        </div>
        {shown.length > 1 && (
          <div className="cs-phone-dots" aria-hidden>
            {shown.map((_, i) => (
              <button
                key={i}
                type="button"
                className={i === active ? "is-on" : undefined}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="cs-board-stage">
      <AnimatePresence mode="wait">
        <motion.div
          key={shown[active]}
          className="cs-board-frame"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={shown[active]} alt={label} />
        </motion.div>
      </AnimatePresence>
      {shown.length > 1 && (
        <div className="cs-filmstrip">
          {shown.map((src, i) => (
            <button
              key={src}
              type="button"
              className={i === active ? "is-on" : undefined}
              onClick={() => setActive(i)}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectDetail() {
  const { id } = useParams();
  const index = projects.findIndex((p) => p.id === id);
  const project = projects[index >= 0 ? index : 0];
  const study = caseStudies[project.id];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const [activeChapter, setActiveChapter] = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const chapters = study?.sections ?? [];
  const active = chapters[activeChapter];
  const showSystemStage = hasSystemBlocks(active);

  const activeMedia = useMemo(() => {
    if (!study) return project.cover ? [project.cover] : [];
    const fromChapter = chapters[activeChapter]?.media;
    if (fromChapter?.length) return fromChapter;
    return study.heroMedia;
  }, [study, chapters, activeChapter, project.cover]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveChapter(0);
  }, [project.id]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);

      // Sticky nav + chapter pills sit near the top — activate the last
      // section whose top has crossed this line (works for tall chapters).
      const trigger = Math.min(220, window.innerHeight * 0.28);
      let current = 0;
      sectionRefs.current.forEach((node, i) => {
        if (!node) return;
        if (node.getBoundingClientRect().top <= trigger) current = i;
      });
      setActiveChapter(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [project.id, chapters.length]);

  const jumpTo = (i: number) => {
    const node = sectionRefs.current[i];
    if (!node) return;
    const top = window.scrollY + node.getBoundingClientRect().top - 160;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveChapter(i);
  };

  if (!study) {
    return (
      <main className="page cs-page">
        <div className="container cs-fallback">
          <Link to="/work">← Work</Link>
          <h1>
            {project.emoji} {project.title}
          </h1>
          <p>{project.subtitle}</p>
        </div>
      </main>
    );
  }

  const phone = isPhoneProject(project.id);

  return (
    <main className="page cs-page" style={{ ["--cs-accent" as string]: study.accent }}>
      <div className="cs-progress" aria-hidden>
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      <header className="cs-hero page-pad">
        <div className="cs-hero-top">
          <Link to="/work" className="cs-back">
            <ArrowLeft size={15} strokeWidth={1.75} />
            Work
          </Link>
          <p className="cs-eyebrow">{study.eyebrow}</p>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {study.headline}
        </motion.h1>

        <motion.p
          className="cs-summary"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {study.summary}
        </motion.p>

        <div className="cs-meta">
          <div>
            <span>Role</span>
            <strong>{study.role}</strong>
          </div>
          <div>
            <span>Duration</span>
            <strong>{study.duration}</strong>
          </div>
          <div>
            <span>Tools</span>
            <strong>{study.tools}</strong>
          </div>
        </div>

        <div className="cs-actions">
          {study.figmaUrl && (
            <a href={study.figmaUrl} target="_blank" rel="noreferrer" className="cs-btn cs-btn-dark">
              <Figma size={15} />
              Open Figma
              <ArrowUpRight size={14} />
            </a>
          )}
          {study.liveUrl && (
            <a href={study.liveUrl} target="_blank" rel="noreferrer" className="cs-btn">
              <ExternalLink size={15} />
              Live website
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>

        {study.stats && (
          <div className="cs-stats">
            {study.stats.map((s) => (
              <div key={s.label} className="cs-stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </header>

      <nav className="cs-chapters page-pad" aria-label="Case study chapters">
        {chapters.map((ch, i) => (
          <button
            key={ch.id}
            type="button"
            className={i === activeChapter ? "is-active" : undefined}
            onClick={() => jumpTo(i)}
          >
            <span>{ch.label}</span>
            {ch.title}
          </button>
        ))}
      </nav>

      <div className={`cs-layout page-pad ${showSystemStage ? "cs-layout-wide" : ""}`}>
        <div className="cs-story">
          {chapters.map((ch, i) => (
            <section
              key={ch.id}
              id={ch.id}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
              className={`cs-chapter ${i === activeChapter ? "is-active" : ""}`}
            >
              <div className="cs-chapter-label">
                <span>{ch.label}</span>
                <em />
              </div>
              <h2>{ch.title}</h2>
              {ch.body && <p>{ch.body}</p>}
              {ch.bullets && (
                <ul>
                  {ch.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
              {ch.typeScale && <TypeScaleBlock items={ch.typeScale} />}
              {ch.palette && <PaletteBlock items={ch.palette} />}
              {(ch.spacing || ch.grid) && (
                <SpaceGridBlock spacing={ch.spacing} grid={ch.grid} />
              )}
              {ch.components && <ComponentsBlock items={ch.components} />}
              {ch.timeline && <TimelineBlock items={ch.timeline} />}
              {ch.personas && <PersonasBlock items={ch.personas} />}
              {ch.flowSteps && <FlowBlock items={ch.flowSteps} />}
              {ch.finalScreens && <FinalUiBlock items={ch.finalScreens} />}
              {ch.tags && (
                <div className="cs-tags">
                  {ch.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        <aside className="cs-stage-wrap" aria-label="Project visuals">
          <div className="cs-stage-sticky">
            <div className="cs-stage-caption">
              <span>{active?.label}</span>
              <strong>{active?.title}</strong>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active?.id ?? "stage"}
                className="cs-stage-body"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {showSystemStage && active ? (
                  <SystemPreview chapter={active} figmaUrl={study.figmaUrl} />
                ) : (
                  <MediaStage
                    images={activeMedia}
                    phone={phone}
                    label={active?.title ?? study.headline}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </aside>
      </div>

      <footer className="cs-next page-pad">
        <Link to={prev.href} className="cs-next-card">
          <span>
            <ArrowLeft size={14} /> Previous
          </span>
          <strong>
            {prev.emoji} {prev.title}
          </strong>
        </Link>
        <Link to={next.href} className="cs-next-card cs-next-card-end">
          <span>
            Next <ArrowRight size={14} />
          </span>
          <strong>
            {next.emoji} {next.title}
          </strong>
        </Link>
      </footer>
    </main>
  );
}
