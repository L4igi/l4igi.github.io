import React from 'react';
import { Server, Settings, Database, Gamepad2, Terminal, GraduationCap, LayoutGrid, Circle, Triangle, Waves, Plus, Zap, ShoppingCart, CreditCard, Tv, Music, Skull } from 'lucide-react';
import type { Project, Pattern, ConsoleColor, ExperienceItem, LikeItem } from '../types';

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
    // --- WORK PROJECTS ---
    {
        id: 'hr-matching-platform',
        title: 'HR Matching Platform',
        role: { en: 'Software Developer', de: 'Softwareentwickler' },
        year: '2025',
        description: {
            en: 'A complex matching platform for HR tools features dynamic forms, result visualization, and process control.',
            de: 'Eine komplexe Matching-Plattform für HR-Tools mit dynamischen Formularen, Ergebnisvisualisierung und Prozesssteuerung.'
        },
        details: {
            en: 'The app acts as a digital consultant for finding HR systems, allowing users to prioritize over 1,500 criteria. The application features multi-stage matching processes, complex dynamic forms for data collection, and graphical visualization of results. It includes an integrated chat and a sophisticated process control system where individual steps dynamically impact other application areas. Built with a schema-based multi-tenancy architecture to ensure strict data isolation.',
            de: 'Die Anwendung fungiert als digitaler Berater für die Findung von HR-Systemen und ermöglicht die Priorisierung von über 1.500 Kriterien. Die Anwendung bietet mehrstufige Matching-Prozesse, komplexe dynamische Formulare und eine grafische Visualisierung der Ergebnisse. Sie beinhaltet einen integrierten Chat und eine komplexe Prozesssteuerung, bei der Schritte dynamische Auswirkungen auf andere Bereiche haben. Entwickelt mit einer Schema-basierten Multi-Tenancy-Architektur für strikte Datentrennung.'
        },
        tech: ['Kotlin', 'Spring Boot', 'Angular', 'Postgres', 'Keycloak'],
        color: 'bg-blue-400',
        icon: <Server className="w-8 h-8 text-white" />,
        category: 'WORK',
        screenshots: ['bg-blue-100', 'bg-blue-200', 'bg-blue-50'],
        features: ['Multi-Tenancy', 'Complex Logic', 'Graph Viz', 'B2B']
    },
    {
        id: 'toboggan-maintenance',
        title: 'IoT Maintenance App',
        role: { en: 'Software Developer', de: 'Softwareentwickler' },
        year: '2024',
        description: {
            en: 'Digital maintenance ecosystem for summer toboggans. Flutter app connects via Bluetooth for firmware updates and logs.',
            de: 'Digitales Wartungs-Ökosystem für Sommerrodelbahnen. Flutter-App verbindet sich via Bluetooth für Updates und Logs.'
        },
        details: {
            en: 'A comprehensive digital maintenance platform replacing manual SD card workflows. The mobile app (Flutter) communicates via Bluetooth with up to 40 vehicles simultaneously for firmware updates, log syncing, and functional tests. The accompanying React-Admin-based web admin interface allows for maintenance scheduling, centralized data management, and detailed error analysis. The system is built on a robust multi-tenant architecture to serve multiple facility operators globally.',
            de: 'Eine umfassende Wartungsplattform, die manuelle SD-Karten-Workflows ersetzt. Die Mobile App (Flutter) kommuniziert via Bluetooth mit bis zu 40 Fahrzeugen gleichzeitig für Firmware-Updates, Log-Sync und Funktionstests. Das React-Admin-basierte Web-Admin-Interface ermöglicht Wartungsplanung, zentrale Datenverwaltung und detaillierte Fehleranalyse. Das System basiert auf einer robusten Multi-Tenant-Architektur für weltweite Anlagenbetreiber.'
        },
        tech: ['Flutter', 'Bluetooth LE', 'Spring Boot', 'React', 'Azure'],
        color: 'bg-orange-400',
        icon: <Settings className="w-8 h-8 text-white" />,
        category: 'WORK',
        screenshots: ['bg-orange-100', 'bg-orange-200', 'bg-orange-50'],
        features: ['IoT / Bluetooth', 'Offline First', 'Multi-Tenancy', 'Mobile']
    },
    {
        id: 'innodoc',
        title: 'Safety Docu Tool',
        role: { en: 'Software Developer', de: 'Softwareentwickler' },
        year: '2022-2024',
        description: {
            en: 'Micro-frontend web app for documenting safety equipment installation with PDF generation and digital signatures.',
            de: 'Micro-Frontend Web-App zur Dokumentation von Sicherheitsausrüstung mit PDF-Generierung und digitalen Unterschriften.'
        },
        details: {
            en: 'A responsive web application designed for on-site use to document and verify fall protection systems. It features a complex system configurator for over 600 products, ensuring valid installations. Installers can generate legally valid PDF reports with digital signatures directly on site. The project relies on a massive micro-frontend architecture (NX, Angular) to handle complexity, scalability, and independent deployment of feature modules.',
            de: 'Eine responsive Webanwendung für den Einsatz auf der Baustelle zur Dokumentation und Überprüfung von Absturzsicherungen. Sie verfügt über einen komplexen Systemkonfigurator für über 600 Produkte. Installateure können rechtlich gültige PDF-Berichte mit digitaler Unterschrift direkt vor Ort erstellen. Das Projekt basiert auf einer massiven Micro-Frontend-Architektur (NX, Angular) zur Bewältigung von Komplexität und Skalierbarkeit.'
        },
        tech: ['Angular', 'NX-Monorepo', 'Kotlin', 'Spring Boot', 'RabbitMQ', 'JasperReports'],
        color: 'bg-indigo-400',
        icon: <Database className="w-8 h-8 text-white" />,
        category: 'WORK',
        screenshots: ['bg-indigo-100', 'bg-indigo-200', 'bg-indigo-50'],
        features: ['Microservices', 'PDF Generation', 'Configurator', 'Enterprise']
    },
    {
        id: 'sus-payment',
        title: 'Payment Service',
        role: { en: 'Software Developer', de: 'Softwareentwickler' },
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
        icon: <CreditCard className="w-8 h-8 text-white" />,
        category: 'WORK',
        screenshots: ['bg-emerald-100'],
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
        tech: ['React', 'Azure DevOps', 'Cloud', 'Architecture'],
        color: 'bg-cyan-400',
        icon: <ShoppingCart className="w-8 h-8 text-white" />,
        category: 'WORK',
        screenshots: ['bg-cyan-100'],
        features: ['Migration', 'Scalability', 'CI/CD']
    },
    {
        id: 'vtp_info',
        title: 'Energy Dashboard',
        role: { en: 'Software Developer', de: 'Softwareentwickler' },
        year: '2021-2022',
        description: {
            en: 'Central iOS and Web dashboard aggregating real-time power plant data for Austrian Energy Provider.',
            de: 'Zentrales iOS- und Web-Dashboard zur Bündelung von Echtzeit-Kraftwerksdaten für einen österreichischen Energieanbieter.'
        },
        details: {
            en: 'This system serves as the "Single Source of Truth" for power plant operations. The native iOS app provides employees with real-time access to plant status and duty rosters via secure VPN SSO. A dynamic Admin CMS allows non-technical staff to configure maintenance cycles, create surveys, and send push notifications to the workforce.',
            de: 'Dieses System dient als "Single Source of Truth" für den Kraftwerksbetrieb. Die native iOS-App bietet Mitarbeitern über sicheres VPN-SSO Echtzeit-Zugriff auf Anlagenstatus und Dienstpläne. Ein dynamisches Admin-CMS ermöglicht es nicht-technischem Personal, Wartungszyklen zu konfigurieren, Umfragen zu erstellen und Push-Nachrichten zu versenden.'
        },
        tech: ['iOS Swift', 'Spring Boot', 'Svelte', 'SSO'],
        color: 'bg-sky-500',
        icon: <Zap className="w-8 h-8 text-white" />,
        category: 'WORK',
        screenshots: ['bg-sky-100'],
        features: ['Native Mobile', 'Real-time Data', 'CMS']
    },

    // --- PERSONAL PROJECTS ---
    {
        id: 'smash_demo',
        title: 'Platform Fighter',
        role: { en: 'Solo Developer', de: 'Solo Entwickler' },
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
        icon: <Gamepad2 className="w-8 h-8 text-white" />,
        category: 'PERSONAL',
        screenshots: ['bg-rose-100'],
        features: ['Game Physics', 'State Machines', 'Hitboxes']
    },
    {
        id: 'rechenmauer',
        title: 'Rechenmauer',
        role: { en: 'Lead Developer', de: 'Lead Entwickler' },
        year: '2025',
        description: {
            en: 'Mobile learning app digitizing the "number wall" concept with procedural task generation.',
            de: 'Mobile Lern-App, die das "Rechenmauer"-Konzept mit prozeduraler Aufgabengenerierung digitalisiert.'
        },
        details: {
            en: 'A mobile app designed to digitize the "number wall" learning concept for primary school children. The application uses procedural generation to create infinite tasks of varying difficulty. Developed in close collaboration with an aspiring educator to ensure pedagogical value and a child-friendly user interface.',
            de: 'Eine mobile App zur Digitalisierung des Lernkonzepts "Rechenmauer" für Grundschulkinder. Die Anwendung nutzt prozedurale Generierung für unendlich viele Aufgaben verschiedener Schwierigkeitsgrade. Entwickelt in enger Zusammenarbeit mit einer angehenden Pädagogin für pädagogischen Mehrwert und kinderfreundliche Bedienung.'
        },
        tech: ['Godot', 'Mobile Dev', 'GDScript'],
        color: 'bg-green-400',
        icon: <Gamepad2 className="w-8 h-8 text-white" />,
        category: 'PERSONAL',
        screenshots: ['bg-green-100', 'bg-green-200', 'bg-green-50'],
        features: ['EdTech', 'Procedural Gen', 'UI/UX']
    },
    {
        id: 'foxgame',
        title: 'Fox Game',
        role: { en: 'Lead Developer', de: 'Lead Entwickler' },
        year: '2023',
        description: {
            en: 'Interactive 3D autorunner art installation exploring human-nature relationships.',
            de: 'Interaktive 3D-Autorunner Kunstinstallation über Mensch-Natur-Beziehungen.'
        },
        details: {
            en: 'Created for the "Lange Nacht der Museen" art exhibition. This retro-styled 3D autorunner served as an interactive installation, thematizing the complex and often twisted relationship between humanity and nature within a digital context. Modeled and animated in Blender, programmed in Godot.',
            de: 'Erstellt für die "Lange Nacht der Museen". Dieser 3D-Autorunner im Retro-Stil diente als interaktive Installation und thematisierte die komplexe Beziehung zwischen Mensch und Natur im digitalen Kontext. Modelliert und animiert in Blender, programmiert in Godot.'
        },
        tech: ['Godot', 'Blender', '3D'],
        color: 'bg-red-400',
        icon: <Gamepad2 className="w-8 h-8 text-white" />,
        category: 'PERSONAL',
        screenshots: ['bg-red-100', 'bg-red-200', 'bg-red-50'],
        features: ['Art Installation', '3D Modeling', 'Interactive']
    },

    // --- UNI PROJECTS ---
    {
        id: 'endless',
        title: 'Endless Dungeon',
        role: { en: 'Bachelor Thesis', de: 'Bachelorarbeit' },
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
        icon: <Terminal className="w-8 h-8 text-white" />,
        category: 'UNI',
        screenshots: ['bg-purple-100', 'bg-purple-200', 'bg-purple-50'],
        features: ['Research', 'Graph Theory', 'PCG']
    },
    {
        id: 'uni_placeholder',
        title: 'Media Informatics',
        role: { en: 'BSc Degree', de: 'BSc Studium' },
        year: '2016-2021',
        description: {
            en: 'Computer Science degree focused on Multimedia, Signal Processing, and HCI.',
            de: 'Informatikstudium mit Fokus auf Multimedia, Signalverarbeitung und HCI.'
        },
        details: {
            en: 'Completed the full Computer Science curriculum (Algorithms, Data Structures, Software Engineering) with a specialized focus on Media Informatics. Advanced coursework included Signal and Image Processing, Computer Graphics, Gaming Technologies, and Human-Computer Interaction (HCI), bridging theoretical CS with practical multimedia application.',
            de: 'Abschluss des Informatik-Curriculums (Algorithmen, Datenstrukturen, Software Engineering) mit Schwerpunkt Medieninformatik. Fortgeschrittene Kurse umfassten Signal- und Bildverarbeitung, Computergrafik, Gaming-Technologien und Mensch-Computer-Interaktion (HCI), wobei theoretische Informatik mit praktischer Multimedia-Anwendung verknüpft wurde.'
        },
        tech: ['Java', 'Processing', 'HCI'],
        color: 'bg-yellow-400',
        icon: <GraduationCap className="w-8 h-8 text-white" />,
        category: 'UNI',
        placeholder: true,
        screenshots: ['bg-yellow-100'],
        features: ['Signal Processing', 'Graphics', 'Education']
    }
];

