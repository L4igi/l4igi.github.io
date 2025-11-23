import React from 'react';
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
    CreditCard, Terminal
} from 'lucide-react';
import type {Project, Pattern, ConsoleColor, ExperienceItem, LikeItem, SkillCategory} from '../types';

export const PASTEL_PALETTE = [
    { name: 'Cotton Pink', value: '#f9a8d4' },
    { name: 'Sky Blue', value: '#93c5fd' },
    { name: 'Mint Green', value: '#86efac' },
    { name: 'Sunshine', value: '#fde047' },
    { name: 'Lavender', value: '#d8b4fe' },
    { name: 'Peach', value: '#fdba74' },
    { name: 'Slate', value: '#94a3b8' },
];

export const CONSOLE_VARIANTS: Record<ConsoleColor, { name: string, base: string, edge: string }> = {
    white: { name: 'Polar White', base: '#f8fafc', edge: '#cbd5e1' },
    black: { name: 'Cosmos Black', base: '#1e293b', edge: '#0f172a' },
    indigo: { name: 'Midnight Blue', base: '#312e81', edge: '#1e1b4b' },
    pink: { name: 'Coral Pink', base: '#fda4af', edge: '#f43f5e' },
};

export const PATTERNS: { id: Pattern, name: string, icon: React.ReactNode }[] = [
    { id: 'dots', name: 'Polka', icon: <Circle size={12} /> },
    { id: 'triangles', name: 'Mosaic', icon: <Triangle size={12} /> },
    { id: 'lines', name: 'Waves', icon: <Waves size={12} className="rotate-90" /> },
    { id: 'checkers', name: 'Checker', icon: <LayoutGrid size={12} /> },
    { id: 'cross', name: 'Cross', icon: <Plus size={12} /> },
    { id: 'zigzag', name: 'ZigZag', icon: <Waves size={12} /> },
];

