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
    id: "selecthor",
    title: "HR Matching Platform",
    role: { en: "Software Engineer", de: "Software Engineer" },
    year: "2025",
    description: {
      en: "A modular monolith optimizing HR workflows with dynamic forms and  result visualization.",
      de: "Ein modularer Monolith zur Optimierung von HR-Workflows mit dynamischen Formularen und Visualisierung.",
    },
    details: {
      en: 'Engineered a scalable "Greenfield" solution using a Modular Monolith architecture to balance complexity and maintainability. Key contributions include establishing a robust End-to-End testing strategy with Playwright, integrating AI workflows for efficiency, and mentoring junior developers in modern development and architecture practices.',
      de: 'Entwicklung einer skalierbaren "Greenfield"-Lösung mittels Modular Monolith Architektur zur Balance zwischen Komplexität und Wartbarkeit. Kernbeiträge umfassen die Etablierung einer robusten End-to-End Teststrategie mit Playwright, die Integration von AI-Workflows zur Effizienzsteigerung sowie das Mentoring von Junior-Entwicklern in modernen Entwicklungs- und Architektur praktischen.',
    },
    tech: ["Kotlin", "Spring Boot", "Angular", "NX", "Playwright", "Postgres"],
    color: "bg-blue-400",
    icon: <Server className="w-8 h-8 text-white" />,
    category: "WORK",
    screenshots: [],
    features: [
      "Modular Monolith",
      "Clean Architecture",
      "AI Workflows",
      "Mentoring",
    ],
  },
  {
    id: "mocopro",
    title: "IoT Maintenance App",
    role: { en: "Software Engineer", de: "Software Engineer" },
    year: "2024",
    description: {
      en: "Digital maintenance ecosystem for summer toboggans enabling real-time hardware synchronization.",
      de: "Digitales Wartungs-Ökosystem für Sommerrodelbahnen mit Echtzeit-Hardware-Synchronisation.",
    },
    details: {
      en: "Architected the secure backend infrastructure for a distributed IoT system. The solution facilitates seamless data synchronization between mobile devices and hardware boards via Bluetooth. Played a pivotal role in onboarding a new Team Lead, ensuring smooth knowledge transfer and process continuity.",
      de: "Architektur der sicheren Backend-Infrastruktur für ein verteiltes IoT-System. Die Lösung ermöglicht nahtlose Datensynchronisation zwischen Mobilgeräten und Hardware-Platinen via Bluetooth. Spielte eine Schlüsselrolle beim Onboarding eines neuen Team-Leads, um reibungslosen Wissenstransfer und Prozesskontinuität zu gewährleisten.",
    },
    tech: ["Flutter", "Bluetooth LE", "Keycloak", "Spring Boot", "IoT"],
    color: "bg-orange-400",
    icon: <Settings className="w-8 h-8 text-white" />,
    category: "WORK",
    screenshots: ["/projects/toboggan/toboggan_2.png"],
    features: ["IoT Security", "Bluetooth Sync", "Onboarding", "Data Flow"],
  },
  {
    id: "innodoc",
    title: "Safety Docu Tool",
    role: { en: "Fullstack Ownership", de: "Fullstack Ownership" },
    year: "2022-2024",
    description: {
      en: "Enterprise SaaS for safety documentation featuring schema-based multi-tenancy and automated reporting.",
      de: "Enterprise SaaS für Sicherheitsdokumentation mit Schema-basierter Multi-Tenancy und automatisiertem Reporting.",
    },
    details: {
      en: "Lead the technical definition and implementation of a complex SaaS platform. Designed a schema-based multi-tenancy architecture for data isolation and implemented asynchronous processing pipelines using RabbitMQ. Established a fully automated CI/CD workflow (GitLab/Azure) to enable rapid, reliable deployments.",
      de: "Führende Rolle bei der technischen Definition und Umsetzung einer komplexen SaaS-Plattform. Entwurf einer Schema-basierten Multi-Tenancy-Architektur zur Datenisolierung und Implementierung asynchroner Verarbeitungspipelines mittels RabbitMQ. Etablierung eines vollautomatisierten CI/CD-Workflows (GitLab/Azure) für schnelle und zuverlässige Deployments.",
    },
    tech: [
      "Kotlin",
      "Spring Boot",
      "Angular",
      "NX",
      "RabbitMQ",
      "Multi-Tenancy",
      "CI/CD",
      "Azure",
    ],
    color: "bg-indigo-400",
    icon: <Database className="w-8 h-8 text-white" />,
    category: "WORK",
    screenshots: [
      "/projects/inno/inno_1.png",
      "/projects/inno/inno_2.png",
      "/projects/inno/inno_3.png",
      "/projects/inno/inno_4.png",
      "/projects/inno/inno_5.png",
    ],
    features: ["SaaS Architecture", "Async Processes", "DevOps", "Reporting"],
  },
  {
    id: "sus-payment",
    title: "Payment Service",
    role: { en: "Software Developer", de: "Softwareentwickler" },
    year: "2022",
    description: {
      en: "Autonomous microservice for managing complex subscription lifecycles and automated billing.",
      de: "Autonomer Microservice zur Verwaltung komplexer Subscription-Lebenszyklen und automatisierter Abrechnung.",
    },
    details: {
      en: "Designed and built a dedicated microservice to decouple payment logic from the main monolith. The system handles the entire subscription lifecycle—from trial periods to renewals and cancellations—integrating deeply with Stripe Webhooks for real-time transaction processing.",
      de: "Entwurf und Entwicklung eines dedizierten Microservices zur Entkopplung der Zahlungslogik vom Hauptmonolithen. Das System verwaltet den gesamten Subscription-Lebenszyklus – von Testphasen über Verlängerungen bis hin zu Kündigungen – und integriert Stripe Webhooks für Echtzeit-Transaktionsverarbeitung.",
    },
    tech: ["Kotlin", "Ktor", "Stripe", "Webhooks"],
    color: "bg-emerald-400",
    icon: <CreditCard className="w-8 h-8 text-white" />,
    category: "WORK",
    screenshots: [],
    features: ["FinTech", "Backend", "Automation"],
  },
  {
    id: "ecommerce_hub",
    title: "E-Commerce Arch",
    role: { en: "Software Developer", de: "Softwareentwickler" },
    year: "2022",
    description: {
      en: "Strategic migration of a monolithic legacy system into a scalable Micro-Frontend architecture.",
      de: "Strategische Migration eines monolithischen Legacy-Systems in eine skalierbare Micro-Frontend-Architektur.",
    },
    details: {
      en: "Executed a strategic modernization initiative for a large-scale e-commerce platform. The focus was on decomposing a monolithic React application into independent, deployable Micro-Frontends, improving scalability and enabling parallel development streams across teams.",
      de: "Durchführung einer strategischen Modernisierungsinitiative für eine große E-Commerce-Plattform. Der Fokus lag auf der Zerlegung einer monolithischen React-Anwendung in unabhängige, deploybare Micro-Frontends, um die Skalierbarkeit zu verbessern und parallele Entwicklungsströme über Teams hinweg zu ermöglichen.",
    },
    tech: ["React", "Svelte", "Azure DevOps", "Cloud", "Architecture"],
    color: "bg-cyan-400",
    icon: <ShoppingCart className="w-8 h-8 text-white" />,
    category: "WORK",
    screenshots: [],
    features: ["Micro Frontends", "Legacy Code", "CMS"],
  },
  {
    id: "vtp_info",
    title: "Energy Info App",
    role: { en: "Software Engineer", de: "Software Engineer" },
    year: "2021",
    description: {
      en: "Centralized mobile information hub for power plant operations with a dynamic content management system.",
      de: "Zentraler mobiler Informations-Hub für den Kraftwerksbetrieb mit dynamischem Content-Management-System.",
    },
    details: {
      en: "Developed a native iOS application serving as the primary communication channel for plant operations. Features include a secure VPN-based Single Sign-On (SSO) and a custom Svelte-based CMS that empowers operational staff to manage rosters, surveys, and push notifications independently.",
      de: "Entwicklung einer nativen iOS-Anwendung als primärer Kommunikationskanal für den Kraftwerksbetrieb. Zu den Features gehören ein sicheres VPN-basiertes Single Sign-On (SSO) und ein maßgeschneidertes Svelte-basiertes CMS, das es dem operativen Personal ermöglicht, Dienstpläne, Umfragen und Push-Nachrichten eigenständig zu verwalten.",
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
    features: ["Native Mobile", "Real-time Data", "CMS", "Single Sign-On"],
  },
  {
    id: "rechenmauer",
    title: "Rechenmauer",
    role: { en: "Lead Developer", de: "Lead Entwickler" },
    year: "2025",
    description: {
      en: 'Educational tool digitizing the "number wall" concept to support primary school mathematics.',
      de: 'Bildungstool zur Digitalisierung des "Rechenmauer"-Konzepts zur Unterstützung des Mathematikunterrichts in der Volksschule.',
    },
    details: {
      en: "A collaborative project with an educator to transform a traditional math teaching method into an interactive digital experience. The app uses procedural generation to provide an infinite supply of tasks, adapting to different difficulty levels to support individualized learning.",
      de: "Ein Gemeinschaftsprojekt mit einer Pädagogin, um eine traditionelle Mathematik-Lehrmethode in ein interaktives digitales Erlebnis zu verwandeln. Die App nutzt prozedurale Generierung, um einen unendlichen Vorrat an Aufgaben bereitzustellen und passt sich verschiedenen Schwierigkeitsgraden an, um individuelles Lernen zu fördern.",
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
    features: ["EdTech", "Collaboration", "Mobile", "Procedural"],
  },
  {
    id: "foxgame",
    title: "Fox Game",
    role: { en: "Lead Developer", de: "Lead Entwickler" },
    year: "2023",
    description: {
      en: "Interactive 3D art installation exploring humanity's relationship with nature.",
      de: "Interaktive 3D-Kunstinstallation zur Erkundung der Beziehung zwischen Menschheit und Natur.",
    },
    details: {
      en: 'Designed as an interactive exhibit for "Lange Nacht der Museen". This project goes beyond traditional gaming, using the medium of a retro 3D autorunner to create an atmospheric narrative experience. It served as a deep dive into 3D graphics pipeline optimization and user experience design within the Godot Engine.',
      de: 'Entworfen als interaktives Exponat für die "Lange Nacht der Museen". Dieses Projekt geht über traditionelles Gaming hinaus und nutzt das Medium eines Retro-3D-Autorunners, um ein atmosphärisches narratives Erlebnis zu schaffen. Es diente als Deep-Dive in die Optimierung der 3D-Grafikpipeline und User Experience Design innerhalb der Godot Engine.',
    },
    tech: ["Godot", "3D", "Performance", "Interactive Art"],
    color: "bg-red-400",
    icon: <Gamepad2 className="w-8 h-8 text-white" />,
    category: "PERSONAL",
    screenshots: [
      "/projects/fox/fox-1.png",
      "/projects/fox/fox-2.png",
      "/projects/fox/fox-3.png",
      "/projects/fox/fox-4.png",
      "/projects/fox/fox-5.png",
    ],
    features: ["Art Installation", "3D Graphics", "Performance", "UX"],
  },
  {
    id: "smash_demo",
    title: "Platform Fighter",
    role: { en: "Solo Developer", de: "Solo Entwickler" },
    year: "Passion Project",
    description: {
      en: "Technical prototype recreating the physics-based combat mechanics of the platform fighter genre.",
      de: "Technischer Prototyp zur Nachbildung der physikbasierten Kampfmechaniken des Plattform-Fighter-Genres.",
    },
    details: {
      en: "A passion project focused on the intricacies of game feel and input responsiveness. Implemented a deterministic state machine for character actions and a custom physics engine to replicate the specific knockback and hitbox mechanics characteristic of the genre.",
      de: "Ein Passion-Projekt mit Fokus auf die Feinheiten von Spielgefühl und Eingabereaktionsfähigkeit. Implementierung einer deterministischen State Machine für Charakteraktionen und einer benutzerdefinierten Physik-Engine zur Nachbildung der spezifischen Rückstoß- und Hitbox-Mechaniken des Genres.",
    },
    tech: ["Godot", "GDScript", "2D Physics"],
    color: "bg-rose-500",
    icon: <Gamepad2 className="w-8 h-8 text-white" />,
    category: "PERSONAL",
    screenshots: [
      "/projects/smash/combat_showcase1.mp4",
      "/projects/smash/resultscreen.mp4",
    ],
    features: ["Game Physics", "State Machines", "Hitboxes"],
  },
  {
    id: "uni_media",
    title: "Media Informatics",
    role: { en: "BSc Degree", de: "BSc Studium" },
    year: "2016-2021",
    description: {
      en: "Comprehensive Computer Science foundation with specialization in digital media technologies.",
      de: "Umfassende Informatik-Grundausbildung mit Spezialisierung auf digitale Medientechnologien.",
    },
    details: {
      en: "Rigorous academic training at the University of Vienna. The curriculum combined theoretical computer science (Algorithms, Data Structures) with practical application in Signal Processing and Human-Computer Interaction. This dual focus fostered a deep understanding of both the mathematical underpinnings of software and the user-centric aspects of interface design.",
      de: "Rigorose akademische Ausbildung an der Universität Wien. Das Curriculum verband theoretische Informatik (Algorithmen, Datenstrukturen) mit praktischer Anwendung in Signalverarbeitung und Mensch-Computer-Interaktion. Dieser doppelte Fokus förderte ein tiefes Verständnis sowohl für die mathematischen Grundlagen von Software als auch für die nutzerzentrierten Aspekte des Interface-Designs.",
    },
    tech: ["C++", "JAVA", "Angular", "Spring Boot", "Multimedia"],
    color: "bg-yellow-400",
    icon: <GraduationCap className="w-8 h-8 text-white" />,
    category: "UNI",
    screenshots: [],
    features: [
      "Education",
      "Multimedia",
      "Algorithms",
      "Software Patterns",
      "Computer Graphics",
      "Signal Processing",
    ],
  },
  {
    id: "endless",
    title: "Endless Dungeon",
    role: { en: "Bachelor Thesis", de: "Bachelorarbeit" },
    year: "2020",
    description: {
      en: "Academic research on dynamic difficulty adjustment in Procedural Content Generation.",
      de: "Akademische Forschung zur dynamischen Schwierigkeitsanpassung in der Prozeduralen Content-Generierung.",
    },
    details: {
      en: "Developed as part of my Bachelor's thesis, this prototype implements a novel online algorithm for dungeon generation. The system analyzes player performance in real-time to adapt level complexity while mathematically guaranteeing graph connectivity and solvability.",
      de: "Entwickelt im Rahmen meiner Bachelorarbeit, implementiert dieser Prototyp einen neuartigen Online-Algorithmus zur Dungeon-Generierung. Das System analysiert die Spielerleistung in Echtzeit, um die Levelkomplexität anzupassen, während die Graphenkonnektivität und Lösbarkeit mathematisch garantiert werden.",
    },
    tech: ["Godot", "Algorithms", "PCG"],
    color: "bg-purple-400",
    icon: <Terminal className="w-8 h-8 text-white" />,
    category: "UNI",
    screenshots: [
      "/projects/endless/combat.mp4",
      "/projects/endless/enemy_variety.mp4",
      "/projects/endless/room_generation.mp4",
    ],
    features: ["Research", "Graph Theory", "PCG"],
  },
  {
    id: "raytracer",
    title: "C++ Ray Tracer",
    role: { en: "University Project", de: "Universitätsprojekt" },
    year: "2019",
    description: {
      en: "A rendering engine built from scratch in C++, featuring texture mapping and Phong illumination.",
      de: "Eine von Grund auf in C++ entwickelte Rendering-Engine mit Textur-Mapping und Phong-Beleuchtung.",
    },
    details: {
      en: "Implemented a functional Ray Tracer without external graphics libraries. Key features include the calculation of Phong Illumination (ambient, diffuse, specular), shadow casting for multiple objects, and material properties. The system handles complex scenes with spheres, light sources, and texture rendering.",
      de: "Implementierung eines funktionalen Ray Tracers ohne externe Grafikbibliotheken. Hauptmerkmale sind die Berechnung der Phong-Beleuchtung (ambient, diffus, spekular), Schattenwurf für mehrere Objekte und Materialeigenschaften. Das System verarbeitet komplexe Szenen mit Kugeln, Lichtquellen und Textur-Rendering.",
    },
    tech: ["C++", "Computer Graphics", "Math", "Algorithms"],
    color: "bg-pink-500",
    icon: <Aperture className="w-8 h-8 text-white" />,
    category: "UNI",
    screenshots: [
      "/projects/rayTracer/ray_tracer_example1.png",
      "/projects/rayTracer/ray_tracer_example2.png",
      "/projects/rayTracer/ray_tracer_example3.png",
      "/projects/rayTracer/ray_tracer_example4.png",
    ],
    features: [
      "Phong Shading",
      "Shadows",
      "Texture Mapping",
      "C++ From Scratch",
    ],
  },
  {
    id: "jpeg_algo",
    title: "JPEG Compression",
    role: { en: "University Project", de: "Universitätsprojekt" },
    year: "2020",
    description: {
      en: "Low-level implementation of the JPEG algorithm using Python and NumPy matrix manipulations.",
      de: "Low-Level-Implementierung des JPEG-Algorithmus unter Verwendung von Python und NumPy-Matrixmanipulationen.",
    },
    details: {
      en: "A deep dive into signal processing and image compression. The project handles the full conversion pipeline: RGB to YCbCr color space transformation, downsampling, and block-based compression using Quantization tables. It demonstrates the trade-offs between image quality (640x640 vs 111x222) and file size.",
      de: "Ein Deep Dive in Signalverarbeitung und Bildkompression. Das Projekt behandelt die gesamte Konvertierungs-Pipeline: RGB-zu-YCbCr-Farbraumtransformation, Downsampling und blockbasierte Kompression mittels Quantisierungstabellen. Es demonstriert die Abwägung zwischen Bildqualität und Dateigröße.",
    },
    tech: ["Python", "NumPy", "Signal Processing", "Math"],
    color: "bg-amber-500",
    icon: <FileImage className="w-8 h-8 text-white" />,
    category: "UNI",
    screenshots: [
      "/projects/jpegComp/640_rgb.png",
      "/projects/jpegComp/640_yCbCr.png",
      "/projects/jpegComp/640pcomp.png",
      "/projects/jpegComp/long_comp.png",
    ],
    features: ["DCT", "Quantization", "Matrix Math", "YCbCr Conversion"],
  },
  {
    id: "vulkan_proto",
    title: "Vulkan Engine Prototype",
    role: { en: "University Project", de: "Universitätsprojekt" },
    year: "2021",
    description: {
      en: "3D Physics prototype built on the Vienna Vulkan Engine with custom collision response.",
      de: "3D-Physik-Prototyp auf Basis der Vienna Vulkan Engine mit eigener Kollisionsreaktion.",
    },
    details: {
      en: "Built using the Vienna Vulkan Engine (VVE) as a base for the graphics pipeline. The core focus was implementing a custom C++ physics system handling collision detection and response. The gameplay features a unique mechanic where enemies can only be damaged by ricocheting projectiles, requiring precise vector math and wave management.",
      de: "Entwickelt auf Basis der Vienna Vulkan Engine (VVE) für die Grafik-Pipeline. Der Fokus lag auf der Implementierung eines eigenen C++ Physiksystems für Kollisionserkennung und -reaktion. Das Gameplay bietet eine Mechanik, bei der Gegner nur durch abprallende Projektile getroffen werden können, was präzise Vektormathematik erfordert.",
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
    features: [
      "Collision Detection",
      "Physics Engine",
      "Vulkan API",
      "Enemy Waves",
    ],
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
// --- EXPERIENCE DATA ---
export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    year: "2025",
    title: "HR Matching Platform",
    role: {
      en: "Software Engineer @Objectbay",
      de: "Software Engineer @Objectbay",
    },
    desc: {
      en: "Modular Monolith (Kotlin/Spring), Angular, NX, Playwright. AI-Workflows.",
      de: "Modularer Monolith (Kotlin/Spring), Angular, NX, Playwright. AI-Workflows.",
    },
  },
  {
    year: "2024",
    title: "IoT Maintenance App",
    role: {
      en: "Software Engineer @Objectbay",
      de: "Software Engineer @Objectbay",
    },
    desc: {
      en: "Backend & Security (Keycloak), Flutter integration, Bluetooth LE.",
      de: "Backend & Sicherheit (Keycloak), Flutter Integration, Bluetooth LE.",
    },
  },
  {
    year: "2022",
    title: "Safety Doku Tool",
    role: {
      en: "Software Engineer @Objectbay",
      de: "Software Engineer @Objectbay",
    },
    desc: {
      en: "Kotlin, Angular, RabbitMQ, Multi-Tenancy, CI/CD (Azure).",
      de: "Kotlin, Angular, RabbitMQ, Multi-Tenancy, CI/CD (Azure).",
    },
  },
  {
    year: "2021",
    title: "Energie & E-Commerce",
    role: {
      en: "Software Engineer @Objectbay",
      de: "Software Engineer @Objectbay",
    },
    desc: {
      en: "Modernization, Micro-Frontends (React), iOS App Dev.",
      de: "Modernisierung, Micro-Frontends (React), iOS App Dev.",
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
      { name: "Kotlin", level: 95 },
      { name: "Java", level: 95 },
      { name: "Spring Boot", level: 90 },
      { name: "TypeScript", level: 90 },
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
