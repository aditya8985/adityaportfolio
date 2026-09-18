import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, type MouseEvent } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { projects } from "../data/content";
import "./Work.css";

const featured = projects;

type SamayStep = "home" | "schedule" | "queue";
type ArrowStep = "landing" | "shop" | "ar";
type IrctcStep = "home" | "trains" | "book" | "ticket";

const samayScreens: Record<SamayStep, { src: string; hint: string }> = {
  home: { src: "/samayseva/home.png", hint: "Tap clinic card" },
  schedule: { src: "/samayseva/schedule.png", hint: "Confirm & Join" },
  queue: { src: "/samayseva/queue.png", hint: "Your tickets" },
};

const arrowScreens: Record<ArrowStep, { src: string; hint: string }> = {
  landing: { src: "/arrow/landing.jpg", hint: "Tap a shop" },
  shop: { src: "/arrow/shop.jpg", hint: "Open AR View" },
  ar: { src: "/arrow/ar.jpg", hint: "Follow the arrow" },
};

const irctcScreens: Record<IrctcStep, { src: string; hint: string }> = {
  home: { src: "/irctc/home.jpg", hint: "Search trains" },
  trains: { src: "/irctc/trains.jpg", hint: "Pick a class" },
  book: { src: "/irctc/book.png", hint: "Book ticket" },
  ticket: { src: "/irctc/ticket.png", hint: "Ticket ready" },
};

const irctcNext: Record<IrctcStep, IrctcStep> = {
  home: "trains",
  trains: "book",
  book: "ticket",
  ticket: "home",
};

function DotOSVisual() {
  return (
    <div className="wv wv-dotos">
      <div className="wv-win wv-win-a">
        <div className="wv-chrome">
          <span />
          <span />
          <span />
        </div>
        <div className="wv-doc">
          <div className="wv-illus" />
          <p>
            The number of things computers can do is growing, and its rate of growth is accelerating…
          </p>
        </div>
      </div>
      <div className="wv-win wv-win-b">
        <div className="wv-chrome dark">
          <strong>Feed</strong>
        </div>
        {["Amari", "Jess", "Marco"].map((n) => (
          <div key={n} className="wv-row">
            <i />
            <span>{n}</span>
            <small>2m</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function TakeOutVisual() {
  return (
    <div className="wv wv-takeout">
      <div className="wv-phone back">
        <div className="wv-phone-screen red">
          <p>Trivia Results</p>
          <strong>$3.25</strong>
          <small>You earned a badge</small>
        </div>
      </div>
      <div className="wv-phone front">
        <div className="wv-phone-screen light">
          <small>Delivering to → Brooklyn</small>
          <h4>Discover</h4>
          <div className="wv-search" />
          <div className="wv-pizza">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=140&fit=crop"
              alt=""
            />
            <strong>Joe's Pizza</strong>
            <span>Italian • Pizza</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SamaysevaVisual() {
  const [step, setStep] = useState<SamayStep>("home");

  const advance = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setStep((s) => (s === "home" ? "schedule" : s === "schedule" ? "queue" : "home"));
  };

  const goHome = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setStep("home");
  };

  return (
    <div
      className="wv wv-samay"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="wv-phone samay-back" aria-hidden>
        <div className="wv-phone-bezel">
          <img src="/samayseva/splash.jpg" alt="" className="samay-screen-img" />
        </div>
      </div>

      <div className="wv-phone samay-front">
        <div className="wv-phone-bezel samay-interactive">
          <AnimatePresence mode="wait">
            <motion.img
              key={step}
              src={samayScreens[step].src}
              alt={`Samayseva ${step}`}
              className="samay-screen-img"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.28 }}
              draggable={false}
            />
          </AnimatePresence>

          {step === "home" ? (
            <button
              type="button"
              className="samay-hotspot samay-hotspot-clinic"
              aria-label="Open clinic and fill schedule form"
              onClick={advance}
            />
          ) : null}

          {step === "schedule" ? (
            <button
              type="button"
              className="samay-hotspot samay-hotspot-confirm"
              aria-label="Confirm and view tickets"
              onClick={advance}
            />
          ) : null}

          {step === "queue" ? (
            <button
              type="button"
              className="samay-hotspot samay-hotspot-reset"
              aria-label="Restart demo"
              onClick={goHome}
            />
          ) : null}

          <span className="samay-hint">{samayScreens[step].hint}</span>
        </div>
      </div>
    </div>
  );
}

function ArrowVisual() {
  const [step, setStep] = useState<ArrowStep>("landing");

  const advance = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setStep((s) => (s === "landing" ? "shop" : s === "shop" ? "ar" : "landing"));
  };

  const goLanding = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setStep("landing");
  };

  return (
    <div
      className="wv wv-arrow"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="wv-phone arrow-back" aria-hidden>
        <div className="wv-phone-bezel arrow-bezel">
          <img src="/arrow/splash.jpg" alt="" className="samay-screen-img" />
        </div>
      </div>

      <div className="wv-phone arrow-front">
        <div className="wv-phone-bezel arrow-bezel samay-interactive">
          <AnimatePresence mode="wait">
            <motion.img
              key={step}
              src={arrowScreens[step].src}
              alt={`Arrow ${step}`}
              className="samay-screen-img"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
              draggable={false}
            />
          </AnimatePresence>

          {step === "landing" ? (
            <button
              type="button"
              className="samay-hotspot arrow-hotspot-shop"
              aria-label="Open shop location"
              onClick={advance}
            />
          ) : null}

          {step === "shop" ? (
            <button
              type="button"
              className="samay-hotspot arrow-hotspot-ar"
              aria-label="Open AR navigation"
              onClick={advance}
            />
          ) : null}

          {step === "ar" ? (
            <button
              type="button"
              className="samay-hotspot arrow-hotspot-reset"
              aria-label="Restart Arrow demo"
              onClick={goLanding}
            />
          ) : null}

          <span className="samay-hint arrow-hint">{arrowScreens[step].hint}</span>
        </div>
      </div>
    </div>
  );
}

function IrctcVisual() {
  const [step, setStep] = useState<IrctcStep>("home");

  const advance = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setStep((s) => irctcNext[s]);
  };

  return (
    <div
      className="wv wv-irctc"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="wv-phone irctc-front">
        <div className="wv-phone-bezel samay-interactive">
          <AnimatePresence mode="wait">
            <motion.img
              key={step}
              src={irctcScreens[step].src}
              alt={`IRCTC ${step}`}
              className="samay-screen-img"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.28 }}
              draggable={false}
            />
          </AnimatePresence>

          <button
            type="button"
            className={`samay-hotspot irctc-hotspot irctc-hotspot-${step}`}
            aria-label={irctcScreens[step].hint}
            onClick={advance}
          />

          <span className="samay-hint irctc-hint">{irctcScreens[step].hint}</span>
        </div>
      </div>
    </div>
  );
}

