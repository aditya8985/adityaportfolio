import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight, Mail, User } from "lucide-react";
import { site } from "../data/content";
import "./WorkGallery.css";

const items = [
  {
    id: "shortcuts",
    href: "/about",
    span: "square",
    visual: "shortcuts" as const,
  },
  {
    id: "phone",
    href: "/work/samayseva",
    span: "tall",
    visual: "phone" as const,
  },
  {
    id: "careers",
    href: "/work/microinteraction",
    span: "square",
    visual: "careers" as const,
  },
  {
    id: "blocks",
    href: "/work/arrow",
    span: "square",
    visual: "blocks" as const,
  },
  {
    id: "calendar",
    href: "/work/ekartham",
    span: "square",
    visual: "calendar" as const,
  },
  {
    id: "moments",
    href: "/work/samayseva",
    span: "square",
    visual: "moments" as const,
  },
  {
    id: "arch",
    href: "/work/design-system",
    span: "square",
    visual: "arch" as const,
  },
];

type PastePhase = "idle" | "cmd" | "ready" | "stairs" | "zoom";

const pasteSteps = [
  {
    id: "email",
    label: site.email,
    time: "22m ago",
    icon: <Mail size={14} strokeWidth={2} />,
  },
  {
    id: "name",
    label: site.fullName,
    time: "4m ago",
    icon: <User size={14} strokeWidth={2} />,
  },
] as const;

