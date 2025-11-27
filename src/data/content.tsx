import React from "react";
import {
  Server,
  Settings,
  Database,
  Gamepad2,
  GraduationCap,
  LayoutGrid,
  Circle,
  Triangle,
  Waves,
  Plus,
  ShoppingCart,
  Tv,
  Music,
  Skull,
  CreditCard,
  Terminal,
  Wrench,
  UtensilsCrossed,
  Swords,
  Cat,
  Bot,
  Twitch,
  Zap,
  Aperture,
  FileImage,
  Box,
} from "lucide-react";
import type {
  Project,
  Pattern,
  ConsoleColor,
  ExperienceItem,
  LikeItem,
  SkillCategory,
} from "../types";

export const PASTEL_PALETTE = [
  { name: "Cotton Pink", value: "#f9a8d4" },
  { name: "Sky Blue", value: "#93c5fd" },
  { name: "Mint Green", value: "#86efac" },
  { name: "Sunshine", value: "#fde047" },
  { name: "Lavender", value: "#d8b4fe" },
  { name: "Peach", value: "#fdba74" },
  { name: "Slate", value: "#94a3b8" },
  { name: "Coral", value: "#fca5a5" },
  { name: "Aqua", value: "#67e8f9" },
  { name: "Lemon", value: "#fef08a" },
  { name: "Periwinkle", value: "#c7d2fe" },
  { name: "Sage", value: "#d9f99d" },
];

export const CONSOLE_VARIANTS: Record<
  ConsoleColor,
  { name: string; base: string; edge: string }
> = {
  white: { name: "Polar White", base: "#f8fafc", edge: "#cbd5e1" },
  black: { name: "Cosmos Black", base: "#1e293b", edge: "#0f172a" },
  indigo: { name: "Midnight Blue", base: "#312e81", edge: "#1e1b4b" },
  pink: { name: "Coral Pink", base: "#fda4af", edge: "#f43f5e" },
};

export const PATTERNS: { id: Pattern; name: string; icon: React.ReactNode }[] =
  [
    { id: "dots", name: "Polka", icon: <Circle size={12} /> },
    { id: "triangles", name: "Mosaic", icon: <Triangle size={12} /> },
    {
      id: "lines",
      name: "Waves",
      icon: <Waves size={12} className="rotate-90" />,
    },
    { id: "checkers", name: "Checker", icon: <LayoutGrid size={12} /> },
    { id: "cross", name: "Cross", icon: <Plus size={12} /> },
    { id: "zigzag", name: "ZigZag", icon: <Waves size={12} /> },
  ];

