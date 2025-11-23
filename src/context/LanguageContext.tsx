import {createContext, type ReactNode, useContext, useState} from 'react';
import type { Language } from '../types';

const TRANSLATIONS = {
    en: {
        'hero.role': 'Fullstack Engineer',
        'hero.open': 'Open Profile',
        'cat.all': 'ALL',
        'cat.work': 'WORK',
        'cat.personal': 'PERSONAL',
        'cat.uni': 'UNI',
        'cat.likes': 'LIKES',
        'btn.details': 'DETAILS',
        'modal.id': 'TRAINER ID',
        'modal.exp': 'ADVENTURE LOG',
        'modal.skills': 'SKILL SET',
        'modal.passport': 'Official Passport',
        'modal.class': 'Class',
        'modal.region': 'Region',
        'modal.loc_name': 'Vienna, Austria',
        'modal.langs': 'Languages',
        'modal.lang_native': 'German (Native)',
        'modal.lang_fluent': 'English (Fluent)',
        'modal.hobbies': 'Hobbies',
        'modal.hobbies_list': 'Game Design, Cooking',
        'modal.hobbies_learning': 'Japanese (Learning)',
        'modal.badges': 'Badges & Certs',
        'modal.quote': 'About Me',
        // UPDATED BIO
        'modal.quote_text': "As a Fullstack Engineer with 4 years of experience, my focus lies within the Kotlin & Spring Boot ecosystem. I view software development as a collaborative process: Sustainable architecture and clean code emerge from shared decisions, mentoring, and a proactive error culture. In my projects, I take responsibility for the entire stack, always pragmatically weighing technical perfection against business value. Privately, I use Game Development (Godot) as a creative contrast to gain new technical perspectives.",
        // UPDATED QUOTE
        'modal.sakurai_quote': '"That feeling of doubt, or wanting to do more, is my engine to move forward and make the next iteration."',
        'modal.exp_title': 'Adventure Log',
        'modal.stats': 'Stats & Skills',
        'modal.likes_title': 'Things I Enjoy',
        'skill.proficient': 'Proficient',
        'skill.advanced': 'Advanced',
        'skill.basic': 'Basics',
        'game.gallery': 'Software Gallery',
        'game.desc': 'Software Description',
        'game.compatible': 'Compatible',
        'game.fav': 'FAVORITE',
        'game.add_fav': 'ADD TO FAVORITES',
        'game.tech': 'Technologies',
        'game.features': 'Key Features',
        'footer.theme': 'THEME',
    },
    de: {
        'hero.role': 'Fullstack Entwickler',
        'hero.open': 'Profil öffnen',
        'cat.all': 'ALLE',
        'cat.work': 'ARBEIT',
        'cat.personal': 'PRIVAT',
        'cat.uni': 'UNI',
        'cat.likes': 'INTERESSEN',
        'btn.details': 'DETAILS',
        'modal.id': 'TRAINER PASS',
        'modal.exp': 'ABENTEUER LOG',
        'modal.skills': 'FÄHIGKEITEN',
        'modal.passport': 'Offizieller Pass',
        'modal.class': 'Klasse',
        'modal.region': 'Region',
        'modal.loc_name': 'Wien, Österreich',
        'modal.langs': 'Sprachen',
        'modal.lang_native': 'Deutsch (Muttersprache)',
        'modal.lang_fluent': 'Englisch (Fließend)',
        'modal.hobbies': 'Hobbys',
        'modal.hobbies_list': 'Game Design, Kochen',
        'modal.hobbies_learning': 'Japanisch (Lernen)',
        'modal.badges': 'Orden & Zertifikate',
        'modal.quote': 'Über Mich',
        // UPDATED BIO
        'modal.quote_text': "Als Fullstack Engineer mit 4 Jahren Erfahrung liegt mein Fokus auf dem Kotlin & Spring Boot Ökosystem. Ich verstehe Softwareentwicklung als kollaborativen Prozess: Nachhaltige Architektur und sauberer Code entstehen durch gemeinsame Entscheidungen, Mentoring und eine proaktive Fehlerkultur. In meinen Projekten übernehme ich Verantwortung für den gesamten Stack und wäge technische Perfektion stets pragmatisch gegen den geschäftlichen Nutzen ab. Privat nutze ich Game Development (Godot) als kreativen Kontrast.",
        // UPDATED QUOTE
        'modal.sakurai_quote': '"That feeling of doubt, or wanting to do more, is my engine to move forward and make the next iteration."',
        'modal.exp_title': 'Abenteuer Logbuch',
        'modal.stats': 'Werte & Skills',
        'modal.likes_title': 'Dinge, die ich mag',
        'skill.proficient': 'Experte',
        'skill.advanced': 'Fortgeschritten',
        'skill.basic': 'Basiswissen',
        'game.gallery': 'Software Galerie',
        'game.desc': 'Software Beschreibung',
        'game.compatible': 'Kompatibel',
        'game.fav': 'FAVORIT',
        'game.add_fav': 'FAVORISIEREN',
        'game.tech': 'Technologien',
        'game.features': 'Features',
        'footer.theme': 'THEME',
    }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: keyof typeof TRANSLATIONS['en']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: keyof typeof TRANSLATIONS['en']) => {
        return TRANSLATIONS[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
    return context;
};