function ShortcutsVisual() {
  const [phase, setPhase] = useState<PastePhase>("idle");
  const [visible, setVisible] = useState(0);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  const reset = () => {
    clearTimers();
    setPhase("idle");
    setVisible(0);
  };

  const runStairs = () => {
    clearTimers();
    setPhase("stairs");
    setVisible(0);

    pasteSteps.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setVisible(i + 1);
        }, 180 + i * 220),
      );
    });

    timers.current.push(
      window.setTimeout(() => {
        setPhase("zoom");
      }, 180 + pasteSteps.length * 220 + 280),
    );

    timers.current.push(
      window.setTimeout(() => {
        reset();
      }, 180 + pasteSteps.length * 220 + 1600),
    );
  };

  const onCmdClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (phase !== "idle") return;
    clearTimers();
    setPhase("cmd");
    timers.current.push(
      window.setTimeout(() => {
        setPhase("ready");
      }, 320),
    );
    // Auto-run paste stairs after "AND HERE" appears
    timers.current.push(
      window.setTimeout(() => {
        runStairs();
      }, 780),
    );
  };

  const onVClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (phase !== "ready" && phase !== "cmd") return;
    runStairs();
  };

  const playing = phase === "stairs" || phase === "zoom";

  return (
    <div
      className={`wg-visual wg-shortcuts${playing ? " is-playing" : ""}${phase !== "idle" ? " is-active" : ""}`}
    >
      <div className="wg-keys-stage">
        <div className="wg-key-col">
          <span className={`wg-hint wg-hint-cmd${phase === "idle" ? " show-hover" : ""}`}>
            CLICK HERE <i aria-hidden>↓</i>
          </span>
          <button
            type="button"
            className={`wg-key${phase === "cmd" || phase === "ready" || playing ? " pressed" : ""}`}
            aria-label="Command"
            onClick={onCmdClick}
          >
            ⌘
          </button>
        </div>
        <div className="wg-key-col">
          <span className={`wg-hint wg-hint-v${phase === "ready" ? " visible" : ""}`}>
            AND HERE <i aria-hidden>↓</i>
          </span>
          <button
            type="button"
            className={`wg-key${playing ? " pressed" : ""}`}
            aria-label="Paste"
            onClick={onVClick}
          >
            V
          </button>
        </div>
      </div>

      <div className={`wg-paste-list${playing || visible > 0 ? " open" : ""}`}>
        {pasteSteps.map((step, i) => {
          const shown = i < visible;
          const isLast = step.id === "name";
          const active = shown && i === visible - 1 && phase !== "zoom";
          const zoomed = isLast && phase === "zoom";
          return (
            <div
              key={step.id}
              className={`wg-paste-row${shown ? " shown" : ""}${active ? " active" : ""}${zoomed ? " zoomed" : ""}`}
              style={{ transitionDelay: shown ? "0ms" : `${i * 40}ms` }}
            >
              <span className="wg-paste-icon">{step.icon}</span>
              <strong>{step.label}</strong>
              <small>{step.time}</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PhoneVisual() {
  return (
    <div className="wg-visual wg-phone">
      <div className="wg-device">
        <div className="wg-device-notch" />
        <div className="wg-device-screen">
          <small>9:41</small>
          <h4>Meet with Jess</h4>
          <span className="wg-date">Monday, Nov 21st</span>
          <div className="wg-week">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <i key={`${d}-${i}`} className={i === 1 ? "on" : ""}>
                {d}
              </i>
            ))}
          </div>
          <div className="wg-event orange">
            <strong>Daily Standup</strong>
            <em>9:00 – 9:30</em>
          </div>
          <div className="wg-event blue">
            <strong>1-on-1 Interview</strong>
            <em>11:00 – 12:00</em>
          </div>
          <div className="wg-event green">
            <strong>Design Review</strong>
            <em>2:00 – 3:00</em>
          </div>
        </div>
      </div>
    </div>
  );
}

function CareersVisual() {
  return (
    <div className="wg-visual wg-careers">
      <div className="wg-pd" aria-hidden>
        <div className="wg-pd-grid" />
        <div className="wg-pd-stack">
          <article className="wg-pd-frame f1">
            <header>
              <span />
              <span />
              <span />
            </header>
            <div className="wg-pd-wire">
              <i className="hero" />
              <i className="row" />
              <i className="row short" />
              <div className="wg-pd-cards">
                <em />
                <em />
                <em />
              </div>
            </div>
          </article>
          <article className="wg-pd-frame f2">
            <header>
              <span />
              <span />
              <span />
            </header>
            <div className="wg-pd-hi">
              <div className="wg-pd-nav" />
              <div className="wg-pd-panel">
                <b />
                <b className="mid" />
                <b className="sm" />
              </div>
              <div className="wg-pd-cta" />
            </div>
          </article>
          <article className="wg-pd-frame f3">
            <div className="wg-pd-proto">
              <div className="wg-pd-phone">
                <i className="notch" />
                <i className="screen" />
                <i className="bar" />
              </div>
            </div>
          </article>
        </div>
        <div className="wg-pd-tools">
          <span className="tok color a" />
          <span className="tok color b" />
          <span className="tok color c" />
          <span className="tok type">Aa</span>
          <span className="tok space">8</span>
        </div>
        <div className="wg-pd-label">
          <strong>Product Design</strong>
          <em>Research → UI → Prototype</em>
        </div>
      </div>
    </div>
  );
}

const CASHIER_SOUND = "/sounds/cashier-register.mp3";

function playCashierSound() {
  try {
    const audio = new Audio(CASHIER_SOUND);
    audio.volume = 0.5;
    void audio.play().catch(() => {
      /* autoplay may be blocked until a gesture; click/tap still works */
    });
  } catch {
    /* ignore */
  }
}

function BlocksVisual() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [magnet, setMagnet] = useState({ x: 0, y: 0, rx: 0, ry: 0 });
  const [active, setActive] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - r.left - r.width / 2;
    const my = e.clientY - r.top - r.height / 2;
    // subtle magnetic pull toward pointer
    setMagnet({
      x: mx * 0.08,
      y: my * 0.08,
      rx: Math.max(-5, Math.min(5, -my * 0.025)),
      ry: Math.max(-6, Math.min(6, mx * 0.028)),
    });
  };

  const onEnter = () => {
    setActive(true);
  };

  const onLeave = () => {
    setActive(false);
    setMagnet({ x: 0, y: 0, rx: 0, ry: 0 });
  };

  const onTap = () => {
    playCashierSound();
  };

  return (
    <div
      ref={stageRef}
      className={`wg-visual wg-blocks${active ? " is-hot" : ""}`}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onTap}
      aria-label="Credit card"
    >
      <div
        className="wg-cc"
        style={{
          transform: `translate3d(${magnet.x}px, ${magnet.y}px, 0) rotateX(${magnet.rx}deg) rotateY(${magnet.ry}deg)`,
        }}
      >
        <div className="wg-cc-shine" aria-hidden />
        <div className="wg-cc-top">
          <span className="wg-cc-brand">ORBIT</span>
          <span className="wg-cc-chip" aria-hidden>
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="wg-cc-wave" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <p className="wg-cc-number">4242  ····  ····  8610</p>
        <div className="wg-cc-foot">
          <div>
            <small>Cardholder</small>
            <strong>{site.fullName.toUpperCase()}</strong>
          </div>
          <div className="wg-cc-exp">
            <small>Exp</small>
            <strong>09/28</strong>
          </div>
          <span className="wg-cc-mark" aria-hidden>
            <i />
            <i />
          </span>
        </div>
      </div>
    </div>
  );
}

