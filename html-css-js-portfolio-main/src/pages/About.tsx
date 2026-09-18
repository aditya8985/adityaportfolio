import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Download,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  ListMusic,
  Volume2,
} from "lucide-react";
import { site, listening, photos, podcast } from "../data/content";
import "./About.css";

const avatar = site.avatar;

const sections = [
  {
    label: "Where I'm from",
    body: (
      <>
        I grew up tinkering with computers long before I understood what “product” meant. Family told me
        to go outside—touch grass, they said. I did. I also kept building. That mix of curiosity and craft
        is still how I work.
      </>
    ),
  },
  {
    label: "What I used to do",
    body: (
      <>
        Early on I bounced between odd jobs and side projects: fixing broken sites, sketching interfaces
        in notebooks, shipping tiny tools nobody asked for. Those messy experiments taught me how people
        actually use things—and why most software feels louder than it needs to.
      </>
    ),
  },
  {
    label: "What I do now",
    body: (
      <>
        Today I’m a <strong>Product Designer</strong> focused on calm, interactive experiences. I care
        about interfaces that feel inevitable—fewer screens, clearer flows, micro-moments that make
        software feel human. Open to collabs via{" "}
        <a href={site.socials.linkedin} target="_blank" rel="noreferrer">
          LinkedIn <ArrowUpRight size={14} className="inline-arrow" />
        </a>{" "}
        and{" "}
        <a href={`mailto:${site.email}`}>
          email <ArrowUpRight size={14} className="inline-arrow" />
        </a>
        .
      </>
    ),
  },
];

function LinkedInBadge() {
  return (
    <span className="app-icon linkedin" aria-hidden>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    </span>
  );
}

function AppleMusicBadge() {
  return (
    <span className="app-icon apple-music" aria-hidden>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff">
        <path d="M19.5 3.2c-.2-.1-4.6-1.5-4.8-1.5-.3-.1-.6 0-.8.2-.1.1-.2.3-.2.5v11.4c-.5-.3-1.2-.5-2-.5-2.1 0-3.7 1.3-3.7 2.9s1.6 2.9 3.7 2.9 3.7-1.3 3.7-2.9V8.6l4.2 1.3c.4.1.8-.1.9-.5.1-.1.1-.2.1-.3V3.9c0-.3-.1-.5-.4-.7z" />
      </svg>
    </span>
  );
}

function PhotosBadge() {
  return (
    <span className="app-icon photos" aria-hidden>
      <svg viewBox="0 0 48 48" width="22" height="22">
        <path fill="#FF2D55" d="M24 8c-3.5 0-6.2 3.8-6.2 8.2 0 6.2 6.2 12.6 6.2 12.6S30.2 22.4 30.2 16.2C30.2 11.8 27.5 8 24 8z" />
        <path fill="#FFCC00" d="M40 24c0-3.5-3.8-6.2-8.2-6.2-6.2 0-12.6 6.2-12.6 6.2s6.4 6.2 12.6 6.2C36.2 30.2 40 27.5 40 24z" />
        <path fill="#34C759" d="M24 40c3.5 0 6.2-3.8 6.2-8.2 0-6.2-6.2-12.6-6.2-12.6S17.8 25.6 17.8 31.8C17.8 36.2 20.5 40 24 40z" />
        <path fill="#007AFF" d="M8 24c0 3.5 3.8 6.2 8.2 6.2 6.2 0 12.6-6.2 12.6-6.2s-6.4-6.2-12.6-6.2C11.8 17.8 8 20.5 8 24z" />
        <circle cx="24" cy="24" r="4.2" fill="#fff" />
      </svg>
    </span>
  );
}

