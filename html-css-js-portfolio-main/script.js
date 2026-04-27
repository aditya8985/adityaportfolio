function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
  // Select all sections across the site
  const sections = document.querySelectorAll("section");

  // Add the base animation class to all sections
  sections.forEach((sec) => {
    sec.classList.add("scroll-animate");
  });

  // Configure Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: "-15% 0px -15% 0px", // triggers when section is 15% into viewport
    threshold: 0.1
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-active");
      } else {
        // Blur out when scrolling past
        entry.target.classList.remove("scroll-active");
      }
    });
  }, observerOptions);

  sections.forEach((sec) => {
    sectionObserver.observe(sec);
  });
});
