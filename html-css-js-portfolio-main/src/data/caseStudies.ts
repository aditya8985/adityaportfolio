export type TypeStyle = {
  name: string;
  size: string;
  weight: string;
  lineHeight: string;
  sample: string;
  usage: string;
  fontFamily?: string;
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
  diagram?: { src: string; alt: string; caption?: string };
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
  video?: string;
  stats?: { value: string; label: string }[];
  sections: CaseSection[];
};

export const caseStudies: Record<string, CaseStudy> = {
  "design-system": {
    eyebrow: "Design System",
    headline: "Design System",
    summary:
      "A scalable component library to build SaaS products faster and more consistently—tokens, components, patterns, and handoff documentation in one source of truth.",
    role: "UI/UX Designer",
    duration: "3 Weeks",
    tools: "Figma",
    accent: "#1a1a1a",
    figmaUrl:
      "https://www.figma.com/design/WvCNNvmss0gNKzGyDz9Ona/Design-System?node-id=0-1&t=KJrgiEsyXQwqDewq-1",
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
      "Prototype-first UI exploration focused on delightful micro-interactions, Figma Smart Animate, responsive behavior, and clear state feedback inside a SaaS experience.",
    role: "UI/UX Designer",
    duration: "Prototype sprint",
    tools: "Figma · Smart Animate",
    accent: "#2a2a2e",
    figmaUrl:
      "https://www.figma.com/design/zVLEhRdL6wVXkvkiruZGGx/Interaction?node-id=0-1&t=YLEehpsVgdlqnjqK-1",
    video: "/microinteraction/demo.mp4",
    heroMedia: ["/microinteraction/ui-1.jpg", "/microinteraction/ui-2.jpg"],
    sections: [
      {
        id: "overview",
        label: "01",
        title: "Overview",
        body: "This project explores micro-interactions inside a SaaS application. The goal was to prototype transitions, responsive layouts, and state feedback so the interface feels fast, clear, and satisfying to use—before a single line of production code.",
        bullets: [
          "Responsive behavior across breakpoints",
          "Color change on switch / theme toggle interactions",
          "Motion + transitions to communicate state changes",
          "Prototype-first workflow to validate interaction timing",
        ],
        media: ["/microinteraction/ui-1.jpg"],
      },
      {
        id: "prototype",
        label: "02",
        title: "Interactive prototype",
        body: "A looping screen recording of the prototype — hover, press, toggles, and motion curves playing as designed so stakeholders can feel the product before development.",
        media: ["/microinteraction/ui-2.jpg"],
      },
      {
        id: "smart-animate",
        label: "03",
        title: "Figma Smart Animate",
        body: "Smart Animate connected matching layers across frames so properties morph instead of hard-cutting—position, scale, opacity, color, and corner radius all interpolate with intentional easing.",
        bullets: [
          "Matched layer names across variants so Figma could tween between states",
          "Custom ease curves (ease-out for enter, soft spring feel for toggles)",
          "Staggered delays for lists and stacked cards to create hierarchy in motion",
          "Duration tuned between 180–320ms so feedback feels instant, not theatrical",
          "Overflow and clip masks used for slide / reveal patterns without jank",
        ],
        tags: ["Smart Animate", "Variants", "Easing", "Duration tokens"],
        media: ["/microinteraction/ui-2.jpg"],
      },
      {
        id: "responsiveness",
        label: "04",
        title: "Responsiveness",
        body: "Layouts were prototyped across breakpoints so interaction rules stay coherent from desktop dashboards down to compact mobile views—not just resized screens, rearranged priorities.",
        bullets: [
          "Desktop — denser tables, hover affordances, multi-column side panels",
          "Tablet — collapsible nav, touch-friendly hit targets, simplified filters",
          "Mobile — stacked flows, bottom sheets, larger press states, reduced chrome",
          "Breakpoint-aware components: same component, different density and motion",
          "Validated that toggles, menus, and feedback still read clearly at every width",
        ],
        tags: ["Breakpoints", "Touch targets", "Adaptive layout", "Density"],
        media: ["/microinteraction/ui-1.jpg"],
      },
      {
        id: "innovative",
        label: "05",
        title: "Innovative micro-interactions",
        body: "Beyond standard hover and press—here are signature moments designed to make the SaaS feel alive. Try the live playground below.",
        bullets: [
          "Morphing segmented control — active pill slides with spring physics",
          "Magnetic CTA — cursor proximity gently pulls the button toward intent",
          "Theme toggle bloom — surface and accent colors crossfade in one beat",
          "Success toast that grows from the action origin, then settles",
          "Soft press depth — scale + shadow compress to mimic a real click",
        ],
        tags: ["Spring motion", "Magnetic cursor", "State bloom", "Delight"],
        media: ["/microinteraction/ui-2.jpg"],
      },
      {
        id: "outcome",
        label: "06",
        title: "Outcome",
        body: "A clickable, responsive prototype that communicates product feel early—helping stakeholders experience interaction quality and reducing ambiguity before engineering investment.",
        tags: ["Prototype-first", "Handoff clarity", "Motion spec"],
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
      "https://www.figma.com/design/yb8YlX1jnRgRO3Dx0y3iv3/Project-2---SamaySeva?node-id=0-1&t=goZSU8qmJOha66Wg-1",
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
        diagram: {
          src: "/samayseva/userflow.jpg",
          alt: "SamaySeva user flow diagram from onboarding to queue completion",
          caption: "End-to-end user flow — onboarding → home → join queue → live updates → done",
        },
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
        media: ["/samayseva/userflow.jpg", "/samayseva/home.png", "/samayseva/schedule.png"],
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
    duration: "25 days · Discovery → Testing",
    tools: "Figma · ProtoPie",
    accent: "#c8ff00",
    figmaUrl:
      "https://www.figma.com/design/AD0k6kN956M6WvqbTwRJd9/Project-3---AR-based-Indoor-Navigation?node-id=0-1&t=dhJZebD8L1A3AnWB-1",
    heroMedia: [
      "/arrow/splash.png",
      "/arrow/landing.png",
      "/arrow/shop.png",
      "/arrow/ar-turn.png",
      "/arrow/arrived.jpg",
    ],
    sections: [
      {
        id: "overview",
        label: "01",
        title: "Overview",
        body: "Arrow is a location-aware mobile application designed to solve the chaos of indoor navigation. By leveraging Bluetooth beacons and AR technology, it provides real-time, turn-by-turn directions within massive shopping malls—helping users locate stores, amenities, and their parked vehicles effortlessly.",
        media: ["/arrow/splash.png", "/arrow/landing.png"],
        tags: ["AR wayfinding", "Mall navigation", "Dark UI · neon green"],
      },
      {
        id: "problem-solution",
        label: "02",
        title: "Problem & Solution",
        body: "Modern malls are multi-level mazes. Shoppers get lost, waste time finding stores, restrooms, exits, or parking—and directory boards often add more confusion.",
        bullets: [
          "Problem — Confusing directories, indistinguishable hallways, and stress finding elevators or restrooms.",
          "Solution — Interactive floor maps, QR localization, and AR arrows overlaid on the camera view.",
          "Value — Confident wayfinding from search → scan → follow the arrow → arrival.",
        ],
        media: ["/arrow/landing.png", "/arrow/search.png"],
      },
      {
        id: "timeline",
        label: "03",
        title: "Project Timeline",
        body: "A structured 25-day plan focused on spatial accuracy, clear AR feedback, and usable wayfinding flows.",
        timeline: [
          {
            phase: "Discovery",
            days: "4 days",
            detail: "Spatial study, mall wayfinding pain points, and beacon constraints",
          },
          {
            phase: "Mapping",
            days: "5 days",
            detail: "Routing logic, floor-switching, and destination search model",
          },
          {
            phase: "Wireframes",
            days: "4 days",
            detail: "3D / AR flow architecture from launch to arrival",
          },
          {
            phase: "UI Design",
            days: "7 days",
            detail: "High-contrast visual system for bright mall environments",
          },
          {
            phase: "Testing",
            days: "5 days",
            detail: "User testing of AR cues, glanceability, and navigation clarity",
          },
        ],
        media: ["/arrow/splash.png"],
      },
      {
        id: "personas",
        label: "04",
        title: "User Personas",
        body: "Research focused on how people lose orientation in large indoor spaces—and what makes wayfinding feel effortless.",
        personas: [
          {
            name: "Neha Sharma",
            age: "32",
            role: "Parent & shopper",
            goal: "Shop without the hassle—and find elevators or restrooms quickly while navigating with a stroller.",
            frustration: "Confusing directory boards and indistinguishable hallways make every trip exhausting.",
            traits: ["Time-poor", "Needs accessibility", "Low patience for mazes"],
          },
          {
            name: "Rahul Verma",
            age: "26",
            role: "Tech-savvy visitor",
            goal: "Meet friends at a specific café without arriving late because he can’t find the floor or store.",
            frustration: "Mall size plus unclear signage creates stress when he’s already in a rush.",
            traits: ["In a rush", "Mobile-first", "Overwhelmed by scale"],
          },
        ],
        media: ["/arrow/landing.png"],
      },
      {
        id: "flows",
        label: "05",
        title: "User Flows",
        body: "A simple path from finding a store to walking there in AR—search, scan, follow, arrive.",
        flowSteps: [
          {
            title: "Find a store",
            detail: "Search or browse shops in the mall, then open the destination.",
          },
          {
            title: "Scan to locate",
            detail: "Scan a nearby QR code so the app knows where you are.",
          },
          {
            title: "Follow the arrow",
            detail: "AR path and turn cues guide you through floors and corridors.",
          },
          {
            title: "You arrived",
            detail: "Clear confirmation when you reach the destination.",
          },
        ],
        media: ["/arrow/search.png", "/arrow/qr.png", "/arrow/ar-turn.png", "/arrow/arrived.jpg"],
        tags: ["Search", "QR", "AR navigate", "Arrive"],
      },
      {
        id: "final-ui",
        label: "06",
        title: "Final UI",
        body: "High-fidelity screens in a dark, neon-green system—built for glanceability in bright mall lighting, from splash through AR arrival.",
        finalScreens: [
          { label: "Splash", src: "/arrow/splash.png" },
          { label: "Home / mall", src: "/arrow/landing.png" },
          { label: "Search stores", src: "/arrow/search.png" },
          { label: "Store detail", src: "/arrow/shop.png" },
          { label: "QR scan", src: "/arrow/qr.png" },
          { label: "AR — turn cue", src: "/arrow/ar-turn.png" },
          { label: "AR — escalator", src: "/arrow/ar-escalator.png" },
          { label: "Arrived", src: "/arrow/arrived.jpg" },
        ],
        media: [
          "/arrow/splash.png",
          "/arrow/landing.png",
          "/arrow/search.png",
          "/arrow/shop.png",
          "/arrow/qr.png",
          "/arrow/ar-turn.png",
          "/arrow/ar-escalator.png",
          "/arrow/arrived.jpg",
        ],
        tags: ["Dark UI", "Neon green", "Glass overlays", "AR cues"],
      },
      {
        id: "outcome",
        label: "07",
        title: "Outcome",
        body: "Arrow shows how spatial UX, clear wayfinding visuals, and AR-assisted guidance can turn stressful mall navigation into a smooth, confident journey.",
        bullets: [
          "High-contrast UI stays readable in bright indoor environments",
          "QR + map + AR give users multiple ways to orient and move",
          "Clear arrival feedback closes the loop with confidence",
        ],
        media: ["/arrow/arrived.jpg", "/arrow/ar-escalator.png"],
        tags: ["Spatial UX", "Wayfinding", "AR product design"],
      },
    ],
  },

  ekartham: {
    eyebrow: "Live Website",
    headline: "Ekartham Academy – Commerce Coaching Website",
    summary:
      "A live academy website I designed and developed for Ekartham Commerce Academy in PCMC, Pune—helping students discover CA & commerce courses, trust the faculty, and enquire with clarity.",
    role: "UI/UX Designer & Developer",
    duration: "Live project",
    tools: "Figma · React · Tailwind",
    accent: "#1e3a8a",
    liveUrl: "https://ekarthamacademy.in/",
    heroMedia: ["/ekartham/og-preview.png"],
    stats: [
      { value: "Live", label: "ekarthamacademy.in" },
      { value: "2 fonts", label: "Playfair + Inter" },
      { value: "Navy", label: "Brand system" },
    ],
    sections: [
      {
        id: "overview",
        label: "01",
        title: "Overview",
        body: "Ekartham Commerce Academy needed a professional digital presence for CA Foundation, CA Intermediate, and 11th–12th Commerce coaching in Pimpri-Chinchwad. I designed and built the live site end-to-end—brand expression, information architecture, UI, and development—so students can understand offerings quickly and reach out with confidence.",
        media: ["/ekartham/og-preview.png"],
        tags: ["Live site", "Education", "End-to-end"],
      },
      {
        id: "problem",
        label: "02",
        title: "The Problem",
        body: "Prospective students and parents couldn’t easily judge credibility or find the right course. Fragmented information and weak CTAs meant fewer quality enquiries.",
        bullets: [
          "Unclear course paths for CA Foundation, Intermediate, and board commerce",
          "Low trust signals—faculty, results, and campus life weren’t visible enough",
          "Enquiry friction—contact felt buried instead of guided",
          "No coherent visual system for an education brand in a competitive PCMC market",
        ],
        media: ["/ekartham/og-preview.png"],
      },
      {
        id: "goals",
        label: "03",
        title: "Goals",
        bullets: [
          "Make course discovery scannable in under a minute",
          "Build trust through faculty, success stats, and student proof",
          "Drive enquiries with clear, repeated CTAs",
          "Ship a responsive, maintainable site with a distinct navy brand",
        ],
        media: ["/ekartham/og-preview.png"],
      },
      {
        id: "timeline",
        label: "04",
        title: "Project Timeline",
        body: "A focused build from positioning through launch—prioritizing clarity, trust, and conversion.",
        timeline: [
          {
            phase: "Discovery",
            days: "3 days",
            detail: "Stakeholder goals, competitor scan, and student enquiry pain points",
          },
          {
            phase: "IA & Wireframes",
            days: "4 days",
            detail: "Home → Courses → Faculty → Proof → Contact structure",
          },
          {
            phase: "Visual system",
            days: "5 days",
            detail: "Navy brand, Playfair + Inter type, component patterns",
          },
          {
            phase: "Build",
            days: "8 days",
            detail: "React + Tailwind implementation, forms, and responsive polish",
          },
          {
            phase: "Launch",
            days: "2 days",
            detail: "Content QA, SEO basics, and go-live on ekarthamacademy.in",
          },
        ],
        media: ["/ekartham/og-preview.png"],
      },
      {
        id: "typography",
        label: "05",
        title: "Typography",
        body: "Pulled from the live site: Playfair Display for display headlines (academic, trustworthy) and Inter for UI and body (clear, modern, readable on mobile).",
        typeScale: [
          {
            name: "Display",
            size: "40 / 48",
            weight: "700",
            lineHeight: "1.15",
            sample: "Shaping Future Commerce Leaders",
            usage: "Hero headlines · Playfair Display",
            fontFamily: '"Playfair Display", Georgia, serif',
          },
          {
            name: "H1",
            size: "36 / 40",
            weight: "700",
            lineHeight: "1.2",
            sample: "Premier Commerce Education in PCMC",
            usage: "Page titles · Playfair Display",
            fontFamily: '"Playfair Display", Georgia, serif',
          },
          {
            name: "H2",
            size: "30 / 36",
            weight: "600",
            lineHeight: "1.25",
            sample: "CA Foundation & Intermediate",
            usage: "Section headers · Playfair Display",
            fontFamily: '"Playfair Display", Georgia, serif',
          },
          {
            name: "H3",
            size: "20 / 28",
            weight: "600",
            lineHeight: "1.3",
            sample: "Choose the right course",
            usage: "Card & block titles · Inter",
            fontFamily: "Inter, system-ui, sans-serif",
          },
          {
            name: "Body",
            size: "16 / 24",
            weight: "400",
            lineHeight: "1.5",
            sample:
              "Learn from young, dynamic professionals with real-world experience in finance, accounting, and law.",
            usage: "Default reading text · Inter",
            fontFamily: "Inter, system-ui, sans-serif",
          },
          {
            name: "Body Medium",
            size: "16 / 24",
            weight: "500",
            lineHeight: "1.5",
            sample: "Not sure which course is right for you?",
            usage: "Emphasized body / CTAs · Inter",
            fontFamily: "Inter, system-ui, sans-serif",
          },
          {
            name: "Small",
            size: "14 / 20",
            weight: "400",
            lineHeight: "1.45",
            sample: "Old Mumbai-Pune Highway, Station, Chinchwad, Pune",
            usage: "Supporting copy, lists · Inter",
            fontFamily: "Inter, system-ui, sans-serif",
          },
          {
            name: "Caption",
            size: "12 / 16",
            weight: "500",
            lineHeight: "1.35",
            sample: "4.9/5 Average Faculty Rating",
            usage: "Badges, meta, labels · Inter",
            fontFamily: "Inter, system-ui, sans-serif",
          },
        ],
        tags: ["Playfair Display", "Inter", "Google Fonts"],
      },
      {
        id: "colors",
        label: "06",
        title: "Colors",
        body: "Tokens from the production CSS—navy as the primary brand, soft blue surfaces, ECA green for success/proof, and neutral grays for readable body text.",
        palette: [
          { name: "Navy 900", hex: "#0F172A", role: "Deep text / footer" },
          { name: "Navy 800", hex: "#1E3A8A", role: "Brand headings / links" },
          { name: "Navy 600", hex: "#1D4ED8", role: "Primary buttons / accents" },
          { name: "Navy 500", hex: "#1E40AF", role: "Gradients / hover" },
          { name: "Navy 100", hex: "#E0E7FF", role: "Soft brand fill" },
          { name: "Navy 50", hex: "#F0F4FF", role: "Section wash / hero tint" },
          { name: "Primary", hex: "#00358A", role: "HSL primary token (214 100% 27%)" },
          { name: "ECA Green 600", hex: "#16A34A", role: "Success / proof stats" },
          { name: "ECA Green 500", hex: "#22C55E", role: "Positive highlights" },
          { name: "Gray 600", hex: "#4B5563", role: "Secondary body text" },
          { name: "Gray 50", hex: "#F9FAFB", role: "Muted surfaces" },
          { name: "White", hex: "#FFFFFF", role: "Cards / canvas" },
        ],
        media: ["/ekartham/og-preview.png"],
        tags: ["Navy system", "ECA green", "Light surfaces"],
      },
      {
        id: "grid-space",
        label: "07",
        title: "Layout & Space",
        body: "Tailwind’s 4px base with an 8px rhythm and 0.75rem radius keep sections calm and scannable across marketing blocks.",
        spacing: [
          { token: "space-2", px: "8px", use: "Chip / icon gaps" },
          { token: "space-3", px: "12px", use: "Tight stacks" },
          { token: "space-4", px: "16px", use: "Card padding" },
          { token: "space-5", px: "24px", use: "Block gaps" },
          { token: "space-6", px: "32px", use: "Section padding" },
          { token: "space-8", px: "48px", use: "Major section breaks" },
          { token: "space-10", px: "64px", use: "Hero vertical rhythm" },
          { token: "radius", px: "12px", use: "Cards & buttons (--radius: .75rem)" },
        ],
        grid: [
          { name: "Marketing shell", detail: "Centered content · max ~1200px · responsive side gutters" },
          { name: "Course grid", detail: "1 → 2 → 3 columns for course cards" },
          { name: "Faculty / proof", detail: "Card rows with photo + quote hierarchy" },
          { name: "Enquiry", detail: "Form + contact details side-by-side on desktop" },
        ],
      },
      {
        id: "flows",
        label: "08",
        title: "User Flows",
        body: "A simple path from landing to enquiry—discover the academy, pick a course, trust the proof, then contact.",
        flowSteps: [
          {
            title: "Land & orient",
            detail: "Hero positions ECA as premier commerce coaching in PCMC with a clear value prop.",
          },
          {
            title: "Explore courses",
            detail: "Browse CA Foundation, Intermediate, and board commerce programs.",
          },
          {
            title: "Build trust",
            detail: "Faculty, success rate, testimonials, and campus life reinforce credibility.",
          },
          {
            title: "Enquire",
            detail: "Contact form and CTAs capture name, phone, email, and preferred course.",
          },
        ],
        media: ["/ekartham/og-preview.png"],
        tags: ["Home", "Courses", "Trust", "Enquire"],
      },
      {
        id: "components",
        label: "09",
        title: "UI Patterns",
        body: "Reusable marketing patterns used across the live site—buttons, course cards, proof stats, testimonials, and enquiry forms.",
        components: [
          {
            name: "Buttons",
            variants: ["Primary navy", "Secondary outline", "Ghost link"],
            states: ["Default", "Hover", "Focus"],
          },
          {
            name: "Course cards",
            variants: ["Foundation", "Intermediate", "Board commerce"],
            states: ["Default", "Hover"],
          },
          {
            name: "Stats / proof",
            variants: ["Success rate", "Faculty rating", "Student count"],
            states: ["Default"],
          },
          {
            name: "Testimonials",
            variants: ["Quote card", "Carousel / grid"],
            states: ["Default"],
          },
          {
            name: "Enquiry form",
            variants: ["Name", "Phone", "Email", "Course select"],
            states: ["Default", "Validation", "Success"],
          },
          {
            name: "Navigation",
            variants: ["Top nav", "Mobile menu", "Footer links"],
            states: ["Default", "Active"],
          },
        ],
        media: ["/ekartham/og-preview.png"],
        tags: ["Cards", "Forms", "Nav", "Proof"],
      },
      {
        id: "outcome",
        label: "10",
        title: "Outcome",
        body: "A live, responsive academy website that presents courses clearly, surfaces trust early, and makes enquiry the natural next step—with a navy + Playfair system that feels academic yet modern.",
        bullets: [
          "Live at ekarthamacademy.in for CA & commerce coaching in PCMC",
          "Clear course → trust → enquire journey for students and parents",
          "Production tokens: Navy brand, ECA green proof, Playfair + Inter",
        ],
        media: ["/ekartham/og-preview.png"],
        tags: ["Shipped", "Brand system", "Conversion-focused"],
      },
    ],
  },

  irctc: {
    eyebrow: "Product Redesign",
    headline: "IRCTC – Train Booking Redesign",
    summary:
      "A clearer train booking experience redesigned for both mobile and website—from search to train selection, passengers, payment, and ticket confirmation.",
    role: "UI/UX Designer",
    duration: "Concept redesign",
    tools: "Figma",
    accent: "#2155A3",
    figmaUrl:
      "https://www.figma.com/design/JLWSZ54ozyLU1543tYpbVj/Project-1---IRCTC-website-redesign?node-id=0-1&t=pL04AOINw4ULlxr8-1",
    heroMedia: [
      "/irctc/home.png",
      "/irctc/trains.png",
      "/irctc/passengers.png",
      "/irctc/payment.png",
      "/irctc/ticket.png",
    ],
    stats: [
      { value: "2", label: "Platforms · Mobile + Web" },
      { value: "5", label: "Core booking screens" },
      { value: "1", label: "End-to-end flow" },
    ],
    sections: [
      {
        id: "overview",
        label: "01",
        title: "Overview",
        body: "IRCTC’s booking journey is powerful but often overwhelming. This redesign focuses on clarity, hierarchy, and a confident path from search to a generated ticket—designed once as a shared system for mobile and website so travellers get the same calm experience on either device.",
        media: ["/irctc/home.png", "/irctc/trains.png"],
        tags: ["Mobile + Website", "Booking flow", "IRCTC redesign"],
      },
      {
        id: "problem",
        label: "02",
        title: "The Problem",
        body: "Millions book trains under time pressure. Dense layouts, weak hierarchy, and uneven flows across devices make scanning availability and completing payment harder than they should be.",
        bullets: [
          "Cluttered search and results make train comparison slow",
          "Class availability and fares compete for attention without a clear primary action",
          "Passenger and payment steps feel fragmented and stressful",
          "Mobile and web feel inconsistent—users relearn the flow when switching devices",
        ],
        media: ["/irctc/trains.png"],
      },
      {
        id: "goals",
        label: "03",
        title: "Goals",
        bullets: [
          "Simplify search → results → book → pay → ticket into one readable journey",
          "Make class, availability, and price glanceable before commit",
          "Reduce booking anxiety with clear progress and confirmation states",
          "Ship one design language that works for both mobile and website",
        ],
        media: ["/irctc/home.png"],
      },
      {
        id: "timeline",
        label: "04",
        title: "Project Timeline",
        body: "A structured redesign from research through final UI—keeping mobile and website patterns aligned.",
        timeline: [
          {
            phase: "Discovery",
            days: "4 days",
            detail: "Booking pain points, competitor scans, and mobile vs web behaviour gaps",
          },
          {
            phase: "Flows",
            days: "4 days",
            detail: "End-to-end booking map from search to ticket download",
          },
          {
            phase: "Wireframes",
            days: "5 days",
            detail: "Information hierarchy for results, passengers, and payment",
          },
          {
            phase: "UI Design",
            days: "8 days",
            detail: "High-fidelity mobile screens plus website-ready responsive patterns",
          },
          {
            phase: "Polish",
            days: "4 days",
            detail: "States, availability cues, ticket success, and cross-device consistency",
          },
        ],
        media: ["/irctc/passengers.png"],
      },
      {
        id: "personas",
        label: "05",
        title: "User Personas",
        body: "Research focused on travellers who book under constraints—time, quota, and device switching.",
        personas: [
          {
            name: "Priya Nair",
            age: "28",
            role: "Frequent traveller",
            goal: "Compare trains and classes quickly on her phone before a weekend trip.",
            frustration: "Results feel noisy; availability and fares are hard to scan under time pressure.",
            traits: ["Mobile-first", "Time-poor", "Price sensitive"],
          },
          {
            name: "Ramesh Iyer",
            age: "45",
            role: "Family trip planner",
            goal: "Book for multiple passengers on desktop with clear payment and PNR confirmation.",
            frustration: "Passenger details and payment feel error-prone; switching from phone to laptop resets confidence.",
            traits: ["Desktop preference", "Multi-passenger", "Needs clarity"],
          },
        ],
        media: ["/irctc/home.png"],
      },
      {
        id: "flows",
        label: "06",
        title: "User Flows",
        body: "A simple booking path shared across mobile and website—search, pick a train, add passengers, pay, arrive at a clear ticket.",
        flowSteps: [
          {
            title: "Search trains",
            detail: "Enter from/to, date, and class chips, then search with a clear primary CTA.",
          },
          {
            title: "Compare & select",
            detail: "Scan train cards with timing, class fares, and live availability.",
          },
          {
            title: "Passenger details",
            detail: "Confirm IRCTC ID, boarding point, passengers, and add-ons before pay.",
          },
          {
            title: "Payment",
            detail: "Review fare breakdown and pick a payment option with progress in view.",
          },
          {
            title: "Ticket success",
            detail: "See PNR, coach/berth, and download or share the ticket instantly.",
          },
        ],
        media: [
          "/irctc/home.png",
          "/irctc/trains.png",
          "/irctc/passengers.png",
          "/irctc/payment.png",
          "/irctc/ticket.png",
        ],
        tags: ["Search", "Select", "Passengers", "Pay", "Ticket"],
      },
      {
        id: "final-ui",
        label: "07",
        title: "Final UI",
        body: "High-fidelity screens in a clean blue system—built for glanceability on mobile, with the same components and hierarchy ready for website layouts.",
        finalScreens: [
          { label: "Home / search", src: "/irctc/home.png" },
          { label: "Train results", src: "/irctc/trains.png" },
          { label: "Availability", src: "/irctc/schedule.png" },
          { label: "Passenger details", src: "/irctc/passengers.png" },
          { label: "Payment", src: "/irctc/payment.png" },
          { label: "Ticket booked", src: "/irctc/ticket.png" },
        ],
        media: [
          "/irctc/home.png",
          "/irctc/trains.png",
          "/irctc/schedule.png",
          "/irctc/passengers.png",
          "/irctc/payment.png",
          "/irctc/ticket.png",
        ],
        tags: ["Mobile UI", "Website-ready", "Blue system", "Ticket success"],
      },
      {
        id: "outcome",
        label: "08",
        title: "Outcome",
        body: "A calmer, more scannable booking UI that keeps critical actions visible and reduces cognitive load—available as a cohesive experience for both mobile and website.",
        bullets: [
          "Clear search-to-ticket flow with progress across passenger and payment steps",
          "Availability, class, and fare hierarchy tuned for fast decision-making",
          "One design system for mobile and website so users never relearn the journey",
        ],
        media: ["/irctc/ticket.png", "/irctc/home.png"],
        tags: ["Mobile + Website", "Clarity", "Conversion"],
      },
    ],
  },
};
