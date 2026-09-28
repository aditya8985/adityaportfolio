import { BentoHome } from "../components/BentoHome";
import { WorkGallery } from "../components/WorkGallery";
import "./Home.css";

export function Home() {
  return (
    <main className="page home">
      <BentoHome />
      <WorkGallery />
    </main>
  );
}
