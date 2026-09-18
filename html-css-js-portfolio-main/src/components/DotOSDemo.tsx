import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { bookmarks, notionDocs, figmaFiles, linearTasks, site } from "../data/content";
import "./DotOSDemo.css";

function WindowChrome({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`os-window ${className}`}>
      <div className="os-chrome">
        <div className="os-dots">
          <span />
          <span />
          <span />
        </div>
        <span className="os-title">{title}</span>
      </div>
      <div className="os-body">{children}</div>
    </div>
  );
}

export function DotOSDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -120]);
  const y3 = useTransform(scrollYProgress, [0, 1], [80, -60]);
  const y4 = useTransform(scrollYProgress, [0, 1], [20, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 120, damping: 20 });
  const springY = useSpring(my, { stiffness: 120, damping: 20 });

  const onMove = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x * 24);
    my.set(y * 16);
  };

  return (
    <section
      className="dotos"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <div className="dotos-stage">
        <motion.div className="dotos-layer" style={{ x: springX, y: springY }}>
          <motion.div className="float float-arc" style={{ y: y1, rotate }}>
            <WindowChrome title="Arc" className="win-arc">
              <div className="arc-list">
                {bookmarks.map((b) => (
                  <a key={b.title} href={b.url} className="arc-row" target="_blank" rel="noreferrer">
                    <span className="arc-fav">{b.favicon}</span>
                    <div>
                      <strong>{b.title}</strong>
                      <small>{b.url.replace("https://", "")}</small>
                    </div>
                  </a>
                ))}
              </div>
            </WindowChrome>
          </motion.div>

          <motion.div className="float float-notion" style={{ y: y2 }}>
            <WindowChrome title="Workspace" className="win-notion">
              <div className="notion-list">
                {notionDocs.map((doc) => (
                  <div key={doc} className="notion-row">
                    <span>📄</span>
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </WindowChrome>
          </motion.div>

          <motion.div className="float float-figma" style={{ y: y3 }}>
            <WindowChrome title="Figma" className="win-figma">
              <div className="figma-list">
                {figmaFiles.map((f) => (
                  <div key={f.name} className="figma-row">
                    <div className="figma-thumb" />
                    <div>
                      <strong>{f.name}</strong>
                      <small>{f.path}</small>
                    </div>
                  </div>
                ))}
              </div>
            </WindowChrome>
          </motion.div>

          <motion.div className="float float-linear" style={{ y: y4 }}>
            <WindowChrome title="Linear" className="win-linear">
              <div className="linear-list">
                {linearTasks.map((t, i) => (
                  <div key={t} className="linear-row">
                    <span className="linear-id">ENG-{1600 + i}</span>
                    <span>{t}</span>
                    <span className="linear-badge">Todo</span>
                  </div>
                ))}
              </div>
            </WindowChrome>
          </motion.div>

          <motion.div className="float float-slack" style={{ y: y1 }}>
            <WindowChrome title="Slack" className="win-slack">
              <div className="slack-channels">
                {["# general", "# design", "# random"].map((c) => (
                  <div key={c} className="slack-ch">
                    {c}
                  </div>
                ))}
              </div>
              <div className="slack-msg">
                <strong>Amari</strong>
                <p>DotOS feels like the future fr</p>
                <small>12m ago</small>
              </div>
            </WindowChrome>
          </motion.div>

          <motion.div className="float float-mail" style={{ y: y2 }}>
            <WindowChrome title="Mail" className="win-mail">
              <div className="mail-item">
                <strong>Be Human Here — Design Meeting</strong>
                <p>Here are some times I'm available this week…</p>
                <small>To: {site.email}</small>
              </div>
            </WindowChrome>
          </motion.div>

          <motion.div
            className="dotos-center"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="dotos-orb">
              <motion.div
                className="dotos-pulse"
                animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span>DotOS</span>
            </div>
            <p className="dotos-caption">A context-aware OS for a more personal computer</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
