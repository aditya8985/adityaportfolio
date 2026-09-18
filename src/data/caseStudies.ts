export type TypeStyle = {
  name: string;
  size: string;
  weight: string;
  lineHeight: string;
  sample: string;
  usage: string;
};

export type ColorToken = {
  name: string;
  hex: string;
  role: string;
};

export type SpaceToken = {
  token: string;
  px: string;
  use: string;
};

export type GridToken = {
  name: string;
  detail: string;
};

export type UiComponent = {
  name: string;
  variants: string[];
  states?: string[];
};

export type Persona = {
  name: string;
  age: string;
  role: string;
  goal: string;
  frustration: string;
  traits?: string[];
};

export type TimelineStep = {
  phase: string;
  days: string;
  detail: string;
};

export type FlowStep = {
  title: string;
  detail: string;
};

export type CaseSection = {
  id: string;
  label: string;
  title: string;
  body?: string;
  bullets?: string[];
  stats?: { value: string; label: string }[];
  tags?: string[];
  media?: string[];
  typeScale?: TypeStyle[];
  palette?: ColorToken[];
  spacing?: SpaceToken[];
  grid?: GridToken[];
  components?: UiComponent[];
  personas?: Persona[];
  timeline?: TimelineStep[];
  flowSteps?: FlowStep[];
  finalScreens?: { label: string; src: string }[];
};

export type CaseStudy = {
  eyebrow: string;
  headline: string;
  summary: string;
  role: string;
  duration: string;
  tools: string;
  figmaUrl?: string;
  liveUrl?: string;
  accent: string;
  heroMedia: string[];
  stats?: { value: string; label: string }[];
  sections: CaseSection[];
};