function CalendarVisual() {
  return (
    <div className="wg-visual wg-calendar">
      <div className="wg-cal-card">
        <div className="wg-cal-head">
          <strong>Tuesday, Nov 22nd</strong>
          <button type="button" tabIndex={-1}>
            +
          </button>
        </div>
        <div className="wg-cal-days">
          {[21, 22, 23, 24, 25].map((d) => (
            <span key={d} className={d === 22 ? "on" : ""}>
              {d}
            </span>
          ))}
        </div>
        <div className="wg-cal-row red">
          <b>9:00</b>
          <p>Product Sync</p>
        </div>
        <div className="wg-cal-row blue">
          <b>11:30</b>
          <p>Portfolio Critique</p>
        </div>
        <div className="wg-cal-row green">
          <b>3:00</b>
          <p>Focus Block</p>
        </div>
      </div>
    </div>
  );
}

function MomentsVisual() {
  return (
    <div className="wg-visual wg-moments">
      <div className="wg-moments-bw">
        <p>Small Moments</p>
        <strong>BIG JOY</strong>
      </div>
      <div className="wg-stickers" aria-hidden>
        <span className="st s1">Extremely Outside</span>
        <span className="st s2">VACATION VIBES</span>
        <span className="st s3">IRL HANGS</span>
        <span className="st s4">Food Food Food</span>
        <span className="st s5">NAILED IT!</span>
      </div>
    </div>
  );
}

function ArchVisual() {
  return (
    <div className="wg-visual wg-arch" aria-hidden>
      <svg viewBox="0 0 120 140" fill="none">
        <path
          d="M20 130 V55 C20 28 44 12 60 12 C76 12 100 28 100 55 V130"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Visual({ type }: { type: (typeof items)[number]["visual"] }) {
  switch (type) {
    case "shortcuts":
      return <ShortcutsVisual />;
    case "phone":
      return <PhoneVisual />;
    case "careers":
      return <CareersVisual />;
    case "blocks":
      return <BlocksVisual />;
    case "calendar":
      return <CalendarVisual />;
    case "moments":
      return <MomentsVisual />;
    case "arch":
      return <ArchVisual />;
  }
}

export function WorkGallery() {
  return (
    <section className="work-gallery page-pad" aria-label="Selected work">
      <div className="wg-grid">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            className={`wg-cell wg-${item.span} wg-${item.id}`}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {item.visual === "blocks" ? (
              <div className="wg-card wg-card-interactive">
                <BlocksVisual />
              </div>
            ) : item.visual === "shortcuts" ? (
              <Link to="/about" className="wg-card wg-card-interactive">
                <ShortcutsVisual />
                <span className="wg-arrow" aria-hidden>
                  <ArrowUpRight size={16} strokeWidth={1.75} />
                </span>
              </Link>
            ) : (
              <Link to={item.href} className="wg-card">
                <Visual type={item.visual} />
                <span className="wg-arrow" aria-hidden>
                  <ArrowUpRight size={16} strokeWidth={1.75} />
                </span>
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
