import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { restaurants } from "../data/content";
import { Star } from "lucide-react";
import "./TakeOutDemo.css";

export function TakeOutDemo() {
  const [selected, setSelected] = useState(0);
  const [phase, setPhase] = useState<"list" | "trivia" | "result">("list");
  const [answer, setAnswer] = useState<number | null>(null);

  const r = restaurants[selected];

  return (
    <section className="project-block page-pad">
      <div className="project-copy">
        <p className="project-kicker">🥡 Take-Out</p>
        <h2>Trivia-based food delivery app</h2>
        <p className="project-desc">
          Order food, answer trivia, unlock discounts. An interactive prototype you can click through—just like the real case study.
        </p>
      </div>

      <div className="phone-shell">
        <div className="phone-notch" />
        <div className="phone-status">
          <span>9:41</span>
          <span className="phone-signal">●●●</span>
        </div>

        <AnimatePresence mode="wait">
          {phase === "list" && (
            <motion.div
              key="list"
              className="phone-screen"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.28 }}
            >
              <div className="to-header">
                <strong>3 Restaurants</strong>
                <span>10:00pm Express</span>
              </div>
              <div className="to-list">
                {restaurants.map((item, i) => (
                  <button
                    key={item.name}
                    className={`to-card${selected === i ? " active" : ""}`}
                    onClick={() => setSelected(i)}
                  >
                    <img src={item.image} alt="" />
                    <div>
                      <strong>{item.name}</strong>
                      <small>{item.type}</small>
                      <small>
                        {item.time} • {item.fee} • <Star size={10} fill="currentColor" /> {item.rating}
                      </small>
                    </div>
                  </button>
                ))}
              </div>
              <button className="to-cta" onClick={() => setPhase("trivia")}>
                Order from {r.name}
              </button>
            </motion.div>
          )}

          {phase === "trivia" && (
            <motion.div
              key="trivia"
              className="phone-screen"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button className="to-back" onClick={() => setPhase("list")}>
                ← Back
              </button>
              <h3 className="to-q">What year did Joe's Pizza open?</h3>
              {[1975, 1984, 1992].map((year, i) => (
                <button
                  key={year}
                  className={`to-answer${answer === i ? " picked" : ""}`}
                  onClick={() => {
                    setAnswer(i);
                    setTimeout(() => setPhase("result"), 400);
                  }}
                >
                  {year}
                </button>
              ))}
            </motion.div>
          )}

          {phase === "result" && (
            <motion.div
              key="result"
              className="phone-screen to-result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                className="to-badge"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                🏅
              </motion.div>
              <h3>Trivia Results</h3>
              <p className="to-earn">You earned $3.25 off</p>
              <p className="to-rank">Rank #70 — Top 3 in 3 restaurants</p>
              <button
                className="to-cta"
                onClick={() => {
                  setPhase("list");
                  setAnswer(null);
                }}
              >
                Order again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
