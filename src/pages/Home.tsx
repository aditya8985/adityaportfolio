import { BentoHome } from "../components/BentoHome";
import { WorkGallery } from "../components/WorkGallery";
import { motion } from "framer-motion";
import { site } from "../data/content";
import "./Home.css";

export function Home() {
  return (
    <main className="page home">
      <BentoHome />
      <WorkGallery />
      <motion.footer
        className="home-footer page-pad"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p>
          {site.fullName} — {site.title}
        </p>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </motion.footer>
    </main>
  );
}