function PodcastsBadge() {
  return (
    <span className="app-icon podcasts" aria-hidden>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff">
        <path d="M12 2a7 7 0 0 0-7 7v1.2a1.2 1.2 0 0 0 2.4 0V9a4.6 4.6 0 1 1 9.2 0v1.2a1.2 1.2 0 0 0 2.4 0V9a7 7 0 0 0-7-7zm0 6.2a2.2 2.2 0 0 0-2.2 2.2v5.2a2.2 2.2 0 1 0 4.4 0V10.4A2.2 2.2 0 0 0 12 8.2zm-5.6 5.1a1.1 1.1 0 0 0-1.1 1.1 6.7 6.7 0 0 0 13.4 0 1.1 1.1 0 0 0-2.2 0 4.5 4.5 0 0 1-9 0 1.1 1.1 0 0 0-1.1-1.1zM12 19.6c-.7 0-1.3.3-1.7.8-.3.3-.2.8.2 1 .5.3 1 .5 1.5.5s1-.2 1.5-.5c.4-.2.5-.7.2-1-.4-.5-1-.8-1.7-.8z" />
      </svg>
    </span>
  );
}

function PhotosGridIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function PhotosMapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
      <path d="M9 4.5 3.5 7v12.5L9 17l6 2.5 5.5-2.5V4.5L15 7 9 4.5z" strokeLinejoin="round" />
      <path d="M9 4.5v12.5M15 7v12.5" />
      <circle cx="15.5" cy="11" r="2.2" />
      <path d="M15.5 13.2v2.2" strokeLinecap="round" />
    </svg>
  );
}

function PhotosHeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
      <path
        d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 7.5a3.8 3.8 0 0 1 7 3.3C19 15.6 12 20 12 20z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhotosPawIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <ellipse cx="7.2" cy="8.2" rx="1.7" ry="2.2" />
      <ellipse cx="11" cy="6.4" rx="1.7" ry="2.2" />
      <ellipse cx="15" cy="6.4" rx="1.7" ry="2.2" />
      <ellipse cx="18.8" cy="8.2" rx="1.7" ry="2.2" />
      <path d="M12 11.2c-2.8 0-5.2 1.8-5.4 4.2-.1 1.3.7 2.4 2.1 2.8 1 .3 1.8-.1 2.4-.7.3-.4.6-.6.9-.6s.6.2.9.6c.6.6 1.4 1 2.4.7 1.4-.4 2.2-1.5 2.1-2.8-.2-2.4-2.6-4.2-5.4-4.2z" />
    </svg>
  );
}

function MediaControls({
  playing,
  onToggle,
}: {
  playing: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="media-controls">
      <button type="button" aria-label="Queue">
        <ListMusic size={15} strokeWidth={1.75} />
      </button>
      <button type="button" aria-label="Previous">
        <SkipBack size={15} fill="currentColor" strokeWidth={1.5} />
      </button>
      <button type="button" className="media-play" aria-label={playing ? "Pause" : "Play"} onClick={onToggle}>
        {playing ? (
          <Pause size={15} fill="currentColor" strokeWidth={1.5} />
        ) : (
          <Play size={15} fill="currentColor" strokeWidth={1.5} />
        )}
      </button>
      <button type="button" aria-label="Next">
        <SkipForward size={15} fill="currentColor" strokeWidth={1.5} />
      </button>
      <button type="button" aria-label="Volume">
        <Volume2 size={15} strokeWidth={1.75} />
      </button>
    </div>
  );
}

