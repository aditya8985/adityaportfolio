import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import { site } from "../data/content";
import "./Contact.css";

const avatar = site.avatar;

type Step = "name" | "phone" | "email" | "help" | "done";
type ChatMessage = { id: number; from: "me" | "them" | "typing"; text: string };

type Lead = {
  name: string;
  phone: string;
  email: string;
  help: string;
};

const prompts: Record<Exclude<Step, "done">, string> = {
  name: "hey 👋 looking to collab, build something, or just chat? what's your name?",
  phone: "nice one, {name}. drop your phone number real quick 📱",
  email: "solid. and your email? so i can actually get back to you ✉️",
  help: "last one — how can i help you? project, idea, feedback, whatever's on your mind",
};

const placeholders: Record<Step, string> = {
  name: "your name",
  phone: "phone number",
  email: "email address",
  help: "how can i help?",
  done: "all set",
};

const nextStep: Record<Exclude<Step, "done">, Step> = {
  name: "phone",
  phone: "email",
  email: "help",
  help: "done",
};

function LinkedInIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.06-2.065 2.064 2.064 0 112.06 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2L3 7l9 5 9-5-9-5z" fill="#A8FF60" />
      <path d="M3 12l9 5 9-5" stroke="#5B8CFF" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M3 17l9 5 9-5" stroke="#FF6B9D" strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  );
}

function validate(step: Step, value: string): string | null {
  if (!value.trim()) return "need something there — try again?";
  if (step === "name" && value.trim().length < 2) return "that feels a bit short. full name?";
  if (step === "phone" && !/^[\d+\-\s()]{7,}$/.test(value.trim())) {
    return "doesn't look like a phone number. one more try?";
  }
  if (step === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
    return "that email looks off — check it once?";
  }
  if (step === "help" && value.trim().length < 3) return "give me a bit more detail?";
  return null;
}

let msgId = 1;