export const PROJECTS: Project[] = [
  {
    id: "innodoc",
    title: "Safety Docu SaaS",
    role: { en: "Technical Anchor", de: "Technical Anchor" },
    year: "Foundation",
    description: {
      en: "Enterprise SaaS Platform. Designed the core schema-based multi-tenant architecture and engineered a critical high-volume legacy data migration system.",
      de: "Enterprise SaaS-Plattform. Konzeption der zentralen Schema-basierten Multi-Tenant-Architektur und Entwicklung eines kritischen Systems zur Migration massiver Altdatenbestände.",
    },
    details: {
      en: "**The Context:** A complex SaaS solution for safety documentation. The project faced frequent team turnover and shifting requirements, requiring a stable technical anchor.\n\n**The Architecture:** We shaped a distributed microservice system (Spring Boot/Kotlin). Each service communicated via RabbitMQ, enabling asynchronous processing and effective load distribution. Schema-based multi-tenancy was still applied where needed to ensure strict data isolation for enterprise clients.\n\n**The 'Hero' Feature (Legacy Migration):** Towards the end, we faced a massive hurdle: migrating terabytes of legacy data to the new system. I solo-engineered a dedicated microservice for this.\n• It included safety checkpoints to survive multi-hour processes.\n• Handled edge cases in the old data structure.\n\n**Impact:** Validated via a deep integration test suite on production copies, this service ran zero-defect at launch.\n\n**Team Dynamics:** With developers rotating in and out, I became the knowledge hub, ensuring architectural consistency and onboarding new members effectively.",
      de: "**Der Kontext:** Eine komplexe SaaS-Lösung für Sicherheitsdokumentation. Das Projekt war geprägt von häufigen Teamwechseln und sich ändernden Anforderungen, was einen stabilen technischen Anker erforderte.\n\n**Die Architektur:** Wie formten ein verteiltes Microservice-System (Spring Boot/Kotlin). Die Kommunikation über RabbitMQ ermöglichte asynchrone Verarbeitung und effiziente Lastverteilung. Wo strikte Datenisolierung für Enterprise-Kunden nötig war, setzten wir weiterhin auf Schema-basierte Multi-Tenancy.\n\n**Das 'Hero' Feature (Migration):** Kurz vor Abschluss standen wir vor einer massiven Hürde: der Migration von Terabytes an Altdaten. Ich entwickelte im Alleingang einen spezialisierten Microservice hierfür.\n• Implementierung von Checkpoints für fehlertolerante, mehrstündige Prozesse.\n• Abfangen komplexer Edge-Cases der alten Datenstruktur.\n\n**Impact:** Durch eine umfassende Integrations-Teststrategie auf Produktionskopien validiert, lief der Service beim Go-Live fehlerfrei.\n\n**Team-Dynamik:** Trotz hoher Fluktuation fungierte ich als zentraler 'Knowledge Hub', der die architektonische Konsistenz wahrte und neue Mitglieder effizient onboardete.",
    },
    tech: [
      "Kotlin",
      "Spring Boot",
      "Angular",
      "NX",
      "Keycloak",
      "RabbitMQ",
      "PostgreSQL",
      "Azure",
      "JasperReports",
    ],
    color: "bg-indigo-400",
    icon: <Database className="w-8 h-8 text-white" />,
    category: "WORK",
    screenshots: [
      "/projects/inno/inno_1.png",
      "/projects/inno/inno_2.png",
      "/projects/inno/inno_3.png",
    ],
    features: {
      en: [
        "Modular Monolith",
        "Schema Multi-Tenancy",
        "Zero-Defect Migration",
        "Async Reports",
      ],
      de: [
        "Modular Monolith",
        "Schema Multi-Tenancy",
        "Zero-Defect Migration",
        "Asynchrone Reports",
      ],
    },
  },
  {
    id: "hr_matching",
    title: "HR Matching Platform",
    role: { en: "Engineer & Mentor", de: "Engineer & Mentor" },
    year: "Evolution",
    description: {
      en: "Automated HR Vendor Matching. Leveraged a proven modular architecture to digitize manual workflows, focusing on high-quality E2E automation and team mentorship.",
      de: "Automatisches HR-Vendor-Matching. Nutzung einer bewährten modularen Architektur zur Digitalisierung manueller Workflows, mit Fokus auf hochwertige E2E-Automatisierung und Team-Mentoring.",
    },
    details: {
      en: "**The Context:** Following the success of the Safety Docu SaaS, we tackled this Greenfield project to automate the manual matching of customers to HR software vendors.\n\n**The Strategy (Evolution):** To keep complexity low under a tighter budget, we shifted from microservices to a well-structured Modular Monolith (Kotlin, Spring Boot, Nx, Angular). With the architectural foundation already established, we focused on building clear, extendable features:\n• Used a strong integration testing strategy to ensure all components worked reliably together.\n• Integrated AI-assisted workflows to speed up repetitive development tasks.\n• Added Directus as a CMS to give admins full control over the platform’s content.\n\n**The Mentorship:** My role shifted naturally over the project. I supported the team in technical discussions and encouraged the team to question architectural decisions and explore alternatives. This helped us make more informed decisions together.\n\n**The Result:** A stable, extendable platform delivered within a lean budget, and a team that grew noticeably in confidence and technical maturity.",
      de: "**Der Kontext:** Nach dem Erfolg des Safety Docu SaaS starteten wir dieses 'Greenfield'-Projekt, um das manuelle Matching zwischen Kunden und HR-Software-Anbietern zu automatisieren.\n\n**Die Strategie (Evolution):** Um die Komplexität bei straffem Budget gering zu halten, wechselten wir von Microservices zu einem gut strukturierten Modularen Monolithen (Kotlin, Spring Boot, Nx, Angular). Auf dem bestehenden architektonischen Fundament fokussierten wir uns auf klare, erweiterbare Features:\n• Einsatz einer robusten Integrations-Teststrategie für zuverlässiges Zusammenspiel aller Komponenten.\n• Integration von AI-gestützten Workflows zur Beschleunigung repetitiver Aufgaben.\n• Anbindung von Directus als CMS, um Administratoren volle Inhaltskontrolle zu geben.\n\n**Das Mentoring:** Meine Rolle wandelte sich im Projektverlauf. Ich unterstützte das Team in technischen Diskursen und ermutigte das Team dazu, Architekturentscheidungen zu hinterfragen. Dies führte zu fundierteren gemeinsamen Entscheidungen.\n\n**Das Ergebnis:** Eine stabile, skalierbare Plattform im Budgetrahmen – und ein Team, das spürbar an Selbstvertrauen und technischer Reife gewann.",
    },
    tech: [
      "Kotlin",
      "Spring Boot",
      "Angular",
      "NX",
      "Playwright",
      "Directus",
      "Keycloak",
      "Azure",
      "AI Tools",
    ],
    color: "bg-blue-400",
    icon: <Server className="w-8 h-8 text-white" />,
    category: "WORK",
    screenshots: [],
    features: {
      en: [
        "Greenfield Evolution",
        "E2E & Integration Testing",
        "AI Integration",
        "Team Mentorship",
      ],
      de: [
        "Greenfield Evolution",
        "E2E & Integration Testing",
        "AI Integration",
        "Team Mentoring",
      ],
    },
  },

  {
    id: "mocopro",
    title: "IoT Maintenance Ecosystem",
    role: { en: "Hardware Bridge", de: "Hardware Bridge" },
    year: "Hardware",
    description: {
      en: "IoT Hardware Sync. Architected a distributed backend enabling real-time Bluetooth synchronization between mobile apps and custom hardware boards.",
      de: "IoT Hardware Sync. Architektur eines verteilten Backends zur Ermöglichung von Echtzeit-Bluetooth-Synchronisation zwischen Mobile-Apps und Custom-Hardware.",
    },
    details: {
      en: "**The Challenge:** Developing software for custom hardware that was being built in parallel. Debugging was a constant investigation into whether the fault lay in the App, the Backend, or the physical Voltage of the board.\n\n**The Solution:** I architected the secure backend and the BLE (Bluetooth) synchronization logic. We established a workflow to the external hardware vendors to isolate and resolve cross-domain bugs.\n\n**Leadership Moment:** When a new Team Lead was hired mid-project, I took the initiative to 'onboard my own boss.' I facilitated his integration into the company culture and codebase, ensuring he could be effective immediately without friction.",
      de: "**Die Herausforderung:** Software-Entwicklung für Hardware, die parallel erst entstand. Debugging glich oft einer Detektivarbeit: Liegt der Fehler in der App, im Backend oder an der Spannung der Platine?\n\n**Die Lösung:** Wir entwarfen ein Backend zu Datensynchronisation und Verwaltung und die BLE-Synchronisationslogik. Wir definierten einen Arbeitsablauf zu den externen Hardware-Herstellern, um domänenübergreifende Fehler zu isolieren und zu beheben.\n\n**Leadership-Moment:** Als mitten im Projekt ein neuer Team Lead einstieg, übernahm ich proaktiv dessen Onboarding. Ich integrierte ihn in Codebasis und Unternehmenskultur, um einen reibungslosen Start und sofortige Effektivität sicherzustellen.",
    },
    tech: [
      "Flutter",
      "Bluetooth LE",
      "Keycloak",
      "Spring Boot",
      "Azure",
      "IoT",
    ],
    color: "bg-orange-400",
    icon: <Settings className="w-8 h-8 text-white" />,
    category: "WORK",
    screenshots: ["/projects/toboggan/toboggan_2.png"],
    features: {
      en: [
        "Hardware Debugging",
        "Bluetooth LE Sync",
        "Cross-Domain Logic",
        "Leadership",
      ],
      de: [
        "Hardware Debugging",
        "Bluetooth LE Sync",
        "Cross-Domain Logic",
        "Leadership",
      ],
    },
  },
  {
    id: "sus-payment",
    title: "Subscription Microservice",
    role: { en: "Solo Engineer", de: "Solo Engineer" },
    year: "Monetization",
    description: {
      en: "Subscription & Billing Engine. Autonomous microservice handling complex lifecycles and Stripe integration to make an internal tool market-ready.",
      de: "Subscription & Billing Engine. Autonomer Microservice zur Steuerung komplexer Abo-Lebenszyklen und Stripe-Integration, um ein internes Tool zur Marktreife zu führen.",
    },
    details: {
      en: "**The Mission:** We had a internal tool, but no way to sell it. We were tasked with building the engine to monetize it.\n\n**The Build:** We designed a dedicated microservice to decouple billing from the core product. It handles the full lifecycle (Trials → Active → Cancelled) and processes Stripe Webhooks for real-time status updates.\n\n**Impact:** Transformed an internal utility into a commercial SaaS product.",
      de: "**Die Mission:** Wir besaßen ein internes Tool, aber keinen Vertriebsweg. Die Aufgabe war der Bau einer Engine zur Monetarisierung.\n\n**Die Umsetzung:** Wie konzipierten einen dedizierten Microservice, um die Abrechnung vom Hauptprodukt zu entkoppeln. Dieser steuert den gesamten Lebenszyklus (Trial → Active → Cancelled) und verarbeitet Stripe Webhooks für Status-Updates in Echtzeit.\n\n**Impact:** Transformation eines internen Hilfstools in ein kommerzielles SaaS-Produkt.",
    },
    tech: ["Kotlin", "Ktor", "Stripe", "Webhooks", "Microservice"],
    color: "bg-emerald-400",
    icon: <CreditCard className="w-8 h-8 text-white" />,
    category: "WORK",
    screenshots: [],
    features: {
      en: [
        "Stripe Integration",
        "Lifecycle Logic",
        "Microservice",
        "Monetization",
      ],
      de: [
        "Stripe Integration",
        "Lifecycle Logik",
        "Microservice",
        "Monetarisierung",
      ],
    },
  },
  {
    id: "ecommerce_hub",
    title: "E-Commerce Refactoring",
    role: { en: "Consultant Engineer", de: "Consultant Engineer" },
    year: "Diplomacy",
    description: {
      en: "Micro-Frontend Migration. Strategically decomposed a monolithic legacy React application for a major e-commerce client.",
      de: "Micro-Frontend Migration. Strategische Dekomposition eines monolithischen Legacy-React-Systems für einen großen E-Commerce-Klienten.",
    },
    details: {
      en: "**The Reality:** A massive legacy React monolith, zero tests, and a large corporate client with rigid processes.\n\n**The Work:** We broke the monolith into Micro-Frontends to allow parallel development. My daily work involved 'archaeological debugging' (fixing undocumented legacy bugs) and diplomacy—coordinating with the client’s teams to introduce testing standards and modern best practices into a resistant environment.",
      de: "**Die Realität:** Ein massiver React-Monolith ohne Tests bei einem Großkunden mit starren Prozessen.\n\n**Die Arbeit:** Wir zerlegten den Monolithen in Micro-Frontends, um parallele Entwicklung zu ermöglichen. Mein Alltag bestand aus 'archäologischem Debugging' (Behebung undokumentierter Altlasten) und Diplomatie: Die Koordination mit den Teams des Kunden, um Teststandards und Best Practices in einem widerständigen Umfeld zu etablieren.",
    },
    tech: ["React", "Micro-Frontends", "Legacy Code", "Azure DevOps"],
    color: "bg-cyan-400",
    icon: <ShoppingCart className="w-8 h-8 text-white" />,
    category: "WORK",
    screenshots: [],
    features: {
      en: [
        "Micro-Frontends",
        "Legacy Refactoring",
        "Testing Standards",
        "Diplomacy",
      ],
      de: [
        "Micro-Frontends",
        "Legacy Refactoring",
        "Testing Standards",
        "Diplomatie",
      ],
    },
  },
  {
    id: "vtp_info",
    title: "Energy Info App",
    role: { en: "Mobile Developer", de: "Mobile Developer" },
    year: "Native",
    description: {
      en: "Centralized mobile information hub for power plant operations with a dynamic content management system.",
      de: "Zentraler mobiler Informations-Hub für den Kraftwerksbetrieb inklusive dynamischem Content-Management-System.",
    },
    details: {
      en: "**The Mission:** Create a secure and reliable communication channel for power plant operations.\n\n**The Build:** Developed a native iOS application featuring secure VPN-based Single Sign-On (SSO). We also built a custom Svelte-based CMS that empowered operational staff to manage rosters, surveys, and push notifications independently without requiring developer intervention.\n\n**The Foundation:** As my first professional project after university, this served as my boot camp for high-quality software engineering. Working alongside three experienced seniors, I was immersed in agile best practices through dedicated mentorship and pair programming. Seeing my contributions valued from day one shaped the collaborative leadership philosophy I apply today.",
      de: "**Die Mission:** Schaffung eines sicheren und zuverlässigen Kommunikationskanals für den Kraftwerksbetrieb.\n\n**Die Umsetzung:** Entwicklung einer nativen iOS-App mit sicherem VPN-basiertem Single Sign-On (SSO). Zusätzlich bauten wir ein maßgeschneidertes Svelte-CMS. Dies befähigte das operative Personal, Dienstpläne, Umfragen und Push-Nachrichten eigenständig zu verwalten, ohne auf Entwickler angewiesen zu sein.\n\n**Das Fundament:** Als erstes professionelles Projekt nach der Universität war dies eine prägende Schule für High-Quality Engineering. In einem Team mit drei erfahrenen Seniors profitierte ich von intensivem Mentoring, Pair Programming und einer fundierten Einführung in agile Methoden. Die Erfahrung, dass meine Meinung dabei von Tag eins an zählte, formte mein Verständnis von moderner Führung und Zusammenarbeit – ein Standard, den ich heute selbst lebe.",
    },
    tech: ["Swift", "iOS Native", "Spring Boot", "Svelte", "SSO/VPN"],
    color: "bg-sky-500",
    icon: <Zap className="w-8 h-8 text-white" />,
    category: "WORK",
    screenshots: [
      "/projects/energy/energy_1.webp",
      "/projects/energy/energy_2.webp",
      "/projects/energy/energy_3.webp",
      "/projects/energy/energy_4.png",
      "/projects/energy/energy_5.png",
      "/projects/energy/energy_6.png",
    ],
    features: {
      en: ["Native iOS", "Real-time Data", "Custom CMS", "Single Sign-On"],
      de: ["Native iOS", "Echtzeit-Daten", "Custom CMS", "Single Sign-On"],
    },
  },
  {
    id: "rechenmauer",
    title: "EdTech: Rechenmauer",
    role: { en: "Indie Developer", de: "Indie Developer" },
    year: "Education",
    description: {
      en: "Educational tool digitizing the 'number wall' concept to support primary school mathematics.",
      de: "Bildungstool zur Digitalisierung des 'Rechenmauer'-Konzepts für den Mathematikunterricht in der Volksschule.",
    },
    details: {
      en: "**Context:** Converting a manual math teaching method into an app.\n\n**The Collaboration:** I worked closely with a pedagogue to turn an algorithm into a helpful tool for primary schools. Unlike static worksheets, this app uses procedural generation to provide an infinite supply of tasks, adapting to different difficulty levels to support individualized learning.\n\n**Impact:** It is currently being evaluated in real classrooms.",
      de: "**Kontext:** Transformation einer manuellen Lehrmethode in eine App.\n\n**Die Kollaboration:** Enge Zusammenarbeit mit einer Pädagogin, um einen Algorithmus in ein pädagogisch wertvolles Tool zu verwandeln. Im Gegensatz zu statischen Arbeitsblättern nutzt die App prozedurale Generierung für unendliche Aufgaben und passt sich verschiedenen Schwierigkeitsgraden für individuelles Lernen an.\n\n**Impact:** Die App wird aktuell im realen Schulbetrieb evaluiert.",
    },
    tech: ["Godot", "Mobile Dev", "UI/UX", "Pedagogy"],
    color: "bg-green-400",
    icon: <Gamepad2 className="w-8 h-8 text-white" />,
    category: "PERSONAL",
    screenshots: [
      "/projects/mauer/mauer_1.png",
      "/projects/mauer/mauer_2.png",
      "/projects/mauer/mauer_3.png",
    ],
    features: {
      en: ["EdTech", "Procedural Gen", "Mobile UX", "Classroom Test"],
      de: ["EdTech", "Procedural Gen", "Mobile UX", "Klassenzimmer-Test"],
    },
  },
  {
    id: "foxgame",
    title: "Interactive Art",
    role: { en: "Creative Coder", de: "Creative Coder" },
    year: "Atmosphere",
    description: {
      en: "Interactive 3D art installation for 'Lange Nacht der Museen'. Exploring humanity's relationship with nature.",
      de: "Interaktive 3D-Kunstinstallation für die 'Lange Nacht der Museen'. Eine Erkundung der Beziehung zwischen Mensch und Natur.",
    },
    details: {
      en: "**Context:** A collaboration with artists for a museum exhibit.\n\n**Tech:** Godot Engine (3D).\n\n**Insight:** Unlike games where 'fun' is the goal, here the goal was 'Atmosphere.' I optimized the 3D pipeline to create a moody, narrative autorunner accessible to non-gamers. It taught me to design for strict constraints.",
      de: "**Kontext:** Eine Kooperation mit Künstlern für ein Museumsexponat.\n\n**Insight:** Anders als bei Spielen, wo 'Spaß' im Fokus steht, war hier 'Atmosphäre' das Ziel. Ich optimierte die 3D-Pipeline für einen stimmungsvollen, narrativen Autorunner, der auch für Nicht-Gamer zugänglich ist. Dies lehrte mich das Designen unter strikten Rahmenbedingungen.",
    },
    tech: ["Godot", "3D Graphics", "Performance"],
    color: "bg-red-400",
    icon: <Tv className="w-8 h-8 text-white" />,
    category: "PERSONAL",
    screenshots: [
      "/projects/fox/fox-1.png",
      "/projects/fox/fox-2.png",
      "/projects/fox/fox-3.png",
    ],
    features: {
      en: ["Atmosphere", "3D Optimization", "Interactive Art", "Accessibility"],
      de: [
        "Atmosphäre",
        "3D Optimierung",
        "Interactive Art",
        "Barrierefreiheit",
      ],
    },
  },
  {
    id: "smash_demo",
    title: "Platform Fighter",
    role: { en: "Solo Developer", de: "Solo Developer" },
    year: "Passion",
    description: {
      en: "Technical prototype recreating the physics-based combat mechanics of the platform fighter genre.",
      de: "Technischer Prototyp zur Nachbildung der physikbasierten Kampfmechaniken des Platform-Fighter-Genres.",
    },
    details: {
      en: "**Context:** A 'Lockdown Project' to keep my skills sharp between Uni and Work.\n\n**Tech:** Custom Physics Engine, State Machines.\n\n**Insight:** I reverse-engineered the mechanics of Smash Bros. Implementing deterministic state machines and custom collision physics gave me a profound respect for the math behind 'game feel.'",
      de: "**Kontext:** Ein 'Lockdown-Projekt', um meine Skills im Übergang von Uni zum Job zu schärfen.\n\n**Insight:** Ich habe die Mechaniken von Smash Bros per Reverse-Engineering analysiert. Die Implementierung deterministischer State Machines und eigener Kollisionsphysik lehrte mich viel über die Mathematik hinter gutem 'Game Feel'.",
    },
    tech: ["Godot", "Vector Math", "State Machines"],
    color: "bg-rose-500",
    icon: <Swords className="w-8 h-8 text-white" />,
    category: "PERSONAL",
    screenshots: [
      "/projects/smash/combat_showcase1.mp4",
      "/projects/smash/resultscreen.mp4",
    ],
    features: {
      en: ["Deterministic State", "Custom Physics", "Game Feel", "Hitboxes"],
      de: ["Deterministisch", "Custom Physics", "Game Feel", "Hitboxes"],
    },
  },

  {
    id: "endless",
    title: "MSc Thesis: PCG",
    role: { en: "Bachelor Thesis", de: "Bachelorarbeit" },
    year: "Research",
    description: {
      en: "Academic research on dynamic difficulty adjustment in Procedural Content Generation.",
      de: "Akademische Forschung zur dynamischen Schwierigkeitsanpassung in der prozeduralen Content-Generierung (PCG).",
    },
    details: {
      en: "**The Research:** Developed a novel online algorithm for dungeon generation as part of my thesis.\n\n**The Mechanics:** The system analyzes player performance in real-time to adapt level complexity. Crucially, I used Graph Theory to mathematically guarantee that every generated level—regardless of difficulty—remains fully connected and solvable.",
      de: "**Die Forschung:** Entwicklung eines neuartigen Online-Algorithmus zur Dungeon-Generierung im Rahmen meiner Bachelorarbeit.\n\n**Die Mechanik:** Das System analysiert die Spielerleistung in Echtzeit und passt die Levelkomplexität an. Mittels Graphentheorie konnte ich mathematisch garantieren, dass jedes generierte Level – unabhängig vom Schwierigkeitsgrad – vollständig verbunden und lösbar bleibt.",
    },
    tech: ["Godot", "Algorithms", "PCG", "Graph Theory"],
    color: "bg-purple-400",
    icon: <Terminal className="w-8 h-8 text-white" />,
    category: "UNI",
    screenshots: [
      "/projects/endless/combat.mp4",
      "/projects/endless/enemy_variety.mp4",
      "/projects/endless/room_generation.mp4",
    ],
    features: {
      en: [
        "Graph Theory",
        "PCG Algorithms",
        "Real-time Adaptation",
        "Research",
      ],
      de: [
        "Graphentheorie",
        "PCG Algorithmen",
        "Echtzeit-Anpassung",
        "Forschung",
      ],
    },
  },
  {
    id: "raytracer",
    title: "C++ Ray Tracer",
    role: { en: "Deep Tech", de: "Deep Tech" },
    year: "Graphics",
    description: {
      en: "A rendering engine built from scratch in C++, featuring texture mapping and Phong illumination.",
      de: "Eine von Grund auf in C++ entwickelte Rendering-Engine mit Textur-Mapping und Phong-Beleuchtung.",
    },
    details: {
      en: "**The Challenge:** Implement a functional Ray Tracer without using any external graphics libraries.\n\n**The Implementation:** Built the math core from scratch. Key features include the calculation of Phong Illumination (ambient, diffuse, specular), shadow casting for multiple objects, and material properties. The system handles complex scenes with spheres, light sources, and texture rendering.",
      de: "**Die Herausforderung:** Implementierung eines funktionalen Ray Tracers ohne externe Grafik-Bibliotheken.\n\n**Die Umsetzung:** Entwicklung des mathematischen Kerns von Grund auf (from scratch). Features umfassen die Berechnung der Phong-Beleuchtung (ambient, diffus, spekular), Schattenwurf für mehrere Objekte und Materialeigenschaften. Das System rendert komplexe Szenen mit Sphären, Lichtquellen und Texturen.",
    },
    tech: ["C++", "Computer Graphics", "Math", "Linear Algebra"],
    color: "bg-pink-500",
    icon: <Aperture className="w-8 h-8 text-white" />,
    category: "UNI",
    screenshots: [
      "/projects/rayTracer/ray_tracer_example1.png",
      "/projects/rayTracer/ray_tracer_example2.png",
      "/projects/rayTracer/ray_tracer_example3.png",
    ],
    features: {
      en: ["No Libraries", "Phong Shading", "Shadow Calculation", "Math Heavy"],
      de: ["Keine Libraries", "Phong Shading", "Schattenwurf", "Mathematik"],
    },
  },
  {
    id: "jpeg_algo",
    title: "JPEG Compression",
    role: { en: "Signal Processing", de: "Signalverarbeitung" },
    year: "Data",
    description: {
      en: "Low-level implementation of the JPEG algorithm using Python and NumPy matrix manipulations.",
      de: "Low-Level-Implementierung des JPEG-Algorithmus unter Verwendung von Python und NumPy-Matrixoperationen.",
    },
    details: {
      en: "**The Concept:** A deep dive into signal processing and image compression.\n\n**The Pipeline:** The project handles the full conversion pipeline: RGB to YCbCr color space transformation, downsampling, and block-based compression using DCT (Discrete Cosine Transform) and Quantization tables.",
      de: "**Das Konzept:** Ein Deep Dive in Signalverarbeitung und Bildkompression.\n\n**Die Pipeline:** Das Projekt deckt die gesamte Pipeline ab: Farbraumtransformation (RGB zu YCbCr), Downsampling und blockbasierte Kompression mittels DCT (Diskrete Kosinustransformation) und Quantisierungstabellen.",
    },
    tech: ["Python", "NumPy", "Signal Processing", "DCT"],
    color: "bg-amber-500",
    icon: <FileImage className="w-8 h-8 text-white" />,
    category: "UNI",
    screenshots: [
      "/projects/jpegComp/640_rgb.png",
      "/projects/jpegComp/640_yCbCr.png",
      "/projects/jpegComp/640pcomp.png",
    ],
    features: {
      en: ["DCT Transform", "Quantization", "Matrix Math", "Compression"],
      de: [
        "DCT Transformation",
        "Quantisierung",
        "Matrix Mathe",
        "Kompression",
      ],
    },
  },
  {
    id: "vulkan_proto",
    title: "Vulkan Physics",
    role: { en: "Engine Developer", de: "Engine Developer" },
    year: "Prototype",
    description: {
      en: "3D Physics prototype built on the Vienna Vulkan Engine with custom collision response.",
      de: "3D-Physik-Prototyp auf Basis der Vienna Vulkan Engine mit eigener Kollisionsreaktion.",
    },
    details: {
      en: "**The Stack:** Built using the Vienna Vulkan Engine (VVE) as a base for the graphics pipeline.\n\n**The Physics:** The core focus was implementing a custom C++ physics system handling collision detection and response. I designed a gameplay mechanic where enemies can only be damaged by ricocheting projectiles, requiring precise vector math.",
      de: "**Der Stack:** Nutzung der Vienna Vulkan Engine (VVE) als Basis für die Grafik-Pipeline.\n\n**Die Physik:** Der Fokus lag auf der Implementierung eines eigenen C++ Physiksystems für Kollisionserkennung und -reaktion. Ich entwarf eine Spielmechanik, bei der Gegner nur durch abprallende Projektile (Ricochets) verwundbar sind, was präzise Vektormathematik erforderte.",
    },
    tech: ["C++", "Vulkan", "Game Physics", "VVE"],
    color: "bg-red-600",
    icon: <Box className="w-8 h-8 text-white" />,
    category: "UNI",
    screenshots: [
      "projects/vee/collision.webm",
      "projects/vee/firstWave.webm",
      "projects/vee/finalwave.webm",
    ],
    features: {
      en: [
        "Collision Detection",
        "Physics Engine",
        "Vulkan API",
        "Enemy Waves",
      ],
      de: [
        "Kollisionserkennung",
        "Physik Engine",
        "Vulkan API",
        "Gegner Wellen",
      ],
    },
  },
  {
    id: "uni_media",
    title: "BSc Computer Science",
    role: { en: "University of Vienna", de: "Universität Wien" },
    year: "Foundations",
    description: {
      en: "Comprehensive Computer Science foundation with specialization in digital media technologies.",
      de: "Umfassende Informatik-Grundausbildung mit Spezialisierung auf digitale Medientechnologien.",
    },
    details: {
      en: "**The Curriculum:** Rigorous academic training combining theoretical computer science (Algorithms, Data Structures) with practical application in Signal Processing and Computer Graphics.\n\n**The Focus:** Mastering the low-level foundations beneath modern high-level tools. While I now work on higher layers of abstraction, this deep dive into the 'mechanics under the hood' permanently shaped my technical intuition and problem-solving approach.",
      de: "**Das Curriculum:** Rigorose akademische Ausbildung, die theoretische Informatik (Algorithmen, Datenstrukturen) mit praktischer Anwendung in Signalverarbeitung und Computergrafik verband.\n\n**Der Fokus:** Das Verständnis der technologischen Fundamente hinter modernen High-Level-Tools. Während ich heute auf höheren Abstraktionsebenen arbeite, schuf dieser Blick 'unter die Haube' ein tiefes technisches Verständnis, das meine tägliche Arbeit und Problemlösungskompetenz nachhaltig prägt.",
    },
    tech: ["C++", "JAVA", "Angular", "Spring Boot", "Multimedia"],
    color: "bg-yellow-400",
    icon: <GraduationCap className="w-8 h-8 text-white" />,
    category: "UNI",
    screenshots: [],
    features: {
      en: ["Algorithms", "Signal Processing", "Computer Graphics", "HCI"],
      de: ["Algorithmen", "Signalverarbeitung", "Computer Graphics", "HCI"],
    },
  },
];