export const PROJECTS: Project[] = [
    {
        id: 'selecthor',
        title: 'HR Matching Platform',
        role: { en: 'Software Engineer', de: 'Software Engineer' },
        year: '2025',
        description: {
            en: 'A modular monolith for HR tool matching. Features dynamic forms, result visualization, and AI-assisted workflows.',
            de: 'Ein modularer Monolith für HR-Tool-Matching. Bietet dynamische Formulare, Ergebnisvisualisierung und AI-gestützte Workflows.'
        },
        details: {
            en: 'A Greenfield project developed as a Modular Monolith (Kotlin/Spring Boot) to consciously reduce complexity compared to Microservices. The frontend uses Angular & NX with a focus on clean architecture, component libraries, and Signals. I established End-to-End tests using Playwright and integrated AI-assisted workflows (Claude Code) to boost efficiency. The project also involves mentoring junior frontend developers.',
            de: 'Ein Greenfield-Projekt, entwickelt als Modularer Monolith (Kotlin/Spring Boot) zur bewussten Reduktion der Komplexität im Vergleich zu Microservices. Das Frontend nutzt Angular & NX mit Fokus auf Clean Architecture, Komponenten-Bibliotheken und Signals. Ich etablierte End-to-End Tests mit Playwright und integrierte AI-gestützte Workflows (Claude Code) zur Effizienzsteigerung. Zudem beinhaltet das Projekt das Mentoring von Junior-Entwicklern.'
        },
        tech: ['Kotlin', 'Spring Boot', 'Angular', 'NX', 'Playwright', 'Postgres'],
        color: 'bg-blue-400',
        icon: <Server className="w-8 h-8 text-white" />,
        category: 'WORK',
        screenshots: [],
        features: ['Modular Monolith', 'Clean Architecture', 'AI Workflows', 'Mentoring']
    },
    {
        id: 'mocopro',
        title: 'IoT Maintenance App',
        role: { en: 'Software Engineer', de: 'Software Engineer' },
        year: '2024',
        description: {
            en: 'Digital maintenance for summer toboggans. Flutter app connects via Bluetooth; Keycloak handles security.',
            de: 'Digitale Wartung für Sommerrodelbahnen. Flutter-App verbindet via Bluetooth; Keycloak regelt die Sicherheit.'
        },
        details: {
            en: 'Developed backend and security architecture (Keycloak) for a Flutter app that communicates with hardware boards via Bluetooth. The system ensures robust data synchronization and authentication in a distributed IoT environment. The project also involved active onboarding and technical support for a new Team Lead to ensure rapid integration into company processes.',
            de: 'Entwicklung von Backend und Sicherheitsarchitektur (Keycloak) für eine Flutter-App, die via Bluetooth mit Hardware-Platinen kommuniziert. Das System stellt robuste Datensynchronisation und Authentifizierung in einer verteilten IoT-Umgebung sicher. Das Projekt beinhaltete zudem aktives Onboarding und fachliche Unterstützung eines neuen Team-Leads.'
        },
        tech: ['Flutter', 'Bluetooth LE', 'Keycloak', 'Spring Boot', 'IoT'],
        color: 'bg-orange-400',
        icon: <Settings className="w-8 h-8 text-white" />,
        category: 'WORK',
        screenshots: ['/projects/toboggan/toboggan_2.png'],
        features: ['IoT Security', 'Bluetooth Sync', 'Onboarding', 'Data Flow']
    },
    {
        id: 'innodoc',
        title: 'Safety Docu Tool',
        role: { en: 'Fullstack Ownership', de: 'Fullstack Ownership' },
        year: '2022-2024',
        description: {
            en: 'SaaS for safety documentation. Schema-based multi-tenancy, RabbitMQ, and comprehensive CI/CD pipelines.',
            de: 'SaaS für Sicherheitsdokumentation. Schema-basierte Multi-Tenancy, RabbitMQ und umfassende CI/CD-Pipelines.'
        },
        details: {
            en: 'Significant definition and implementation of the tech stack (Kotlin, Spring Boot, Angular) in an agile team. Implemented a schema-based multi-tenancy solution and complex asynchronous processes using RabbitMQ. Built a complete CI/CD pipeline (GitLab, Docker, Azure) including one-click deployments and comprehensive monitoring with Datadog. deepened expertise in Micro-Frontend architectures (NX) and PDF reporting (JasperReports).',
            de: 'Maßgebliche Definition und Umsetzung des Tech-Stacks (Kotlin, Spring Boot, Angular) in einem agilen Team. Implementierung einer Schema-based Multi-Tenancy Lösung und komplexer asynchroner Prozesse mittels RabbitMQ. Aufbau einer vollständigen CI/CD-Pipeline (GitLab, Docker, Azure) inkl. One-Click-Deployments und Monitoring (Datadog). Vertiefung in Micro-Frontend-Architekturen (NX) und PDF-Reporting.'
        },
        tech: ['Angular', 'RabbitMQ', 'Multi-Tenancy', 'CI/CD', 'Azure'],
        color: 'bg-indigo-400',
        icon: <Database className="w-8 h-8 text-white" />,
        category: 'WORK',
        screenshots: ['/projects/inno/inno_1.png', '/projects/inno/inno_2.png', '/projects/inno/inno_3.png', '/projects/inno/inno_4.png', '/projects/inno/inno_5.png'],
        features: ['SaaS Architecture', 'Async Processes', 'DevOps', 'Reporting']
    },
    {
        id: 'sus-payment',
        title: 'Payment Service',
        role: {en: 'Software Developer', de: 'Softwareentwickler'},
        year: '2022',
        description: {
            en: 'Subscription microservice handling automated payment processing via Stripe Webhooks.',
            de: 'Subscription-Microservice zur automatisierten Zahlungsabwicklung via Stripe Webhooks.'
        },
        details: {
            en: 'A dedicated microservice implemented in Kotlin Ktor to handle complex subscription lifecycles. The integration of Stripe via Webhooks enables fully automated transaction processing, subscription renewals, and cancellation flows, ensuring a seamless financial workflow for the platform.',
            de: 'Ein dedizierter Microservice in Kotlin Ktor zur Verwaltung komplexer Subscription-Lebenszyklen. Die Integration von Stripe über Webhooks ermöglicht eine vollautomatische Transaktionsverarbeitung, Verlängerungen und Kündigungsprozesse für einen nahtlosen Finanz-Workflow.'
        },
        tech: ['Kotlin', 'Ktor', 'Stripe', 'Webhooks'],
        color: 'bg-emerald-400',
        icon: <CreditCard className="w-8 h-8 text-white"/>,
        category: 'WORK',
        screenshots: [],
        features: ['FinTech', 'Backend', 'Automation']
    },
    {
        id: 'ecommerce_hub',
        title: 'E-Commerce Arch',
        role: { en: 'Software Developer', de: 'Softwareentwickler' },
        year: '2022',
        description: {
            en: 'Modernization of a large e-commerce landscape by migrating monoliths to Micro-Frontends.',
            de: 'Modernisierung einer E-Commerce-Landschaft durch Migration von Monolithen zu Micro-Frontends.'
        },
        details: {
            en: 'Strategic modernization of a large-scale e-commerce landscape. The primary mission was transitioning legacy monolithic React applications into a modular, scalable Micro-Frontend architecture. This involved extracting domain-specific logic into independent packages and setting up Azure DevOps pipelines for automated delivery.',
            de: 'Strategische Modernisierung einer groß angelegten E-Commerce-Landschaft. Die Hauptaufgabe bestand darin, monolithische React-Anwendungen in eine modulare, skalierbare Micro-Frontend-Architektur zu überführen. Dies beinhaltete das Extrahieren von Logik in unabhängige Pakete und das Aufsetzen von Azure DevOps Pipelines.'
        },
        tech: ['React', 'Svelte', 'Azure DevOps', 'Cloud', 'Architecture'],
        color: 'bg-cyan-400',
        icon: <ShoppingCart className="w-8 h-8 text-white" />,
        category: 'WORK',
        screenshots: ['/projects/energy/energy_1.webp', '/projects/energy/energy_2.webp', '/projects/energy/energy_3.webp', '/projects/energy/energy_4.png', '/projects/energy/energy_5.png', '/projects/energy/energy_6.png'],
        features: ['Native Mobile', 'Real-time Data', 'CMS']
    },
    {
        id: 'rechenmauer',
        title: 'Rechenmauer',
        role: { en: 'Lead Developer', de: 'Lead Entwickler' },
        year: '2025',
        description: {
            en: 'Mobile learning app digitizing the "number wall" concept. Developed with an educator.',
            de: 'Mobile Lern-App, die das "Rechenmauer"-Konzept digitalisiert. Entwickelt mit einer Pädagogin.'
        },
        details: {
            en: 'A mobile learning app that digitizes the "number wall" concept for primary school children. Developed in collaboration with an educator to ensure pedagogical value. Uses procedural generation to create infinite tasks. A personal project to explore mobile development and educational tools.',
            de: 'Eine mobile Lern-App, die das "Rechenmauer"-Konzept für Grundschulkinder digitalisiert. Entwickelt in Zusammenarbeit mit einer Pädagogin zur Sicherstellung des pädagogischen Werts. Nutzt prozedurale Generierung für unendliche Aufgaben. Ein persönliches Projekt zur Erkundung von Mobile Development und Bildungstools.'
        },
        tech: ['Godot', 'Mobile Dev', 'UI/UX', 'Pedagogy'],
        color: 'bg-green-400',
        icon: <Gamepad2 className="w-8 h-8 text-white" />,
        category: 'PERSONAL',
        screenshots: ['/projects/mauer/mauer_1.png', '/projects/mauer/mauer_2.png', '/projects/mauer/mauer_3.png'],
        features: ['EdTech', 'Collaboration', 'Mobile', 'Procedural']
    },
    {
        id: 'foxgame',
        title: 'Fox Game',
        role: { en: 'Lead Developer', de: 'Lead Entwickler' },
        year: '2023',
        description: {
            en: 'Interactive 3D autorunner art installation for "Lange Nacht der Museen".',
            de: 'Interaktive 3D-Autorunner Kunstinstallation für die "Lange Nacht der Museen".'
        },
        details: {
            en: 'Created for the "Lange Nacht der Museen" art exhibition. This retro-styled 3D autorunner served as an interactive installation, exploring the relationship between humanity and nature. It allowed me to experience software development from a new perspective: Performance, UX, and Graphics using the Godot Engine.',
            de: 'Erstellt für die "Lange Nacht der Museen". Dieser 3D-Autorunner im Retro-Stil diente als interaktive Installation zur Erkundung der Beziehung zwischen Mensch und Natur. Es ermöglichte mir, Softwareentwicklung aus einer neuen Perspektive zu erleben: Performance, UX und Grafik mit der Godot Engine.'
        },
        tech: ['Godot', '3D', 'Performance', 'Interactive Art'],
        color: 'bg-red-400',
        icon: <Gamepad2 className="w-8 h-8 text-white" />,
        category: 'PERSONAL',
        screenshots: ['/projects/fox/fox-1.png', '/projects/fox/fox-2.png', '/projects/fox/fox-3.png','/projects/fox/fox-4.png','/projects/fox/fox-5.png' ],
        features: ['Art Installation', '3D Graphics', 'Performance', 'UX']
    },
    {
        id: 'endless',
        title: 'Endless Dungeon',
        role: {en: 'Bachelor Thesis', de: 'Bachelorarbeit'},
        year: '2020',
        description: {
            en: 'Research prototype exploring Procedural Content Generation (PCG) with online algorithms.',
            de: 'Forschungsprototyp zur Untersuchung von Prozeduraler Content-Generierung (PCG) mit Online-Algorithmen.'
        },
        details: {
            en: 'Research prototype developed for my Bachelor\'s thesis on Procedural Content Generation. The core contribution is an online algorithm for dungeon generation that adapts difficulty dynamically while ensuring graph connectivity and accessibility of all level areas at runtime.',
            de: 'Forschungsprototyp für meine Bachelorarbeit über Prozedurale Content-Generierung. Der Kernbeitrag ist ein Online-Algorithmus zur Dungeon-Generierung, der die Schwierigkeit dynamisch anpasst und gleichzeitig die Graphen-Konnektivität und Zugänglichkeit aller Levelbereiche zur Laufzeit sicherstellt.'
        },
        tech: ['Godot', 'Algorithms', 'PCG'],
        color: 'bg-purple-400',
        icon: <Terminal className="w-8 h-8 text-white"/>,
        category: 'UNI',
        screenshots: ['/projects/endless/combat.mp4', '/projects/endless/enemy_variety.mp4', '/projects/endless/room_generation.mp4'],
        features: ['Research', 'Graph Theory', 'PCG']
    },
    {
        id: 'smash_demo',
        title: 'Platform Fighter',
        role: {en: 'Solo Developer', de: 'Solo Entwickler'},
        year: 'Passion Project',
        description: {
            en: 'A platform fighting game inspired by Super Smash Bros, focusing on physics and game feel.',
            de: 'Ein von Super Smash Bros inspiriertes Plattform-Kampfspiel mit Fokus auf Physik und Spielgefühl.'
        },
        details: {
            en: 'A personal passion project started after my Bachelor\'s thesis to dive deeper into game engine mechanics. Built in Godot, it aims to recreate the precise "game feel" of the genre. Key implementations include a robust state machine for character actions, percentage-based knockback physics, and frame-perfect hitbox interactions.',
            de: 'Ein persönliches Herzensprojekt nach der Bachelorarbeit, um tiefer in Game-Engine-Mechaniken einzutauchen. Entwickelt in Godot, zielt es darauf ab, das präzise Spielgefühl des Genres nachzubilden. Kernimplementierungen umfassen eine robuste State Machine für Charakteraktionen, prozentbasierte Rückstoßphysik und frame-genaue Hitbox-Interaktionen.'
        },
        tech: ['Godot', 'GDScript', '2D Physics'],
        color: 'bg-rose-500',
        icon: <Gamepad2 className="w-8 h-8 text-white"/>,
        category: 'PERSONAL',
        screenshots: ['/projects/smash/combat_showcase1.mp4', '/projects/smash/resultscreen.mp4'],
        features: ['Game Physics', 'State Machines', 'Hitboxes']
    },
    {
        id: 'uni_media',
        title: 'Media Informatics',
        role: { en: 'BSc Degree', de: 'BSc Studium' },
        year: '2016-2021',
        description: {
            en: 'BSc in Computer Science with focus on Multimedia, Signal Processing, and HCI.',
            de: 'BSc in Informatik mit Fokus auf Multimedia, Signalverarbeitung und HCI.'
        },
        details: {
            en: 'Bachelor studies at the University of Vienna with a specialization in Media Informatics. The curriculum covered core Computer Science (Algorithms, Software Engineering) and advanced topics like Signal and Image Processing, Gaming Technologies, and Human-Computer Interaction (HCI). This laid the foundation for my interest in bridging technical backend logic with visual/interactive frontend experiences.',
            de: 'Bachelorstudium an der Universität Wien mit Vertiefung in Medieninformatik. Das Studium umfasste Kerninformatik (Algorithmen, Software Engineering) sowie fortgeschrittene Themen wie Signal- und Bildverarbeitung, Gaming-Technologien und Mensch-Computer-Interaktion (HCI). Dies legte den Grundstein für mein Interesse an der Verbindung von technischer Backend-Logik mit visuellen/interaktiven Frontend-Erlebnissen.'
        },
        tech: ['C++', 'JAVA', 'Angular', 'Spring Boot', 'Multimedia'],
        color: 'bg-yellow-400',
        icon: <GraduationCap className="w-8 h-8 text-white" />,
        category: 'UNI',
        screenshots: [],
        features: ['Education', 'Multimedia', 'Algorithms', 'Software Patterns', 'Computer Graphics', 'Signal Processing']
    }
];