function AvailabilityVisual() {
  return (
    <div className="wv wv-avail">
      <div className="wv-cli">
        <span className="wv-prompt">⌘.</span>
        <span>share availability with mel@outlook.com</span>
      </div>
      <div className="wv-cal">
        <div className="wv-cal-head">Mon 21 · Tue 22 · Wed 23</div>
        <div className="wv-slots">
          {["9 AM", "11 AM", "1 PM", "3 PM"].map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function LinksVisual() {
  return (
    <div className="wv wv-links">
      <div className="wv-phone front small">
        <div className="wv-phone-screen light">
          <small>9:41</small>
          <h4>Meet with Jess</h4>
          <div className="wv-day-pills">
            <span>Sun</span>
            <span className="on">Mon</span>
            <span>Tue</span>
          </div>
          <div className="wv-book-slot on">9:00 – 10:00 AM</div>
          <div className="wv-book-slot">11:00 – 12:00 PM</div>
        </div>
      </div>
      <div className="wv-dash">
        <div className="wv-dash-row" />
        <div className="wv-dash-row" />
        <div className="wv-dash-row short" />
      </div>
    </div>
  );
}

function ImageVisual({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="wv wv-image">
      <img src={src} alt={alt} />
    </div>
  );
}

function StackedVisual({ covers, title }: { covers: [string, string]; title?: string }) {
  return (
    <div className="wv wv-stacked">
      <img src={covers[0]} alt="" className="stacked-img back" />
      <img src={covers[1]} alt={title ?? ""} className="stacked-img front" />
    </div>
  );
}

function BrowserVisual({
  src,
  title,
  liveUrl,
}: {
  src: string;
  title?: string;
  liveUrl?: string;
}) {
  return (
    <div
      className="wv wv-browser"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <a
        className="browser-frame"
        href={liveUrl ?? "#"}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${title ?? "live site"}`}
      >
        <div className="browser-chrome">
          <div className="browser-dots">
            <span />
            <span />
            <span />
          </div>
          <div className="browser-url">
            {liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "") ?? "live site"}
          </div>
        </div>
        <div className="browser-body">
          <img src={src} alt={title ?? ""} />
        </div>
        <span className="browser-live">Live</span>
      </a>
    </div>
  );
}

function Visual({
  type,
  cover,
  covers,
  title,
  liveUrl,
}: {
  type: string;
  cover?: string;
  covers?: [string, string];
  title?: string;
  liveUrl?: string;
}) {
  if (type === "image" && cover) {
    return <ImageVisual src={cover} alt={title ?? ""} />;
  }
  if (type === "stacked" && covers) {
    return <StackedVisual covers={covers} title={title} />;
  }
  if (type === "browser" && cover) {
    return <BrowserVisual src={cover} title={title} liveUrl={liveUrl} />;
  }
  switch (type) {
    case "dotos":
      return <DotOSVisual />;
    case "takeout":
      return <TakeOutVisual />;
    case "samayseva":
      return <SamaysevaVisual />;
    case "arrow":
      return <ArrowVisual />;
    case "irctc":
      return <IrctcVisual />;
    case "availability":
      return <AvailabilityVisual />;
    case "links":
      return <LinksVisual />;
    default:
      return <DotOSVisual />;
  }
}

export function Work() {
  return (
    <main className="page work-page">
      <div className="work-wrap page-pad">
        <div className="work-hint">
          <Play size={10} fill="currentColor" />
          Testing testing...
        </div>

        <div className="work-grid">
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to={p.href} className="work-card">
                <div className="work-card-top">
                  <div>
                    <h2>{p.title}</h2>
                    <p>{p.subtitle}</p>
                  </div>
                  <span className="work-arrow" aria-hidden>
                    <ArrowUpRight size={18} strokeWidth={1.75} />
                  </span>
                </div>
                <div className="work-card-visual">
                  <Visual
                    type={p.visual}
                    cover={p.cover}
                    covers={p.covers}
                    title={p.title}
                    liveUrl={p.liveUrl}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