export const LIKES_DATA: LikeItem[] = [
  {
    id: "one_piece",
    title: "One Piece",
    role: { en: "Manga / Anime", de: "Manga / Anime" },
    description: {
      en: "An epic tale of adventure and freedom. The world-building and character depth are unmatched.",
      de: "Eine epische Geschichte über Abenteuer und Freiheit. Das World-Building und die Charaktertiefe sind unübertroffen.",
    },
    color: "bg-red-500",
    icon: <Skull className="w-8 h-8 text-white" />,
  },
  {
    id: "ghibli",
    title: "Studio Ghibli",
    role: { en: "Animation", de: "Animation" },
    description: {
      en: "Films that capture the magic of the mundane and the beauty of nature. A huge visual inspiration.",
      de: "Filme, die die Magie des Alltäglichen und die Schönheit der Natur einfangen. Eine große visuelle Inspiration.",
    },
    color: "bg-teal-500",
    icon: <Tv className="w-8 h-8 text-white" />,
  },
  {
    id: "lofi",
    title: "Gaming Lofi",
    role: { en: "Music", de: "Musik" },
    description: {
      en: "The perfect background soundtrack for coding sessions. Nintendo OSTs and chill beats.",
      de: "Der perfekte Soundtrack für Coding-Sessions. Nintendo OSTs und entspannte Beats.",
    },
    color: "bg-indigo-500",
    icon: <Music className="w-8 h-8 text-white" />,
  },
  {
    id: "northernlion",
    title: "Northernlion",
    role: {
      en: "Streamer / Content Creator",
      de: "Streamer / Content Creator",
    },
    description: {
      en: "A witty and endless source of banter. His quick pop-culture references and rogue-like gameplay are unparalleled.",
      de: "Ein witziger und endloser Quell an Unterhaltung. Seine schnellen Popkultur-Referenzen und Rogue-like-Gameplay sind unvergleichlich.",
    },
    color: "bg-purple-500",
    icon: <Twitch className="w-8 h-8 text-white" />,
  },
  {
    id: "godot",
    title: "Godot",
    role: { en: "Game Engine", de: "Spiel-Engine" },
    description: {
      en: "A lightweight, open-source powerhouse. The node-based system is intuitive and perfect for turning creative concepts into reality.",
      de: "Ein leichtgewichtiges Open-Source-Kraftpaket. Das Node-System ist intuitiv und perfekt, um kreative Konzepte in die Realität umzusetzen.",
    },
    color: "bg-blue-500",
    icon: <Bot className="w-8 h-8 text-white" />,
  },
  {
    id: "cats",
    title: "Cinder & Marcy",
    role: { en: "Companions", de: "Gefährten" },
    description: {
      en: "The chaotic duo that brings warmth to the apartment. They are expert napping supervisors and cute distractions.",
      de: "Das chaotische Duo, das Wärme in die Wohnung bringt. Sie sind Experten im Überwachen von Nickerchen und süße Ablenkungen.",
    },
    color: "bg-orange-400",
    icon: <Cat className="w-8 h-8 text-white" />,
  },
  {
    id: "smash_bros",
    title: "Super Smash Bros. Ultimate",
    role: { en: "Video Game", de: "Videospiel" },
    description: {
      en: "A massive celebration of gaming history packed into a chaotic platform fighter. The sheer amount of content is staggering.",
      de: "Eine riesige Hommage an die Gaming-Geschichte, verpackt in einen chaotischen Platform-Fighter. Der Umfang des Inhalts ist überwältigend.",
    },
    color: "bg-slate-800",
    icon: <Swords className="w-8 h-8 text-white" />,
  },
  {
    id: "nintendo",
    title: "Nintendo",
    role: { en: "Gaming Company", de: "Spieleentwickler" },
    description: {
      en: "Pioneers of play who prioritize pure fun. Their titles define childhood nostalgia while consistently reinventing what games can be.",
      de: "Pioniere des Spielens, die reinen Spaß priorisieren. Ihre Titel definieren Kindheitsnostalgie und erfinden Spiele immer wieder neu.",
    },
    color: "bg-red-600",
    icon: <Gamepad2 className="w-8 h-8 text-white" />,
  },
  {
    id: "jp_cooking",
    title: "Japanese Cooking & Culture",
    role: { en: "Lifestyle", de: "Lebensstil" },
    description: {
      en: "A practice rooted in mindfulness and seasonal ingredients. Exploring these recipes provides a delicious connection to tradition.",
      de: "Eine Praxis verwurzelt in Achtsamkeit und saisonalen Zutaten. Diese Rezepte bieten eine köstliche Verbindung zur Tradition.",
    },
    color: "bg-emerald-600",
    icon: <UtensilsCrossed className="w-8 h-8 text-white" />,
  },
  {
    id: "gmtk",
    title: "Game Maker's Toolkit",
    role: { en: "Educational / YouTube", de: "Bildung / YouTube" },
    description: {
      en: "Essential viewing for understanding game design. Mark Brown's deep dives into mechanics and accessibility are genuinely enlightening.",
      de: "Pflichtprogramm für Game-Design-Verständnis. Mark Browns Deep-Dives in Mechaniken und Barrierefreiheit sind wirklich aufschlussreich.",
    },
    color: "bg-yellow-600",
    icon: <Wrench className="w-8 h-8 text-white" />,
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    year: "2021-Present",
    title: "Fullstack Software Developer",
    role: {
      en: "@Objectbay",
      de: "@Objectbay",
    },
    desc: {
      en: "Agile, Scrum, Architecture, Clean Code, Teamwork, Self Efficacy.",
      de: "Agile, Scrum, Architektur, Clean Code, Teamarbeit, Selbstwirksamkeit.",
    },
  },
  {
    year: "2016-2021",
    title: "Computer Science",
    role: {
      en: "BSc. Media Informatics @Uni Wien",
      de: "BSc. Medieninformatik @Uni Wien",
    },
    desc: {
      en: "Focus: Multimedia, Signal Processing & Computer Graphics.",
      de: "Fokus: Multimedia, Signalverarbeitung & Computer Graphics.",
    },
  },
  {
    year: "2013-2016",
    title: "Psychology & Philosophy",
    role: {
      en: "Studies of Interest @Uni Wien",
      de: "Interessensstudium @Uni Wien",
    },
    desc: {
      en: "Interdisciplinary exploration of human cognition, logic, and linguistics.",
      de: "Interdisziplinäre Auseinandersetzung mit Kognition, Logik und Linguistik.",
    },
  },
  {
    year: "2005-2013",
    title: "BRG Klosterneuburg",
    role: {
      en: "High School (STEM Focus)",
      de: "Gymnasium (Naturwiss.-Math. Schwerpunkt)",
    },
    desc: {
      en: "Focus on mathematics and natural sciences. Foundations for analytical thinking.",
      de: "Naturwissenschaftlich-mathematischer Schwerpunkt. Fundament für analytisches Denken.",
    },
  },
];

