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
        id: 'selecthor',
        title: 'HR Matching Platform',
        role: { en: 'Software Developer', de: 'Softwareentwickler' },
        year: '2025',
        description: {
            en: 'A complex matching platform for HR tools featuring dynamic forms and result visualization.',
            de: 'Eine komplexe Matching-Plattform für HR-Tools mit dynamischen Formularen und Ergebnisvisualisierung.'
        },
        details: {
            en: 'A complex matching platform for HR tools developed for a major consultancy. The application features multi-stage matching processes, dynamic forms for data collection, and graphical visualization of results. It includes an integrated chat for direct communication and a complex process control system where individual steps dynamically impact other application areas.',
            de: 'Eine komplexe Matching-Plattform für HR-Tools, entwickelt für eine große Beratungsfirma. Die Anwendung bietet mehrstufige Matching-Prozesse, dynamische Formulare zur Datenerfassung und eine grafische Visualisierung der Ergebnisse. Sie beinhaltet einen integrierten Chat für direkte Kommunikation und eine komplexe Prozesssteuerung, bei der einzelne Schritte dynamische Auswirkungen auf andere Bereiche der Anwendung haben.'
        },
        tech: ['Kotlin', 'Spring Boot', 'Angular', 'Postgres', 'Docker'],
        color: 'bg-blue-400',
        icon: <Server className="w-8 h-8 text-white" />,
        category: 'WORK',
        screenshots: ['bg-blue-100', 'bg-blue-200', 'bg-blue-50'],
        features: ['B2B', 'Complex Logic']
    },
    {
        id: 'mocopro',
        title: 'IoT Maintenance App',
        role: { en: 'Software Developer', de: 'Softwareentwickler' },
        year: '2024',
        description: {
            en: 'Digital maintenance platform for alpine leisure facilities using Bluetooth Low Energy.',
            de: 'Digitale Wartungsplattform für alpine Freizeitanlagen mittels Bluetooth Low Energy.'
        },
        details: {
            en: 'A digital maintenance platform for summer toboggans. The project includes a mobile app (Flutter) that connects via Bluetooth to hardware for precise data logging, firmware updates, and functional tests. It is complemented by a powerful web admin interface for scheduling maintenance, managing data, and viewing detailed error logs.',
            de: 'Eine digitale Wartungsplattform für Sommerrodelbahnen. Das Projekt umfasst eine mobile App (Flutter), die sich via Bluetooth mit der Hardware verbindet, um präzise Daten zu erfassen, Firmware-Updates durchzuführen und Funktionstests zu machen. Ergänzt wird dies durch eine leistungsstarke Web-Admin-Oberfläche zur Planung von Wartungsarbeiten, Datenverwaltung und Einsicht in detaillierte Fehlerprotokolle.'
        },
        tech: ['Spring Boot', 'Kotlin', 'Flutter', 'React', 'Bluetooth'],
        color: 'bg-orange-400',
        icon: <Settings className="w-8 h-8 text-white" />,
        category: 'WORK',
        screenshots: ['bg-orange-100', 'bg-orange-200', 'bg-orange-50'],
        features: ['IoT', 'Mobile', 'Offline First']
    },
    {
        id: 'innodoc',
        title: 'Safety Docu Tool',
        role: { en: 'Software Developer', de: 'Softwareentwickler' },
        year: '2022-2024',
        description: {
            en: 'Documentation tool for safety equipment installation with a micro-frontend architecture.',
            de: 'Dokumentationstool für die Installation von Sicherheitsausrüstung mit Micro-Frontend-Architektur.'
        },
        details: {
            en: 'Development of a documentation tool to record and verify installed fall protection systems. Built on a massive micro-frontend architecture to handle complex reporting, validation logic, and large-scale data management across distributed teams.',
            de: 'Entwicklung eines Dokumentationstools zur Erfassung und Überprüfung montierter Absturzsicherungen. Basiert auf einer massiven Micro-Frontend-Architektur, um komplexes Reporting, Validierungslogik und groß angelegtes Datenmanagement über verteilte Teams hinweg zu bewältigen.'
        },
        tech: ['Kotlin', 'Spring Boot', 'Angular', 'Azure'],
        color: 'bg-indigo-400',
        icon: <Database className="w-8 h-8 text-white" />,
        category: 'WORK',
        screenshots: ['bg-indigo-100', 'bg-indigo-200', 'bg-indigo-50'],
        features: ['Microservices', 'Enterprise']
    },
    {
        id: 'skravel',
        title: 'Payment Service',
        role: { en: 'Software Developer', de: 'Softwareentwickler' },
        year: '2022',
        description: {
            en: 'Subscription microservice handling automated payment processing via Stripe Webhooks.',
            de: 'Subscription-Microservice zur automatisierten Zahlungsabwicklung via Stripe Webhooks.'
        },
        details: {
            en: 'A microservice implemented in Kotlin Ktor to handle subscription payments. The integration of Stripe via Webhooks enables automated transaction processing and customer subscription management, ensuring a seamless financial workflow.',
            de: 'Ein in Kotlin Ktor implementierter Microservice zur Abwicklung von Abonnement-Zahlungen. Die Integration von Stripe über Webhooks ermöglicht eine automatisierte Verarbeitung von Transaktionen und die Verwaltung von Kunden-Abonnements für einen nahtlosen Finanz-Workflow.'
        },
        tech: ['Kotlin', 'Ktor', 'Stripe'],
        color: 'bg-emerald-400',
        icon: <CreditCard className="w-8 h-8 text-white" />,
        category: 'WORK',
        screenshots: ['bg-emerald-100'],
        features: ['FinTech', 'Backend']
    },
    {
        id: 'ecommerce_hub',
        title: 'E-Commerce Arch',
        role: { en: 'Software Developer', de: 'Softwareentwickler' },
        year: '2022',
        description: {
            en: 'Migration of monolithic React applications into a scalable Micro-Frontend architecture.',
            de: 'Migration monolithischer React-Anwendungen in eine skalierbare Micro-Frontend-Architektur.'
        },
        details: {
            en: 'Modernization of a large e-commerce landscape. The primary task was transitioning legacy React applications into a new, modular software architecture. This involved extracting individual applications as Micro-Frontends from a monolith to improve scalability and maintainability.',
            de: 'Modernisierung einer großen E-Commerce-Landschaft. Die Hauptaufgabe bestand darin, bestehende React-Anwendungen in eine neue, modulare Softwarearchitektur zu überführen. Dies beinhaltete das Extrahieren einzelner Anwendungen als Micro-Frontends aus einem Monolithen, um Skalierbarkeit und Wartbarkeit zu verbessern.'
        },
        tech: ['React', 'Azure DevOps', 'Cloud'],
        color: 'bg-cyan-400',
        icon: <ShoppingCart className="w-8 h-8 text-white" />,
        category: 'WORK',
        screenshots: ['bg-cyan-100'],
        features: ['Architecture', 'Migration']
    },
    {
        id: 'vtp_info',
        title: 'Energy Dashboard',
        role: { en: 'Software Developer', de: 'Softwareentwickler' },
        year: '2021-2022',
        description: {
            en: 'Central information dashboard aggregating daily operational data for a major energy provider.',
            de: 'Zentrales Info-Dashboard zur Bündelung täglicher Betriebsdaten für einen Energieversorger.'
        },
        details: {
            en: 'An info app designed to centrally display data required for daily operations from diverse sources. The project involved backend development in Java/Spring, a management interface in Svelte/TypeScript, and a native iOS mobile application.',
            de: 'Eine Info-App zur zentralen Darstellung der im Tagesgeschäft benötigten Daten aus diversen Quellen. Das Projekt umfasste Backend-Entwicklung in Java/Spring, eine Management-Oberfläche in Svelte/TypeScript und eine native iOS-Mobilanwendung.'
        },
        tech: ['Spring', 'Java', 'Svelte', 'iOS Swift'],
        color: 'bg-sky-500',
        icon: <Zap className="w-8 h-8 text-white" />,
        category: 'WORK',
        screenshots: ['bg-sky-100'],
        features: ['Fullstack', 'Native Mobile']
    },

    // --- PERSONAL PROJECTS ---
    {
        id: 'smash_demo',
        title: 'Platform Fighter',
        role: { en: 'Solo Developer', de: 'Solo Entwickler' },
        year: 'In Dev',
        description: {
            en: 'A platform fighting game inspired by Super Smash Bros, built with Godot.',
            de: 'Ein von Super Smash Bros inspiriertes Plattform-Kampfspiel, entwickelt mit Godot.'
        },
        details: {
            en: 'A platform fighting game currently in development using the Godot Engine and GDScript. It is inspired by the Super Smash Brothers Series and aims to recreate the basic gameplay mechanics and game loop, focusing on precise physics and responsive controls.',
            de: 'Ein Plattform-Kampfspiel, das sich derzeit in der Entwicklung befindet. Es nutzt die Godot Engine und GDScript. Inspiriert von der Super Smash Bros.-Reihe, zielt es darauf ab, die grundlegenden Gameplay-Mechaniken und den Game-Loop nachzubilden, mit Fokus auf präzise Physik und responsive Steuerung.'
        },
        tech: ['Godot', 'GDScript', '2D Physics'],
        color: 'bg-rose-500',
        icon: <Gamepad2 className="w-8 h-8 text-white" />,
        category: 'PERSONAL',
        screenshots: ['bg-rose-100'],
        features: ['Game Dev', 'Physics']
    },
    {
        id: 'rechenmauer',
        title: 'Rechenmauer',
        role: { en: 'Lead Developer', de: 'Lead Entwickler' },
        year: '2025',
        description: {
            en: 'Mobile learning app digitizing the "number wall" concept for primary school children.',
            de: 'Mobile Lern-App, die das "Rechenmauer"-Konzept für Grundschulkinder digitalisiert.'
        },
        details: {
            en: 'A mobile learning app that digitizes the "number wall" concept for primary school children. The application procedurally generates tasks of varying difficulty levels and emphasizes a simple, child-friendly interface. Developed in collaboration with an aspiring educator.',
            de: 'Eine mobile Lern-App, die das Lernprinzip der "Rechenmauern" für Grundschulkinder digitalisiert. Die Anwendung erstellt prozedural Aufgaben verschiedener Schwierigkeitsgrade und legt besonderen Wert auf eine einfache, kinderfreundliche Bedienung. Entwickelt in Zusammenarbeit mit einer angehenden Pädagogin.'
        },
        tech: ['Godot', 'GDScript', 'Mobile'],
        color: 'bg-green-400',
        icon: <Gamepad2 className="w-8 h-8 text-white" />,
        category: 'PERSONAL',
        screenshots: ['bg-green-100', 'bg-green-200', 'bg-green-50'],
        features: ['EdTech', 'Procedural']
    },
    {
        id: 'foxgame',
        title: 'Fox Game',
        role: { en: 'Lead Developer', de: 'Lead Entwickler' },
        year: '2023',
        description: {
            en: 'Interactive 3D autorunner for "Lange Nacht der Museen", exploring human-nature relations.',
            de: 'Interaktiver 3D-Autorunner für die "Lange Nacht der Museen" über Mensch und Natur.'
        },
        details: {
            en: 'Developed for a friend\'s exhibition at "Lange Nacht der Museen". This retro-3D autorunner serves as an interactive part of the exhibition, thematizing the complex relationship between humans and nature within the twisted context of a video game world.',
            de: 'Entwickelt für die Ausstellung eines Freundes bei der "Lange Nacht der Museen". Als interaktiver Teil der Ausstellung thematisiert dieser Retro-3D-Autorunner die komplexe Beziehung zwischen Mensch und Natur, dargestellt im verdrehten Kontext einer Videospielwelt.'
        },
        tech: ['Godot', 'Blender', '3D'],
        color: 'bg-red-400',
        icon: <Gamepad2 className="w-8 h-8 text-white" />,
        category: 'PERSONAL',
        screenshots: ['bg-red-100', 'bg-red-200', 'bg-red-50'],
        features: ['3D', 'Interactive Art']
    },

    // --- UNI PROJECTS ---
    {
        id: 'endless',
        title: 'Endless Dungeon',
        role: { en: 'Bachelor Thesis', de: 'Bachelorarbeit' },
        year: '2020',
        description: {
            en: 'Research prototype exploring Procedural Content Generation (PCG) algorithms.',
            de: 'Forschungsprototyp zur Untersuchung von Algorithmen für Prozedurale Generierung (PCG).'
        },
        details: {
            en: 'A research prototype developed for my Bachelor\'s thesis to explore Procedural Content Generation (PCG). The core feature is an online algorithm for dungeon generation that allows for dynamic difficulty adjustment and ensures all level areas remain accessible.',
            de: 'Ein im Rahmen meiner Bachelorarbeit entwickelter Forschungsprototyp zur Untersuchung von Prozeduraler Content-Generierung (PCG). Der Kern ist ein Online-Algorithmus zur Dungeon-Generierung, der eine dynamische Schwierigkeitsanpassung ermöglicht und sicherstellt, dass alle Level-Bereiche stets zugänglich bleiben.'
        },
        tech: ['Godot', 'PCG', 'Algorithms'],
        color: 'bg-purple-400',
        icon: <Terminal className="w-8 h-8 text-white" />,
        category: 'UNI',
        screenshots: ['bg-purple-100', 'bg-purple-200', 'bg-purple-50'],
        features: ['Algorithm', 'Research']
    },
    {
        id: 'uni_placeholder',
        title: 'Media Informatics',
        role: { en: 'University of Vienna', de: 'Universität Wien' },
        year: '2016-2021',
        description: {
            en: 'Bachelor studies with a focus on Media Informatics and HCI.',
            de: 'Bachelorstudium mit Schwerpunkt Medieninformatik und HCI.'
        },
        details: {
            en: 'Bachelor studies with a specialization in Media Informatics. During this time, various prototypes and research papers were created, focusing on Human-Computer Interaction (HCI) and software engineering principles.',
            de: 'Bachelorstudium mit Vertiefung in Medieninformatik. In dieser Zeit entstanden diverse Prototypen und Forschungsarbeiten mit Fokus auf Mensch-Computer-Interaktion (HCI) und Software-Engineering-Prinzipien.'
        },
        tech: ['Java', 'Processing', 'HCI'],
        color: 'bg-yellow-400',
        icon: <GraduationCap className="w-8 h-8 text-white" />,
        category: 'UNI',
        placeholder: true,
        screenshots: ['bg-yellow-100'],
        features: ['Education', 'Degree']
    }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
    {
        year: '2025',
        title: 'HR Matching Platform',
        role: { en: 'Software Developer', de: 'Softwareentwickler' },
        desc: { en: 'Objectbay. HR Tool Matching.', de: 'Objectbay. HR Tool Matching.' }
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
        year: '2022',
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