export function Contact() {
  const [step, setStep] = useState<Step>("name");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [lead, setLead] = useState<Lead>({ name: "", phone: "", email: "", help: "" });
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: msgId++, from: "them", text: prompts.name },
  ]);
  const [emailHover, setEmailHover] = useState(false);
  const [linkedinHover, setLinkedinHover] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = threadRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const pushBot = (text: string, delay = 650) => {
    setBusy(true);
    setMessages((prev) => [...prev, { id: msgId++, from: "typing", text: "" }]);

    window.setTimeout(() => {
      setMessages((prev) => {
        const withoutTyping = prev.filter((m) => m.from !== "typing");
        return [...withoutTyping, { id: msgId++, from: "them", text }];
      });
      setBusy(false);
      inputRef.current?.focus();
    }, delay);
  };

  const onSend = (e: FormEvent) => {
    e.preventDefault();
    if (busy || step === "done") return;

    const text = input.trim();
    const error = validate(step, text);
    if (error) {
      setInput("");
      pushBot(error, 450);
      return;
    }

    setMessages((prev) => [...prev, { id: msgId++, from: "me", text }]);
    setInput("");

    const updated = { ...lead, [step]: text } as Lead;
    setLead(updated);

    const upcoming = nextStep[step as Exclude<Step, "done">];

    if (upcoming === "done") {
      pushBot(
        `thanks ${updated.name.split(" ")[0]} — locked in. i'll reach out at ${updated.email}. or hit me on email / LinkedIn below anytime 👍`,
        800,
      );
      setStep("done");
      return;
    }

    const prompt = prompts[upcoming]
      .replace("{name}", updated.name ? updated.name.split(" ")[0] : "friend");
    pushBot(prompt, 700);
    setStep(upcoming);
  };

  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    lead.name ? `Chat with ${lead.name}` : "Let's Chat",
  )}&body=${encodeURIComponent(
    lead.help
      ? `Hi,\n\n${lead.help}\n\n— ${lead.name}\n${lead.phone}\n${lead.email}`
      : "Say hello",
  )}`;

  return (
    <main className="page contact-page">
      <div className="contact-wrap">
        <div className="contact-main">
        <motion.section
          className="contact-card contact-chat"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="chat-head">
            <img src={avatar} alt="" className="chat-avatar" />
            <div>
              <span>{site.name}</span>
              <small className="chat-status">{busy ? "typing…" : "online"}</small>
            </div>
          </div>

          <div className="chat-thread" ref={threadRef}>
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  className={`chat-row ${m.from === "typing" ? "them" : m.from}`}
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  {m.from !== "me" ? <img src={avatar} alt="" className="bubble-avatar" /> : null}
                  {m.from === "typing" ? (
                    <div className="chat-bubble them typing-bubble" aria-label="Typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  ) : (
                    <div className={`chat-bubble ${m.from}`}>{m.text}</div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <form className="chat-composer" onSubmit={onSend}>
            <div className="composer-icons">
              <a href={mailtoHref} className="composer-icon" aria-label="Email" title="Email">
                <Mail size={20} strokeWidth={1.75} />
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="composer-icon linkedin"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedInIcon size={18} />
              </a>
            </div>
            <div className="composer-field">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholders[step]}
                aria-label={placeholders[step]}
                disabled={busy || step === "done"}
                autoComplete={
                  step === "name"
                    ? "name"
                    : step === "phone"
                      ? "tel"
                      : step === "email"
                        ? "email"
                        : "off"
                }
                inputMode={step === "phone" ? "tel" : step === "email" ? "email" : "text"}
              />
              <button
                type="submit"
                className="composer-send"
                aria-label="Send"
                disabled={busy || step === "done" || !input.trim()}
              >
                <ArrowUp size={16} strokeWidth={2.5} />
              </button>
            </div>
          </form>
        </motion.section>

        <div className="contact-grid">
          <motion.article
            className={`contact-card contact-email${emailHover ? " is-hot" : ""}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="card-bleed" aria-hidden />
            <div className="card-inner">
              <div className="method-head">
                <div>
                  <strong>{site.fullName}</strong>
                  <span>{site.email}</span>
                </div>
                <div className="method-logo email-logo" aria-hidden>
                  <LayersIcon />
                </div>
              </div>

              <div className="email-preview">
                <p>
                  <span className="muted">To</span> {site.email}
                </p>
                <p className="email-subject">{lead.name ? `Chat with ${lead.name}` : "Let's Chat"}</p>
                <p className="email-body">{lead.help || "Say hello"}</p>
              </div>

              <a
                className="method-btn email-btn"
                href={mailtoHref}
                onMouseEnter={() => setEmailHover(true)}
                onMouseLeave={() => setEmailHover(false)}
                onFocus={() => setEmailHover(true)}
                onBlur={() => setEmailHover(false)}
              >
                Email Me <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.article>

          <motion.article
            className={`contact-card contact-linkedin${linkedinHover ? " is-hot" : ""}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="card-bleed" aria-hidden />
            <div className="card-inner">
              <div className="method-head">
                <div className="linkedin-identity">
                  <img src={avatar} alt="" />
                  <div>
                    <strong>{site.fullName.toLowerCase()}</strong>
                    <span>{site.handle}</span>
                  </div>
                </div>
                <div className="method-logo linkedin-logo" aria-hidden>
                  <LinkedInIcon size={26} />
                </div>
              </div>

              <p className="linkedin-bio">
                i design things <span className="spark">✴</span> product design{" "}
                <span className="spark">✴</span> open to collabs
              </p>

              <a
                className="method-btn linkedin-btn"
                href={site.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setLinkedinHover(true)}
                onMouseLeave={() => setLinkedinHover(false)}
                onFocus={() => setLinkedinHover(true)}
                onBlur={() => setLinkedinHover(false)}
              >
                LinkedIn DM <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.article>
        </div>
        </div>
      </div>
    </main>
  );
}
