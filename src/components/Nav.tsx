import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./Nav.css";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work", dot: true },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <motion.header
      className="nav-fixed"
      initial={{ y: mobile ? 16 : -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <nav className="nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={"end" in link ? link.end : false}
            className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
          >
            {"dot" in link && link.dot ? <span className="nav-dot" aria-hidden /> : null}
            {link.label}
          </NavLink>
        ))}
      </nav>
    </motion.header>
  );
}
