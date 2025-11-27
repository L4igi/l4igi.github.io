import { createContext, type ReactNode, useContext, useState } from "react";
import type { Language } from "../types";

const TRANSLATIONS = {
  en: {
    "hero.role": "Fullstack Engineer",
    "hero.open": "Open Profile",
    "cat.all": "ALL",
    "cat.work": "WORK",
    "cat.personal": "PERSONAL",
    "cat.uni": "UNI",
    "cat.likes": "LIKES",
    "btn.details": "DETAILS",
    "modal.id": "PROFILE",
    "modal.exp": "ADVENTURE LOG",
    "modal.skills": "SKILL SET",
    "modal.passport": "Official Passport",
    "modal.class": "Class",
    "modal.region": "Region",
    "modal.loc_name": "Vienna, Austria",
    "modal.langs": "Languages",
    "modal.lang_native": "German (Native)",
    "modal.lang_fluent": "English (Fluent)",
    "modal.hobbies": "Hobbies",
    "modal.hobbies_list": "Game Design, Cooking",
    "modal.hobbies_learning": "Japanese (Learning)",
    "modal.badges": "Badges & Certs",
    "modal.quote": "About Me",
    "modal.quote_text":
      "I don't just write code; I take ownership of the entire stack, strictly balancing architectural purity with tangible business value. As a Fullstack Engineer specializing in the Kotlin & Spring Boot ecosystem, I bring 4 years of hands-on expertise and a strategic mindset to this challenge. I believe sustainable systems are built through shared decision-making, mentorship, and a transparent error culture. Outside of enterprise systems, I sharpen my problem-solving skills through Game Development (Godot), using creative constraints to gain fresh technical perspectives.",
    "modal.sakurai_quote":
      "\"I don't think I've ever made something that I'm totally satisfied with.\n" +
      "That feeling of doubt, or wanting to do more, is my engine to move\n" +
      'forward and make the next iteration."',
    "modal.quote_author": "— Masahiro Sakurai",
    "modal.exp_title": "Adventure Log",
    "modal.stats": "Stats & Skills",
    "modal.likes_title": "Things I Enjoy",
    "skill.proficient": "Proficient",
    "skill.advanced": "Advanced",
    "skill.basic": "Basics",
    "game.gallery": "Software Gallery",
    "game.desc": "Software Description",
    "game.compatible": "Compatible",
    "game.fav": "FAVORITE",
    "game.add_fav": "ADD TO FAVORITES",
    "game.tech": "Technologies",
    "game.features": "Key Features",
    "footer.theme": "THEME",
    "footer.legal": "LEGAL",
    "topScreen.title1": "Select",
    "topScreen.title2": "Project",
    // LEGAL TEXTS
    "legal.title": "Legal & Privacy",
    "legal.imprint": "Imprint",
    "legal.privacy": "Privacy",
    "legal.imprint_text": `
            <h3>Legal Notice (Impressum)</h3>
            <p>Information according to § 5 ECG.</p>
            <br/>
            <h4>Service Provider</h4>
            <p>Lukas Höwarth</p>
            <p>Software Engineer</p>
            <p>Illekgasse 18/17</p>
            <p>1150 Vienna</p>
            <p>Austria</p>
            <br/>
            <p><strong>E-Mail:</strong> l.hoewarth@gmail.com</p>
            <br/>
            <p><strong>Responsible for content:</strong> Lukas Höwarth.</p>
            <p>This website is a personal portfolio for presenting projects and professional activities in the field of software development.</p>
            <br/>
            <p>Status: November 2025</p>
        `,
    "legal.privacy_text": `
            <h3>Privacy Policy</h3>
            <p>Information on the processing of personal data on this website.</p>
            <br/>
            <h4>1. Controller</h4>
            <p>Service provider and controller within the meaning of the General Data Protection Regulation (GDPR) is:</p>
            <p>Lukas Höwarth</p>
            <p>Vienna</p>
            <p>Austria</p>
            <p>E-Mail: l.hoewarth@gmail.com</p>
            <br/>
            <h4>2. General Data Processing</h4>
            <p>When visiting this website, personal data is only processed to the extent necessary for the operation of the site and the provision of content. No cookies are set for advertising or tracking purposes without consent.</p>
            <br/>
            <h4>3. Hosting & Server Log Files</h4>
            <p>This website is hosted by GitHub Pages (GitHub, Inc., USA). When accessing the website, standard technical data (IP address, browser, timestamp) is transmitted to the provider to ensure stability and security (Art. 6 para. 1 lit. f GDPR).</p>
            <br/>
            <h4>4. Your Rights</h4>
            <p>You have the right to access, rectification, deletion, and restriction of processing of your data. You can contact me at any time via email to exercise these rights.</p>
        `,
  },
  de: {
    "hero.role": "Fullstack Entwickler",
    "hero.open": "Profil öffnen",
    "cat.all": "ALLE",
    "cat.work": "ARBEIT",
    "cat.personal": "PRIVAT",
    "cat.uni": "UNI",
    "cat.likes": "INTERESSEN",
    "btn.details": "DETAILS",
    "modal.id": "PROFIL",
    "modal.exp": "ABENTEUER LOG",
    "modal.skills": "FÄHIGKEITEN",
    "modal.passport": "Offizieller Pass",
    "modal.class": "Klasse",
    "modal.region": "Region",
    "modal.loc_name": "Wien, Österreich",
    "modal.langs": "Sprachen",
    "modal.lang_native": "Deutsch (Muttersprache)",
    "modal.lang_fluent": "Englisch (Fließend)",
    "modal.hobbies": "Hobbys",
    "modal.hobbies_list": "Game Design, Kochen",
    "modal.hobbies_learning": "Japanisch (Lernen)",
    "modal.badges": "Orden & Zertifikate",
    "modal.quote": "Über Mich",
    "modal.quote_text":
      "„Ich schreibe nicht nur Code, sondern übernehme Verantwortung für den gesamten Stack – dabei wäge ich stets pragmatisch zwischen architektonischer Sauberkeit und konkretem Business Value ab. Als auf das Kotlin- & Spring Boot-Ökosystem spezialisierter Fullstack Engineer bringe ich hierfür 4 Jahre Praxiserfahrung und ein strategisches Mindset ein. Ich bin überzeugt, dass nachhaltige Systeme durch gemeinsame Entscheidungen, Mentoring und eine offene Fehlerkultur entstehen. Abseits der Enterprise-Welt schärfe ich meine Problemlösungskompetenz durch Game Development (Godot) und nutze diese kreativen Spielräume, um neue technische Perspektiven zu gewinnen.“",
    "modal.sakurai_quote":
      "\"I don't think I've ever made something that I'm totally satisfied with.\n" +
      "That feeling of doubt, or wanting to do more, is my engine to move\n" +
      'forward and make the next iteration."',
    "modal.quote_author": "— Masahiro Sakurai",
    "modal.exp_title": "Abenteuer Logbuch",
    "modal.stats": "Werte & Skills",
    "modal.likes_title": "Dinge, die ich mag",
    "skill.proficient": "Experte",
    "skill.advanced": "Fortgeschritten",
    "skill.basic": "Basiswissen",
    "game.gallery": "Software Galerie",
    "game.desc": "Software Beschreibung",
    "game.compatible": "Kompatibel",
    "game.fav": "FAVORIT",
    "game.add_fav": "FAVORISIEREN",
    "game.tech": "Technologien",
    "game.features": "Features",
    "footer.theme": "THEME",
    "footer.legal": "RECHTLICHES",
    "topScreen.title1": "Projekt",
    "topScreen.title2": "auswählen",
    "topScreen.hint": "Maus bewegen",
    "topScreen.hintMobile": "Wische zum Schauen",
    // LEGAL TEXTS
    "legal.title": "Rechtliches & Datenschutz",
    "legal.imprint": "Impressum",
    "legal.privacy": "Datenschutz",
    "legal.imprint_text": `
            <h3>Impressum</h3>
            <p>Angaben gemäß § 5 ECG.</p>
            <br/>
            <h4>Diensteanbieter</h4>
            <p>Lukas Höwarth</p>
            <p>Software Engineer</p>
            <p>Illekgasse 18/17</p>
            <p>1150 Wien</p>
            <p>Österreich</p>
            <br/>
            <p><strong>E-Mail:</strong> l.hoewarth@gmail.com</p>
            <br/>
            <p><strong>Verantwortlich für den Inhalt:</strong> Lukas Höwarth.</p>
            <p>Diese Website ist ein persönliches Portfolio zur Darstellung von Projekten und beruflichen Tätigkeiten im Bereich Softwareentwicklung.</p>
            <br/>
            <p>Stand: November 2025</p>
        `,
    "legal.privacy_text": `
            <h3>Datenschutzerklärung</h3>
            <p>Informationen zur Verarbeitung personenbezogener Daten auf dieser Website.</p>
            <br/>
            <h4>1. Verantwortlicher</h4>
            <p>Diensteanbieter und Verantwortlicher im Sinne der DSGVO ist:</p>
            <p>Lukas Höwarth</p>
            <p>Wien</p>
            <p>Österreich</p>
            <p>E-Mail: l.hoewarth@gmail.com</p>
            <br/>
            <h4>2. Allgemeines zur Datenverarbeitung</h4>
            <p>Beim Besuch dieser Website werden personenbezogene Daten nur in dem Umfang verarbeitet, wie es für den Betrieb der Seite und die Bereitstellung der Inhalte erforderlich ist. Es werden keine Cookies zu Werbe- oder Trackingzwecken gesetzt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).</p>
            <br/>
            <h4>3. Bereitstellung der Website</h4>
            <p>Diese Website wird über **GitHub Pages** (GitHub, Inc., USA) bereitgestellt. Beim Aufruf der Website übermittelt Ihr Browser automatisch Daten (IP-Adresse, Browser, Zeitstempel), die in Server-Logfiles gespeichert werden können. Diese Daten dienen der Sicherheit und Stabilität.</p>
            <br/>
            <h4>4. Ihre Rechte</h4>
            <p>Ihnen stehen die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch zu. Kontaktieren Sie mich dazu bitte per E-Mail.</p>
        `,
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof (typeof TRANSLATIONS)["en"]) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const getInitialLanguage = (): Language => {
    const savedLang = localStorage.getItem("app-language");
    if (savedLang === "en" || savedLang === "de") {
      return savedLang as Language;
    }

    if (typeof navigator !== "undefined") {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("de")) {
        return "de";
      }
    }

    return "en";
  };

  const [storedLanguage, setStoredLanguage] =
    useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setStoredLanguage(lang);
    localStorage.setItem("app-language", lang);
  };

  const t = (key: keyof (typeof TRANSLATIONS)["en"]) => {
    return TRANSLATIONS[storedLanguage][key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language: storedLanguage, // Map storedLanguage to the context 'language'
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
