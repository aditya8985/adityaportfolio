export const site = {
  name: "Aditya",
  fullName: "Aditya Mote",
  title: "UI/UX Designer",
  location: "India",
  email: "aditya.mote10@gmail.com",
  phone: "+91 77448 47083",
  tagline: "the best things. an optimal amount.",
  emphasis: "Less, but better.",
  handle: "@adityamote",
  instagram: "@adityamote",
  bioShort: "i design things.",
  resume: "/Aditya_Mote_Resume.pdf",
  socials: {
    twitter: "https://twitter.com/",
    github: "https://github.com/aditya8985",
    linkedin: "https://www.linkedin.com/in/aditya-mote-aa78b4199/",
    arena: "https://are.na/",
    instagram: "https://instagram.com/adityamote",
    whatsapp: "https://wa.me/917744847083",
  },
};

export const aboutParagraphs = [
  `Self-disciplined and detail-oriented UI/UX Designer with 2+ years of experience creating research-driven, user-centered digital products. I focus on turning complex requirements into intuitive flows, clean interfaces, and pixel-perfect visual systems for web and mobile applications.`,
  `I grew up tinkering with computers long before I understood what “product” meant. Family told me to go outside—touch grass, they said. I did. I also kept building. That mix of curiosity and craft is still how I work.`,
  `Today I’m focused on calm, interactive experiences—fewer screens, clearer flows, and micro-moments that make software feel human.`,
];

export const listening: {
  title: string;
  artist: string;
  cover: string;
  src?: string;
}[] = [
  {
    title: "Sapphire",
    artist: "Ed Sheeran",
    cover: "/sapphire-cover.png",
    src: "/sapphire.mp3",
  },
  {
    title: "N95",
    artist: "Kendrick Lamar",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
  },
  {
    title: "See You Again",
    artist: "Tyler, The Creator",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba55b745?w=200&h=200&fit=crop",
  },
  {
    title: "Circles",
    artist: "Mac Miller",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop",
  },
];

export const podcast = {
  title: "Career as a Visual Developer?",
  show: "The Visual Developers Podcast",
  cover:
    "https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/3e/c8/93/3ec89377-e7cb-ee5a-ac4d-39b726072222/mza_14056966380105296024.jpg/600x600bb.jpg",
  src: "/visual-dev-fm.mp3",
  href: "https://podcasts.apple.com/us/podcast/can-you-have-a-career-as-a-visual-developer/id1481008550?i=1000465389414",
};

export const photos = [
  "/gallery/photo-01.jpg",
  "/gallery/photo-02.jpg",
  "/gallery/photo-03.jpg",
  "/gallery/photo-04.jpg",
  "/gallery/photo-05.jpg",
  "/gallery/photo-06.jpg",
  "/gallery/photo-07.jpg",
  "/gallery/photo-08.jpg",
  "/gallery/photo-09.jpg",
  "/gallery/photo-10.jpg",
  "/gallery/photo-11.jpg",
  "/gallery/photo-12.jpg",
];

export const projects: {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  href: string;
  visual: "dotos" | "takeout" | "availability" | "links" | "generic" | "image" | "samayseva" | "stacked" | "arrow" | "browser" | "irctc";
  cover?: string;
  covers?: [string, string];
  liveUrl?: string;
  figmaUrl?: string;
}[] = [
  {
    id: "design-system",
    emoji: "▣",
    title: "SaaS Design System",
    subtitle: "A scalable component library for product teams",
    href: "/work/design-system",
    visual: "image",
    cover: "/design-system-cover.png",
    figmaUrl:
      "https://www.figma.com/design/WvCNNvmss0gNKzGyDz9Ona/Design-System?node-id=0-1&t=uC3Rb3KNAutfKkG7-1",
  },
  {
    id: "samayseva",
    emoji: "⏱",
    title: "SamaySeva – Smart Queue App",
    subtitle: "Join queues remotely and track wait time live",
    href: "/work/samayseva",
    visual: "samayseva",
    figmaUrl:
      "https://www.figma.com/design/yb8YlX1jnRgRO3Dx0y3iv3/Project-2---SamaySeva?node-id=4-8&t=wkYgVvq2cg4NreZX-1",
  },
  {
    id: "arrow",
    emoji: "➤",
    title: "Arrow – Indoor Navigation",
    subtitle: "AR wayfinding for complex mall spaces",
    href: "/work/arrow",
    visual: "arrow",
    figmaUrl:
      "https://www.figma.com/design/AD0k6kN956M6WvqbTwRJd9/Project-3---AR-based-Indoor-Navigation?node-id=9-2&t=s4rP3kFQTe2Bb80z-1",
  },
  {
    id: "microinteraction",
    emoji: "✦",
    title: "Micro-interaction Application",
    subtitle: "Motion-led details that make SaaS feel alive",
    href: "/work/microinteraction",
    visual: "stacked",
    covers: ["/microinteraction/ui-1.jpg", "/microinteraction/ui-2.jpg"],
    figmaUrl:
      "https://www.figma.com/design/zVLEhRdL6wVXkvkiruZGGx/Interaction?node-id=60-773&t=po3wUndgrTCvVfYc-0",
  },
  {
    id: "ekartham",
    emoji: "◎",
    title: "Ekartham Academy Website",
    subtitle: "Live academy site for course discovery & enquiries",
    href: "/work/ekartham",
    visual: "browser",
    cover: "/ekartham/hero.jpg",
    liveUrl: "https://eca-commerce-hub-website.lovable.app/",
  },
  {
    id: "irctc",
    emoji: "🚆",
    title: "IRCTC – Website Redesign",
    subtitle: "A clearer train booking flow from search to ticket",
    href: "/work/irctc",
    visual: "irctc",
  },
];

export const bookmarks = [
  { title: "Personal site", url: "https://aditya.dev", favicon: "🌐" },
  { title: "Twitter", url: "https://twitter.com/", favicon: "✦" },
  { title: "Are.na", url: "https://are.na/", favicon: "◻" },
  { title: "Sidebar", url: "https://sidebar.io/", favicon: "📰" },
  { title: "Good News", url: "https://news.hifolks.com/", favicon: "☀️" },
];

export const notionDocs = [
  "DotOS Notes",
  "1-on-1 Meeting Notes",
  "Project Timeline",
  "Tasks",
  "Dev Handoffs",
  "Reads",
  "Vacation Plan",
];

export const figmaFiles = [
  { name: "DotOS Design", path: "figma.com/dot-os-design" },
  { name: "Design Sesh", path: "figma.com/design-sesh" },
  { name: "Portfolio 2.0", path: "figma.com/portfolio-2-0" },
  { name: "Empathy Map", path: "figma.com/empathy-map" },
];

export const linearTasks = [
  "Launch Portfolio",
  "Write Intro + Publish",
  "Presentation Deck",
  "Take Interviews",
];

export const restaurants = [
  {
    name: "Katsuei",
    type: "Japanese • Sushi",
    time: "20–30 min",
    fee: "$2.99 Delivery",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&h=200&fit=crop",
  },
  {
    name: "SUGARFISH",
    type: "Japanese • Sushi",
    time: "25–30 min",
    fee: "$2.99 Delivery",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=200&h=200&fit=crop",
  },
  {
    name: "Joe's Pizza",
    type: "Italian • Pizza",
    time: "10–15 min",
    fee: "$1.99 Delivery",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop",
  },
  {
    name: "Juliana's Pizza",
    type: "Italian • Pizza",
    time: "12–15 min",
    fee: "$1.99 Delivery",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop",
  },
];