export const LIKES_DATA: LikeItem[] = [
    {
        id: 'one_piece',
        title: 'One Piece',
        role: { en: 'Manga / Anime', de: 'Manga / Anime' },
        description: {
            en: 'An epic tale of adventure and freedom. The world-building and character depth are unmatched.',
            de: 'Eine epische Geschichte über Abenteuer und Freiheit. Das World-Building und die Charaktertiefe sind unübertroffen.'
        },
        color: 'bg-red-500',
        icon: <Skull className="w-8 h-8 text-white" />
    },
    {
        id: 'ghibli',
        title: 'Studio Ghibli',
        role: { en: 'Animation', de: 'Animation' },
        description: {
            en: 'Films that capture the magic of the mundane and the beauty of nature. A huge visual inspiration.',
            de: 'Filme, die die Magie des Alltäglichen und die Schönheit der Natur einfangen. Eine große visuelle Inspiration.'
        },
        color: 'bg-teal-500',
        icon: <Tv className="w-8 h-8 text-white" />
    },
    {
        id: 'lofi',
        title: 'Gaming Lofi',
        role: { en: 'Music', de: 'Musik' },
        description: {
            en: 'The perfect background soundtrack for coding sessions. Nintendo OSTs and chill beats.',
            de: 'Der perfekte Soundtrack für Coding-Sessions. Nintendo OSTs und entspannte Beats.'
        },
        color: 'bg-indigo-500',
        icon: <Music className="w-8 h-8 text-white" />
    }
];

