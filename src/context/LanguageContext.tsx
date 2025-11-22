import {createContext, type ReactNode, useContext, useState} from 'react';
import type {Language} from "../types";

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
        'modal.lang_fluent': 'English (C1)',
        'modal.hobbies': 'Hobbies',
        'modal.hobbies_list': 'Game Design, Cooking',
        'modal.hobbies_learning': 'Japanese (Learning)',
        'modal.quote': 'About Me',
        'modal.quote_text': "Recently, I finished my Computer Science Bachelor's Degree with a specification in Media Computer Science at the University of Vienna. For me one of the most fascinating parts of IT is learning to understand the inner workings of technology and software that surrounds us. Software development represents a canvas of endless possibilities, constantly providing new challenges and opportunities. It is never static, there is always something new to create or improve upon. After my degree I took three months off to work on some smaller personal projects. The goal was to create something that, in the end, I am satisfied with. For me Game Development is one of the most fascinating and interesting parts in this field. It brings ideas to life in ways no other medium is able to.",
        'modal.exp_title': 'Adventure Log',
        'modal.stats': 'Stats & Skills',
        'modal.likes_title': 'Things I Enjoy', // New
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
        'modal.lang_fluent': 'Englisch (C1)',
        'modal.hobbies': 'Hobbys',
        'modal.hobbies_list': 'Game Design, Kochen',
        'modal.hobbies_learning': 'Japanisch (Lernen)',
        'modal.quote': 'Über Mich',
        'modal.quote_text': "Kürzlich habe ich mein Bachelorstudium Informatik mit Schwerpunkt Medieninformatik an der Universität Wien abgeschlossen. Für mich ist es einer der faszinierendsten Aspekte der IT, die inneren Abläufe der Technologie und Software, die uns umgibt, zu verstehen. Softwareentwicklung ist wie eine Leinwand voller unendlicher Möglichkeiten, die ständig neue Herausforderungen und Chancen bietet. Sie ist nie statisch; es gibt immer etwas Neues zu erschaffen oder zu verbessern. Nach meinem Abschluss habe ich mir drei Monate Zeit genommen, um an kleineren persönlichen Projekten zu arbeiten. Das Ziel war es, etwas zu schaffen, mit dem ich am Ende zufrieden bin. Für mich ist die Spieleentwicklung einer der faszinierendsten und interessantesten Bereiche in diesem Feld. Sie erweckt Ideen auf eine Weise zum Leben, wie es kein anderes Medium kann.",
        'modal.exp_title': 'Abenteuer Logbuch',
        'modal.stats': 'Werte & Skills',
        'modal.likes_title': 'Dinge, die ich mag', // New
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