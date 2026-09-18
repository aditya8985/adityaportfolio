import { useState } from "react";
import { motion } from "framer-motion";
import "./AvailabilityDemo.css";

const days = [
  { label: "Mon 21", slots: ["9 AM", "11 AM"] },
  { label: "Tue 22", slots: ["10 AM", "11 AM", "1 PM"] },
  { label: "Wed 23", slots: ["9 AM", "10 AM", "11 AM"] },
];

export function AvailabilityDemo() {
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string | null>("9 AM");

  return (
    <section className="project-block reverse page-pad">
      <div className="avail-device">
        <div className="avail-panel">
          <div className="avail-top">
            <span>📅 Availability</span>
            <span className="avail-time">9:41</span>
          </div>
          <h3>Meet with Jess Wander</h3>
          <p className="avail-sub">Monday, Nov 21 · 9:00 – 10:00 AM</p>

          <div className="avail-days">
            {days.map((d, i) => (
              <button
                key={d.label}
                className={`avail-day${day === i ? " active" : ""}`}
                onClick={() => {
                  setDay(i);
                  setSlot(d.slots[0]);
                }}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="avail-slots">
            {days[day].slots.map((s) => (
              <motion.button
                key={s}
                layout
                className={`avail-slot${slot === s ? " active" : ""}`}
                onClick={() => setSlot(s)}
                whileTap={{ scale: 0.97 }}
              >
                {s}
              </motion.button>
            ))}
          </div>

          <motion.div
            className="avail-confirm"
            key={`${day}-${slot}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Selected: {days[day].label} · {slot}
          </motion.div>
        </div>
      </div>

      <div className="project-copy">
        <p className="project-kicker">📅 Availability</p>
        <h2>The fastest & friendliest way to share availability from anywhere</h2>
        <p className="project-desc">
          An OS for scheduling—pick a day, choose a slot, share. Built as an interactive preview of the CommandDot-style availability flow.
        </p>
      </div>
    </section>
  );
}