// --- EXPERIENCE DATA ---
export const EXPERIENCE_DATA: ExperienceItem[] = [
    {
        year: '2025',
        title: 'Objectbay',
        role: { en: 'Software Engineer', de: 'Software Engineer' },
        desc: { en: 'Modular Monolith (Kotlin/Spring), Angular, NX, Playwright. AI-Workflows.', de: 'Modularer Monolith (Kotlin/Spring), Angular, NX, Playwright. AI-Workflows.' }
    },
    {
        year: '2024',
        title: 'Objectbay',
        role: { en: 'Software Engineer', de: 'Software Engineer' },
        desc: { en: 'Backend & Security (Keycloak), Flutter integration, Bluetooth LE.', de: 'Backend & Sicherheit (Keycloak), Flutter Integration, Bluetooth LE.' }
    },
    {
        year: '2022',
        title: 'Objectbay',
        role: { en: 'Fullstack Ownership', de: 'Fullstack Ownership' },
        desc: { en: 'Kotlin, Angular, RabbitMQ, Multi-Tenancy, CI/CD (Azure).', de: 'Kotlin, Angular, RabbitMQ, Multi-Tenancy, CI/CD (Azure).' }
    },
    {
        year: '2021',
        title: 'Objectbay',
        role: { en: 'Software Engineer', de: 'Software Engineer' },
        desc: { en: 'Modernization, Micro-Frontends (React), iOS App Dev.', de: 'Modernisierung, Micro-Frontends (React), iOS App Dev.' }
    },
    {
        year: '2016',
        title: 'Uni Wien',
        role: { en: 'BSc. Media Informatics', de: 'BSc. Medieninformatik' },
        desc: { en: 'Focus: Multimedia, Signal Processing & Computer Graphics.', de: 'Fokus: Multimedia, Signalverarbeitung & Computer Graphics.' }
    }
];