// --- SKILLS DATA (CATEGORIZED) ---
export const SKILLS_DATA: SkillCategory[] = [
  {
    id: "PROFICIENT",
    label: { en: "Proficient", de: "Experte" },
    description: {
      en: "Daily drivers. Deep understanding of core concepts.",
      de: "Tägliche Werkzeuge. Tiefes Verständnis der Kernkonzepte.",
    },
    skills: [
      { name: "Kotlin", level: 90 },
      { name: "Java", level: 85 },
      { name: "Spring Boot", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Angular", level: 85 },
      { name: "PostgreSQL", level: 85 },
      { name: "Hibernate", level: 85 },
      { name: "Clean Code", level: 90 },
    ],
  },
  {
    id: "ADVANCED",
    label: { en: "Advanced", de: "Fortgeschritten" },
    description: {
      en: "Production ready. Used in complex enterprise scenarios.",
      de: "Produktionsreif. In komplexen Enterprise-Szenarien eingesetzt.",
    },
    skills: [
      { name: "Azure DevOps", level: 75 },
      { name: "Kubernetes", level: 70 },
      { name: "Keycloak", level: 75 },
      { name: "Agile/Scrum", level: 80 },
      { name: "Docker", level: 75 },
      { name: "Flyway", level: 75 },
    ],
  },
  {
    id: "BASIC",
    label: { en: "Basics", de: "Basiswissen" },
    description: {
      en: "Familiar with concepts, used in smaller projects.",
      de: "Konzepte bekannt, in kleineren Projekten genutzt.",
    },
    skills: [
      { name: "React", level: 60 },
      { name: "Svelte", level: 50 },
      { name: "Flutter", level: 55 },
      { name: "Godot", level: 70 },
    ],
  },
];

export const SOCIAL_LINKS = {
  github: "https://github.com/l4igi",
  linkedin: "https://www.linkedin.com/in/lukas-hoewarth",
  email: "mailto:l.hoewarth@gmail.com",
};

export const CV_LINKS = {
  en: "/profile/cv/CV_Lukas_Hoewarth_EN.pdf",
  de: "/profile/cv/CV_Lukas_Hoewarth_DE.pdf",
};