export const caseStudies: Record<string, CaseStudy> = {
  "design-system": {
    eyebrow: "Design System",
    headline: "SaaS Design System (AI + Automation Ready)",
    summary:
      "A scalable component library to build SaaS products faster and more consistently—tokens, components, patterns, and handoff documentation in one source of truth.",
    role: "UI/UX Designer",
    duration: "3 Weeks",
    tools: "Figma",
    accent: "#1a1a1a",
    figmaUrl:
      "https://www.figma.com/design/WvCNNvmss0gNKzGyDz9Ona/Design-System?node-id=0-1&t=uC3Rb3KNAutfKkG7-1",
    heroMedia: ["/design-system-cover.png"],
    stats: [
      { value: "50%", label: "Faster screen creation" },
      { value: "30+", label: "Reusable components" },
      { value: "3 wks", label: "Design to handoff" },
    ],
    sections: [
      {
        id: "overview",
        label: "01",
        title: "Overview",
        body: "Many SaaS products suffer from inconsistent UI patterns, repeated work, and slow design execution. I built a reusable design system that helps designers and developers create dashboards, forms, tables, and workflows quickly with consistency.",
        media: ["/design-system-cover.png"],
      },
      {
        id: "problem",
        label: "02",
        title: "The Problem",
        bullets: [
          "Inconsistent UI across product modules",
          "Repeated design effort for the same components",
          "Slow handoff and unclear developer implementation",
          "No defined typography, spacing, or component standards",
        ],
        media: ["/design-system-cover.png"],
      },
      {
        id: "goals",
        label: "03",
        title: "Goals",
        bullets: [
          "Create reusable components for SaaS dashboards",
          "Define typography, spacing, color tokens & accessibility",
          "Improve speed of building new product screens",
          "Provide developer-ready documentation",
        ],
      },
      {
        id: "process",
        label: "04",
        title: "Process",
        body: "SaaS UI Audit → Foundations → Components → Patterns. Each phase was documented so the file stays the single source of truth for product and engineering.",
        tags: ["Audit", "Tokens", "Components", "Patterns"],
      },
      {
        id: "typography",
        label: "05",
        title: "Typography & Variants",
        body: "A consistent type scale for dashboard-heavy interfaces and dense data views—clear hierarchy without one-off sizes.",
        typeScale: [
          {
            name: "Display",
            size: "40 / 48",
            weight: "700",
            lineHeight: "1.15",
            sample: "Design System",
            usage: "Page heroes, empty-state titles",
          },
          {
            name: "H1",
            size: "32 / 40",
            weight: "700",
            lineHeight: "1.2",
            sample: "Workspace settings",
            usage: "Primary page titles",
          },
          {
            name: "H2",
            size: "24 / 32",
            weight: "650",
            lineHeight: "1.25",
            sample: "Billing overview",
            usage: "Section headers",
          },
          {
            name: "H3",
            size: "20 / 28",
            weight: "600",
            lineHeight: "1.3",
            sample: "Team members",
            usage: "Card & panel titles",
          },
          {
            name: "Body",
            size: "16 / 24",
            weight: "400",
            lineHeight: "1.5",
            sample: "Build dashboards faster with reusable patterns.",
            usage: "Default reading text",
          },
          {
            name: "Body Strong",
            size: "16 / 24",
            weight: "600",
            lineHeight: "1.5",
            sample: "Invite your team to get started.",
            usage: "Emphasis inside body copy",
          },
          {
            name: "Caption",
            size: "13 / 18",
            weight: "500",
            lineHeight: "1.4",
            sample: "Updated 2 hours ago",
            usage: "Meta, timestamps, helpers",
          },
          {
            name: "Overline",
            size: "11 / 14",
            weight: "650",
            lineHeight: "1.3",
            sample: "STATUS · ACTIVE",
            usage: "Labels, badges, table headers",
          },
        ],
      },
      {
        id: "colors",
        label: "06",
        title: "Colors",
        body: "Semantic color tokens for product states—info, success, warning, and critical—so UI meaning stays consistent across modules.",
        palette: [
          { name: "Neutral 950", hex: "#0F1115", role: "Primary text / icons" },
          { name: "Neutral 700", hex: "#3A3F4A", role: "Secondary text" },
          { name: "Neutral 400", hex: "#8B919C", role: "Muted / placeholders" },
          { name: "Neutral 100", hex: "#F2F3F5", role: "Surfaces / strips" },
          { name: "Neutral 0", hex: "#FFFFFF", role: "Cards / canvas" },
          { name: "Brand 600", hex: "#1A1A1A", role: "Primary actions" },
          { name: "Brand 50", hex: "#F4F4F5", role: "Subtle brand fill" },
          { name: "Info 500", hex: "#2F6FED", role: "Informational states" },
          { name: "Success 500", hex: "#1F9D6A", role: "Success / confirmed" },
          { name: "Warning 500", hex: "#D97706", role: "Caution / pending" },
          { name: "Critical 500", hex: "#DC3D3D", role: "Errors / destructive" },
          { name: "Border", hex: "#E4E6EA", role: "Dividers / strokes" },
        ],
      },
      {
        id: "grid-space",
        label: "07",
        title: "Grid & Space",
        body: "An 8px spacing rhythm and reusable grid templates keep layout logic predictable across forms, lists, and operational dashboards.",
        spacing: [
          { token: "space-1", px: "4px", use: "Tight icon gaps" },
          { token: "space-2", px: "8px", use: "Inline chip / label gaps" },
          { token: "space-3", px: "12px", use: "Form field internal padding" },
          { token: "space-4", px: "16px", use: "Card padding / stack gaps" },
          { token: "space-5", px: "24px", use: "Section spacing" },
          { token: "space-6", px: "32px", use: "Page block gaps" },
          { token: "space-8", px: "48px", use: "Major section breaks" },
          { token: "space-10", px: "64px", use: "Page top / bottom rhythm" },
        ],
        grid: [
          { name: "App shell", detail: "240px sidebar + fluid content · 24px page gutter" },
          { name: "Dashboard", detail: "12-column content grid · 16px gutters · max 1280px" },
          { name: "Forms", detail: "Single / dual column · 16px field stack · 24px group gap" },
          { name: "Tables", detail: "Full-bleed rows · sticky header · 12–16px cell padding" },
          { name: "Modals", detail: "480 / 640 / 800 widths · 24px inset · stacked actions" },
        ],
      },
      {
        id: "components",
        label: "08",
        title: "Component Library",
        body: "Core SaaS building blocks with documented variants and states—default, hover, active, disabled, error, and success—so design and engineering share one source of truth.",
        media: ["/design-system-components.png"],
        components: [
          {
            name: "Buttons",
            variants: ["Primary", "Secondary", "Ghost", "Destructive", "Icon"],
            states: ["Default", "Hover", "Active", "Disabled", "Loading"],
          },
          {
            name: "Inputs",
            variants: ["Text", "Password", "Search", "Textarea", "With icon"],
            states: ["Default", "Focus", "Error", "Disabled", "Success"],
          },
          {
            name: "Dropdowns",
            variants: ["Single select", "Multi select", "Menu", "Combobox"],
            states: ["Closed", "Open", "Disabled", "Error"],
          },
          {
            name: "Tables",
            variants: ["Basic", "Sortable", "Selectable", "Compact"],
            states: ["Default", "Loading", "Empty", "Error"],
          },
          {
            name: "Modals",
            variants: ["Confirm", "Form", "Info", "Destructive"],
            states: ["Open", "Loading", "Error"],
          },
          {
            name: "Toasts",
            variants: ["Info", "Success", "Warning", "Error"],
            states: ["Enter", "Idle", "Exit"],
          },
          {
            name: "Tabs",
            variants: ["Underline", "Pill", "Segmented"],
            states: ["Default", "Active", "Disabled"],
          },
          {
            name: "Cards",
            variants: ["Basic", "Metric", "List row", "Empty"],
            states: ["Default", "Hover", "Selected"],
          },
          {
            name: "Badges",
            variants: ["Neutral", "Info", "Success", "Warning", "Critical"],
            states: ["Default", "Subtle"],
          },
          {
            name: "Navigation",
            variants: ["Sidebar", "Top bar", "Breadcrumb", "Pagination"],
            states: ["Default", "Active", "Collapsed"],
          },
          {
            name: "Filters",
            variants: ["Search", "Chip filter", "Sort menu", "Date range"],
            states: ["Idle", "Applied", "Clear"],
          },
          {
            name: "Feedback",
            variants: ["Empty state", "Skeleton", "Spinner", "Inline alert"],
            states: ["Loading", "Empty", "Error"],
          },
        ],
        tags: ["30+ components", "Variants", "States", "Handoff-ready"],
      },
      {
        id: "impact",
        label: "09",
        title: "Impact",
        bullets: [
          "Reduced screen design time by ~50% using reusable components",
          "Improved UI consistency across multiple product modules",
          "Created dev-ready components with naming and documentation",
        ],
        tags: ["Design tokens", "Component library", "Patterns", "Documentation"],
      },
    ],
  },

  microinteraction: {
    eyebrow: "Motion & Prototype",
    headline: "Micro-interaction Application",
    summary:
      "Prototype-first UI exploration focused on delightful micro-interactions, responsive behavior, and clear state feedback inside a SaaS experience.",
    role: "UI/UX Designer",
    duration: "Prototype sprint",
    tools: "Figma",
    accent: "#2a2a2e",
    figmaUrl:
      "https://www.figma.com/design/zVLEhRdL6wVXkvkiruZGGx/Interaction?node-id=60-773&t=po3wUndgrTCvVfYc-0",
    heroMedia: ["/microinteraction/ui-1.jpg", "/microinteraction/ui-2.jpg"],
    sections: [
      {
        id: "overview",
        label: "01",
        title: "Overview",
        body: "This project explores micro-interactions inside a SaaS application. The goal was to prototype transitions, responsive layouts, and state feedback so the interface feels fast, clear, and satisfying to use.",
        media: ["/microinteraction/ui-1.jpg"],
      },
      {
        id: "focus",
        label: "02",
        title: "Prototyping focus",
        body: "Prototyping is the core deliverable. Components and screens were linked with interaction rules to test hover/press feedback, toggle states, motion curves, and responsive rearrangement—reducing ambiguity before development.",
        tags: ["Hover / press", "Toggles", "Motion curves", "Responsive states"],
        media: ["/microinteraction/ui-2.jpg"],
      },
      {
        id: "outcome",
        label: "03",
        title: "Outcome",
        body: "A clickable prototype that communicates product feel early—helping stakeholders experience interaction quality before engineering investment.",
        media: ["/microinteraction/ui-1.jpg", "/microinteraction/ui-2.jpg"],
      },
    ],
  },

  samayseva: {
    eyebrow: "Mobile Product",
    headline: "SamaySeva – Smart Queue Management App",
    summary:
      "A mobile app that helps users join queues remotely and track waiting progress in real time—built for hospitals, banks, restaurants, and public service centers.",
    role: "UI/UX Designer",
    duration: "25 days · Research → Design",
    tools: "Figma",
    accent: "#1b5e3b",
    figmaUrl:
      "https://www.figma.com/design/yb8YlX1jnRgRO3Dx0y3iv3/Project-2---SamaySeva?node-id=4-8&t=wkYgVvq2cg4NreZX-1",
    heroMedia: [
      "/samayseva/splash.jpg",
      "/samayseva/home.png",
      "/samayseva/schedule.png",
      "/samayseva/queue.png",
    ],
    sections: [
      {
        id: "overview",
        label: "01",
        title: "Overview",
        body: "SamaySeva is a smart queue management app designed to reduce physical waiting time in hospitals, banks, restaurants, government offices, and service centers. Users can join a queue remotely and receive live updates on position, estimated wait time, and service progress.",
        media: ["/samayseva/splash.jpg", "/samayseva/home.png"],
        tags: ["Mobile app", "Queue management", "Real-time updates"],
      },
      {
        id: "problem-solution",
        label: "02",
        title: "Problem & Solution",
        body: "Long waiting lines waste time, create chaos, and cause stress—especially for elderly users and people with disabilities.",
        bullets: [
          "Problem — Physical queues at banks, hospitals, and public offices exhaust users and feel unpredictable.",
          "Solution — Join queues remotely, track live position and wait time, and cancel or request more time when needed.",
          "Value — Less standing time for customers, clearer flow for service providers.",
        ],
        media: ["/samayseva/home.png", "/samayseva/queue.png"],
      },
      {
        id: "timeline",
        label: "03",
        title: "Project Timeline",
        body: "A structured 25-day plan from research through final UI and case documentation—keeping research, flows, and visuals tightly sequenced.",
        timeline: [
          {
            phase: "Research",
            days: "4 days",
            detail: "User interviews, service constraints, and queue pain-point mapping",
          },
          {
            phase: "UX Examine",
            days: "5 days",
            detail: "Personas, journey mapping, and opportunity framing",
          },
          {
            phase: "Wireframes",
            days: "4 days",
            detail: "Low-fidelity screens and end-to-end user flow architecture",
          },
          {
            phase: "UI Design",
            days: "7 days",
            detail: "Visual system, high-fidelity screens, and component polish",
          },
          {
            phase: "Case Study",
            days: "5 days",
            detail: "Documentation, presentation, and design rationale",
          },
        ],
        media: ["/samayseva/splash.jpg"],
      },
      {
        id: "personas",
        label: "04",
        title: "User Personas",
        body: "Research focused on real waiting-room pain—physical fatigue, unpredictable delays, and the need for clear, glanceable status.",
        personas: [
          {
            name: "Ramesh",
            age: "65",
            role: "Retired",
            goal: "Visit the bank and hospital without standing for hours.",
            frustration: "Physical exhaustion from long queues; the experience feels chaotic and stressful.",
            traits: ["Accessibility needs", "Low patience for chaos", "Prefers clarity"],
          },
          {
            name: "Priya",
            age: "28",
            role: "Software Engineer",
            goal: "Grab lunch or finish public-service tasks quickly during work breaks.",
            frustration: "Unpredictable waiting times ruin her schedule; she hates wasting time.",
            traits: ["Time-poor", "Mobile-first", "Needs live ETA"],
          },
        ],
        media: ["/samayseva/home.png"],
      },
      {
        id: "wireframes",
        label: "05",
        title: "Wireframes & User Flow",
        body: "Low-fidelity structure mapped the journey from entry to queue completion before visual design—keeping every screen tied to a clear job-to-be-done.",
        flowSteps: [
          {
            title: "App Entry",
            detail: "Splash, onboarding/intro, and secure login/signup (Phone, Google, Email).",
          },
          {
            title: "Home",
            detail: "Search / location detection, nearby venues, and recommended or recent places.",
          },
          {
            title: "Queue join",
            detail: "Pick a service slot, confirm details, and join the remote queue.",
          },
          {
            title: "Queue management",
            detail: "Live position, estimated wait, request extra time, or cancel the spot.",
          },
          {
            title: "Notifications",
            detail: "Alerts for wait changes, reminders, and queue completion.",
          },
          {
            title: "Profile & settings",
            detail: "User info, accessibility options, language, help, and logout.",
          },
        ],
        media: ["/samayseva/home.png", "/samayseva/schedule.png"],
        tags: ["Wireframes", "User flow", "Information architecture"],
      },
      {
        id: "final-ui",
        label: "06",
        title: "Final UI",
        body: "High-fidelity screens built on Poppins, a dark-green brand system, and high-clarity layouts for bright, busy service environments.",
        finalScreens: [
          { label: "Splash", src: "/samayseva/splash.jpg" },
          { label: "Home / venues", src: "/samayseva/home.png" },
          { label: "Schedule & join", src: "/samayseva/schedule.png" },
          { label: "Live queue tickets", src: "/samayseva/queue.png" },
        ],
        media: [
          "/samayseva/splash.jpg",
          "/samayseva/home.png",
          "/samayseva/schedule.png",
          "/samayseva/queue.png",
        ],
        tags: ["Poppins", "Dark green brand", "High contrast"],
      },
      {
        id: "outcome",
        label: "07",
        title: "Outcome",
        body: "SamaySeva delivers a smooth, user-friendly experience that reduces physical waiting time, improves transparency, and creates a structured queue system for both customers and service providers.",
        bullets: [
          "Remote joining removes the need to stand in chaotic lines",
          "Live position and ETA make wait times predictable",
          "Clear tickets and status reduce anxiety for elderly and time-poor users",
          "Service providers get a calmer, more organized queue flow",
        ],
        media: ["/samayseva/queue.png", "/samayseva/schedule.png"],
        tags: ["Less waiting", "More clarity", "Better service ops"],
      },
    ],
  },

  arrow: {
    eyebrow: "AR Navigation",
    headline: "Arrow – Smart Mall Navigation App",
    summary:
      "An indoor navigation experience guiding shoppers through complex mall infrastructures using interactive maps and AR directional cues.",
    role: "UI/UX Designer",
    duration: "Product design case study",
    tools: "Figma · ProtoPie",
    accent: "#0f3d2e",
    figmaUrl:
      "https://www.figma.com/design/AD0k6kN956M6WvqbTwRJd9/Project-3---AR-based-Indoor-Navigation?node-id=9-2&t=s4rP3kFQTe2Bb80z-1",
    heroMedia: [
      "/arrow/splash.jpg",
      "/arrow/landing.jpg",
      "/arrow/shop.jpg",
      "/arrow/ar.jpg",
    ],
    sections: [
      {
        id: "overview",
        label: "01",
        title: "Overview",
        body: "Arrow is a location-aware mobile app designed to solve indoor navigation chaos. Using beacons and AR, it provides real-time turn-by-turn guidance inside large shopping malls.",
        media: ["/arrow/splash.jpg", "/arrow/landing.jpg"],
      },
      {
        id: "problem",
        label: "02",
        title: "The Problem",
        body: "Modern malls are multi-level mazes. Shoppers get lost, waste time finding stores, restrooms, exits, or parking—and directory boards often add more confusion.",
        media: ["/arrow/shop.jpg"],
      },
      {
        id: "solution",
        label: "03",
        title: "The Solution",
        body: "Interactive floor maps, AR arrows overlaid on the camera view, and clear destination cards that turn mall navigation into a seamless shopping experience.",
        tags: ["Floor maps", "AR wayfinding", "Store discovery"],
        media: ["/arrow/ar.jpg", "/arrow/shop.jpg"],
      },
      {
        id: "outcome",
        label: "04",
        title: "Outcome",
        body: "A high-contrast, glanceable navigation UI designed for bright mall environments—helping users orient quickly and reach destinations with confidence.",
        media: ["/arrow/ar.jpg"],
      },
    ],
  },

  ekartham: {
    eyebrow: "Live Website",
    headline: "Ekartham Academy – Academy Website",
    summary:
      "A responsive academy website designed to improve course discovery, trust, and student enquiries for CA and commerce coaching.",
    role: "UI/UX Designer",
    duration: "Live project",
    tools: "Figma · Web",
    accent: "#1e3a5f",
    liveUrl: "https://eca-commerce-hub-website.lovable.app/",
    heroMedia: ["/ekartham/hero.jpg"],
    sections: [
      {
        id: "overview",
        label: "01",
        title: "Overview",
        body: "Ekartham Academy is a live website project that gives the academy a structured, professional digital presence—helping students explore courses and reach out for admissions.",
        media: ["/ekartham/hero.jpg"],
      },
      {
        id: "problem",
        label: "02",
        title: "The Problem",
        body: "Students struggled to find clear information about courses and credibility. Weak structure, outdated UI, and unclear CTAs reduced trust and enquiry conversion.",
        media: ["/ekartham/hero.jpg"],
      },
      {
        id: "process",
        label: "03",
        title: "Process",
        body: "Research → Information Architecture → Wireframes → UI Design → Responsive Refinement.",
        bullets: [
          "Homepage → Course exploration → Course details",
          "Trust sections, testimonials, and FAQ",
          "Clear enquiry CTAs across the journey",
        ],
        media: ["/ekartham/hero.jpg"],
      },
      {
        id: "outcome",
        label: "04",
        title: "Outcome",
        body: "A modern, responsive experience that improves course discoverability, builds student trust, and increases enquiry conversion through clearer CTA placement.",
        media: ["/ekartham/hero.jpg"],
      },
    ],
  },

  irctc: {
    eyebrow: "Website Redesign",
    headline: "IRCTC – Website Redesign",
    summary:
      "A clearer train booking experience redesigned for mobile—from search to train selection, booking, and ticket confirmation.",
    role: "UI/UX Designer",
    duration: "Concept redesign",
    tools: "Figma",
    accent: "#1a3a6b",
    heroMedia: [
      "/irctc/home.jpg",
      "/irctc/trains.jpg",
      "/irctc/book.png",
      "/irctc/ticket.png",
    ],
    sections: [
      {
        id: "overview",
        label: "01",
        title: "Overview",
        body: "IRCTC’s booking journey is powerful but often overwhelming. This redesign focuses on clarity, hierarchy, and a confident path from search to a generated ticket.",
        media: ["/irctc/home.jpg"],
      },
      {
        id: "flow",
        label: "02",
        title: "Booking flow",
        bullets: [
          "Home — search trains with clear inputs and class chips",
          "Trains — scan results with timing and class availability",
          "Book — pick date/availability and commit to a fare",
          "Ticket — success state with readable PNR and journey details",
        ],
        media: [
          "/irctc/home.jpg",
          "/irctc/trains.jpg",
          "/irctc/book.png",
          "/irctc/ticket.png",
        ],
      },
      {
        id: "outcome",
        label: "03",
        title: "Outcome",
        body: "A calmer, more scannable booking UI that keeps critical actions visible and reduces cognitive load across the full ticket journey.",
        media: ["/irctc/ticket.png"],
      },
    ],
  },
};
