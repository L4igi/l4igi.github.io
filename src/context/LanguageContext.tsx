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
    // LEGAL TEXTS - UPDATED
    "legal.title": "Legal & Privacy",
    "legal.imprint": "Imprint",
    "legal.privacy": "Privacy",
    "legal.imprint_text": `
            <h3>Legal Notice (Impressum)</h3>
            <p><strong>Information according to § 5 ECG and § 25 Media Act.</strong></p>
            <br/>
            <h4>Media Owner & Publisher</h4>
            <p>Lukas Höwarth</p>
            <p>Software Engineer</p>
            <p>Illekgasse 18/17</p>
            <p>1150 Vienna, Austria</p>
            <br/>
            <h4>Contact</h4>
            <p><strong>E-Mail:</strong> l.hoewarth@gmail.com</p>
            <br/>
            <h4>Editorial Policy</h4>
            <p>This website is a personal portfolio for presenting software projects, skills, and professional experience. It serves purely for personal presentation.</p>
            <br/>
            <p>Status: November 2025</p>
        `,
    "legal.privacy_text": `
            <h3>Privacy Policy</h3>
            <p>Protection of your personal data is a priority. I process your data exclusively based on statutory regulations (GDPR, TKG 2003).</p>
            <br/>
            <h4>1. Controller</h4>
            <p>Lukas Höwarth</p>
            <p>Illekgasse 18/17, 1150 Vienna, Austria</p>
            <p>E-Mail: l.hoewarth@gmail.com</p>
            <br/>
            <h4>2. Hosting (GitHub Pages)</h4>
            <p>This website is hosted by <strong>GitHub Inc.</strong> (USA). When you visit this website, the server automatically saves logs (IP address, browser, timestamp). This is technically necessary to ensure the stability and security of the website (Art. 6 para. 1 lit. f GDPR).</p>
            <br/>
            <h4>3. Cookies</h4>
            <p>This website does not use cookies for tracking or advertising purposes.</p>
            <br/>
            <h4>4. Your Rights</h4>
            <p>You have the right to access, rectification, deletion, restriction, data portability, and objection. Please contact me via email to exercise these rights.</p>
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
    // LEGAL TEXTS - UPDATED (Austrian Law + GitHub Pages)
    "legal.title": "Rechtliches & Datenschutz",
    "legal.imprint": "Impressum",
    "legal.privacy": "Datenschutz",
    "legal.imprint_text": `
            <h3>Impressum</h3>
            <p><strong>Angaben gemäß § 5 ECG und Offenlegung gemäß § 25 Mediengesetz.</strong></p>
            <br/>
            <h4>Medieninhaber & Herausgeber</h4>
            <p>Lukas Höwarth</p>
            <p>Software Engineer</p>
            <p>Illekgasse 18/17</p>
            <p>1150 Wien, Österreich</p>
            <br/>
            <h4>Kontakt</h4>
            <p><strong>E-Mail:</strong> l.hoewarth@gmail.com</p>
            <br/>
            <h4>Blattlinie</h4>
            <p>Diese Website ist ein persönliches Portfolio zur Präsentation von eigenen Software-Projekten, Fähigkeiten und beruflichen Erfahrungen. Sie dient der persönlichen Darstellung und verfolgt keine unmittelbaren kommerziellen Interessen.</p>
            <br/>
            <p>Stand: November 2025</p>
        `,
    "legal.privacy_text": `
            <h3>Datenschutzerklärung</h3>
            <p>Der Schutz Ihrer persönlichen Daten ist mir ein besonderes Anliegen. Ich verarbeite Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003).</p>
            <br/>
            <h4>1. Verantwortlicher</h4>
            <p>Lukas Höwarth</p>
            <p>Illekgasse 18/17</p>
            <p>1150 Wien, Österreich</p>
            <p>E-Mail: l.hoewarth@gmail.com</p>
            <br/>
            <h4>2. Hosting (GitHub Pages)</h4>
            <p>Diese Website wird bei <strong>GitHub Inc.</strong> (USA) gehostet. Wenn Sie diese Webseite aufrufen, erfasst GitHub automatisch Informationen in sogenannten Server-Logfiles (IP-Adresse, Browser, Zeitstempel). Dies ist technisch notwendig, um die Sicherheit und Stabilität der Webseite zu gewährleisten (Art. 6 Abs. 1 lit. f DSGVO).</p>
            <br/>
            <h4>3. Cookies</h4>
            <p>Auf dieser Website werden **keine** Cookies zu Analyse-, Tracking- oder Werbezwecken eingesetzt.</p>
            <br/>
            <h4>4. Ihre Rechte</h4>
            <p>Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch zu. Bitte kontaktieren Sie mich dazu per E-Mail.</p>
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
        language: storedLanguage,
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