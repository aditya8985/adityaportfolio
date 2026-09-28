import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const scrollPositions = new Map<string, number>();

if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

/**
 * Scroll to top on new navigations (link clicks).
 * Restore prior scroll when using browser back/forward.
 */
export function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const key = location.key;

    const save = () => {
      scrollPositions.set(key, window.scrollY);
    };

    window.addEventListener("scroll", save, { passive: true });
    return () => {
      save();
      window.removeEventListener("scroll", save);
    };
  }, [location.key]);

  useLayoutEffect(() => {
    if (navigationType === "POP") {
      const y = scrollPositions.get(location.key) ?? 0;
      window.scrollTo({ top: y, left: 0, behavior: "instant" });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.key, navigationType]);

  return null;
}