export function About() {
  const [trackPlaying, setTrackPlaying] = useState(false);
  const [podPlaying, setPodPlaying] = useState(false);
  const [socialHot, setSocialHot] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const track = listening[0];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const podRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!track.src) return;

    const audio = new Audio(track.src);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    const onEnded = () => setTrackPlaying(false);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", onEnded);
      audioRef.current = null;
    };
  }, [track.src]);

  useEffect(() => {
    const audio = new Audio(podcast.src);
    audio.preload = "auto";
    podRef.current = audio;

    const onEnded = () => setPodPlaying(false);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", onEnded);
      podRef.current = null;
    };
  }, []);

  const toggleTrack = () => {
    const audio = audioRef.current;
    const pod = podRef.current;
    if (!audio) return;

    if (pod && !pod.paused) {
      pod.pause();
      setPodPlaying(false);
    }

    if (audio.paused) {
      void audio.play().then(() => setTrackPlaying(true)).catch(() => setTrackPlaying(false));
    } else {
      audio.pause();
      setTrackPlaying(false);
    }
  };

  const togglePod = () => {
    const audio = podRef.current;
    const music = audioRef.current;
    if (!audio) return;

    if (music && !music.paused) {
      music.pause();
      setTrackPlaying(false);
    }

    if (audio.paused) {
      void audio.play().then(() => setPodPlaying(true)).catch(() => setPodPlaying(false));
    } else {
      audio.pause();
      setPodPlaying(false);
    }
  };
  const photoTabs = [
    { label: "Library", icon: <PhotosGridIcon /> },
    { label: "Places", icon: <PhotosMapIcon /> },
    { label: "Favorites", icon: <PhotosHeartIcon /> },
    { label: "Pets", icon: <PhotosPawIcon /> },
  ];

  return (
    <main className="page about-page">
      <div className="about-wrap page-pad">
        <motion.article
          className="about-bio"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about-bio-head">
            <h1>What I'm bout.</h1>
            <a
              className="resume-btn"
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              download="Aditya_Mote_Resume.pdf"
            >
              Resume <Download size={15} strokeWidth={2.2} />
            </a>
          </div>
          <div className="about-sections">
            {sections.map((s) => (
              <section key={s.label} className="about-section">
                <h2>{s.label}</h2>
                <p>{s.body}</p>
              </section>
            ))}
          </div>
        </motion.article>

        <div className="about-widgets">
          <motion.div
            className={`awidget social${socialHot ? " is-hot" : ""}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.5 }}
          >
            <span className="card-bleed" aria-hidden />
            <LinkedInBadge />
            <div className="awidget-inner">
              <div className="awidget-head">
                <img src={avatar} alt="" />
                <div>
                  <strong>{site.fullName}</strong>
                  <span>{site.handle}</span>
                </div>
              </div>
              <p className="awidget-bio">
                cooking up • product design • prev{" "}
                <a href="https://figma.com" target="_blank" rel="noreferrer">
                  @figma
                </a>
              </p>
              <a
                className="awidget-btn"
                href={site.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setSocialHot(true)}
                onMouseLeave={() => setSocialHot(false)}
                onFocus={() => setSocialHot(true)}
                onBlur={() => setSocialHot(false)}
              >
                View LinkedIn <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>

          <motion.div
            className={`awidget music${trackPlaying ? " is-hot" : ""}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5 }}
          >
            <span className="card-bleed" aria-hidden />
            <AppleMusicBadge />
            <div className="awidget-inner media-card">
              <div className="media-art-block">
                <img src={track.cover} alt="" className="music-art" />
              </div>
              <div className="music-meta">
                <strong>{track.title}</strong>
                <span>{track.artist}</span>
              </div>
              <div className="media-rule" />
              <MediaControls playing={trackPlaying} onToggle={toggleTrack} />
            </div>
          </motion.div>

          <motion.div
            className="awidget photos"
            role="button"
            tabIndex={0}
            aria-label="Tap to see next photo"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.5 }}
            onClick={() => setPhotoIndex((i) => (i + 1) % photos.length)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setPhotoIndex((i) => (i + 1) % photos.length);
              }
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={photos[photoIndex]}
                src={photos[photoIndex]}
                alt=""
                className="photos-bg"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
            <PhotosBadge />
            <nav
              className="photos-dock"
              aria-label="Photos"
              onClick={(e) => e.stopPropagation()}
            >
              {photoTabs.map((tab, i) => (
                <button
                  key={tab.label}
                  type="button"
                  className={photoIndex % photoTabs.length === i ? "active" : ""}
                  aria-label={tab.label}
                  onClick={() => setPhotoIndex(i)}
                >
                  {tab.icon}
                </button>
              ))}
            </nav>
          </motion.div>

          <motion.div
            className={`awidget podcast${podPlaying ? " is-hot" : ""}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="card-bleed" aria-hidden />
            <PodcastsBadge />
            <div className="awidget-inner media-card">
              <a
                className="media-art-block"
                href={podcast.href}
                target="_blank"
                rel="noreferrer"
                aria-label="Open episode on Apple Podcasts"
              >
                <img src={podcast.cover} alt="" className="music-art" />
              </a>
              <div className="music-meta">
                <strong>
                  <a href={podcast.href} target="_blank" rel="noreferrer">
                    {podcast.title}
                  </a>
                </strong>
                <span>{podcast.show}</span>
              </div>
              <div className="media-rule" />
              <MediaControls playing={podPlaying} onToggle={togglePod} />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