// --- SKILLS DATA (CATEGORIZED) ---
export const SKILLS_DATA: SkillCategory[] = [
    {
        id: 'PROFICIENT',
        label: { en: 'Proficient', de: 'Experte' },
        description: { en: 'Daily drivers. Deep understanding of core concepts.', de: 'Tägliche Werkzeuge. Tiefes Verständnis der Kernkonzepte.' },
        skills: [
            { name: 'Kotlin', level: 95 },
            { name: 'Java', level: 95 },
            { name: 'Spring Boot', level: 90 },
            { name: 'TypeScript', level: 90 },
            { name: 'Angular', level: 85 },
            { name: 'PostgreSQL', level: 85 },
            { name: 'Hibernate', level: 85 },
            { name: 'Clean Code', level: 90 },
        ]
    },
    {
        id: 'ADVANCED',
        label: { en: 'Advanced', de: 'Fortgeschritten' },
        description: { en: 'Production ready. Used in complex enterprise scenarios.', de: 'Produktionsreif. In komplexen Enterprise-Szenarien eingesetzt.' },
        skills: [
            { name: 'Azure DevOps', level: 75 },
            { name: 'Kubernetes', level: 70 },
            { name: 'Keycloak', level: 75 },
            { name: 'Agile/Scrum', level: 80 },
            { name: 'Docker', level: 75 },
            { name: 'Flyway', level: 75 },
        ]
    },
    {
        id: 'BASIC',
        label: { en: 'Basics', de: 'Basiswissen' },
        description: { en: 'Familiar with concepts, used in smaller projects.', de: 'Konzepte bekannt, in kleineren Projekten genutzt.' },
        skills: [
            { name: 'React', level: 60 },
            { name: 'Svelte', level: 50 },
            { name: 'Flutter', level: 55 },
            { name: 'Godot', level: 70 },
        ]
    }
];