// --- LIKES DATA ---
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

export const EXPERIENCE_DATA: ExperienceItem[] = [
    {
        year: '2025',
        title: 'HR Matching Platform',
        role: { en: 'Software Developer', de: 'Softwareentwickler' },
        desc: { en: 'Objectbay. Java/Kotlin Fullstack.', de: 'Objectbay. Java/Kotlin Fullstack.' }
    },
    {
        year: '2024',
        title: 'IoT Maintenance App',
        role: { en: 'IoT & Mobile App Dev', de: 'IoT & Mobile App Dev' },
        desc: { en: 'Objectbay. Bluetooth LE & Flutter.', de: 'Objectbay. Bluetooth LE & Flutter.' }
    },
    {
        year: '2023',
        title: 'Fox Game',
        role: { en: 'Solo Developer', de: 'Solo Entwickler' },
        desc: { en: 'Interactive art exhibition game.', de: 'Interaktives Spiel für Kunstausstellung.' }
    },
    {
        year: '2022, 2023',
        title: 'Safety Docu Tool',
        role: { en: 'Fullstack Arch.', de: 'Fullstack Architekt' },
        desc: { en: 'Objectbay. Micro-frontends.', de: 'Objectbay. Micro-Frontends.' }
    },
    {
        year: '2022',
        title: 'E-Commerce Arch',
        role: { en: 'Software Developer', de: 'Softwareentwickler' },
        desc: { en: 'Objectbay. Migration Strategy.', de: 'Objectbay. Migrationsstrategie.' }
    },
    {
        year: '2021',
        title: 'Energy Dashboard',
        role: { en: 'Software Developer', de: 'Softwareentwickler' },
        desc: { en: 'Objectbay. Industrial Data.', de: 'Objectbay. Industriedaten.' }
    },
    {
        year: '2021',
        title: 'Uni Wien',
        role: { en: 'BSc. Media Informatics', de: 'BSc. Medieninformatik' },
        desc: { en: 'Graduated with focus on HCI.', de: 'Abschluss mit Schwerpunkt HCI.' }
    }
];

export const SKILLS_DATA = [
    { l: 'Kotlin', v: 95 },
    { l: 'Spring Boot', v: 90 },
    { l: 'React/TS', v: 85 },
    { l: 'Godot', v: 80 },
    { l: 'DevOps', v: 75 },
    { l: 'UI/UX', v: 70 }
];