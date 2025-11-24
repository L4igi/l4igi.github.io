import {useState, useEffect, useRef} from 'react';
import {
    X,
    User,
    Briefcase,
    Award,
    Languages,
    Utensils,
    MapPin,
    Quote,
    Heart,
    Sparkles,
    Mail,
    Github,
    Linkedin,
    Medal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type {SkillLevel, Theme} from "../../types";
import { useLanguage } from "../../context/LanguageContext";
import { EXPERIENCE_DATA, SKILLS_DATA, LIKES_DATA } from "../../data/content";
import type {Variants} from "motion";

export const AboutModal = ({ onClose, theme }: { onClose: () => void, theme: Theme }) => {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState<'ID' | 'EXP' | 'SKILLS' | 'LIKES'>('ID');
    const [activeSkillLevel, setActiveSkillLevel] = useState<SkillLevel>('PROFICIENT');
    const [isClosing, setIsClosing] = useState(false);

    const [isExpanded, setIsExpanded] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    // Ref for the scrollable content container
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsExpanded(true), 400);
        return () => clearTimeout(timer);
    }, []);

    // Scroll to top when switching tabs or skill levels
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    }, [activeTab, activeSkillLevel]);

    const handleClose = () => { setIsClosing(true); setTimeout(onClose, 300); };

    const TABS = [
        { id: 'ID', label: t('modal.id'), icon: <User size={18} /> },
        { id: 'EXP', label: t('modal.exp'), icon: <Briefcase size={18} /> },
        { id: 'SKILLS', label: t('modal.skills'), icon: <Award size={18} /> },
        { id: 'LIKES', label: t('cat.likes'), icon: <Heart size={18} /> },
    ];

    const SOCIALS = [
        { icon: <Github size={20} />, label: "GitHub", url: "#" },
        { icon: <Linkedin size={20} />, label: "LinkedIn", url: "#" },
        { icon: <Mail size={20} />, label: "Email", url: "#" },
    ];

    // Helper to find active skill data
    const activeSkillCategory = SKILLS_DATA.find(cat => cat.id === activeSkillLevel);

    // --- ANIMATION VARIANTS ---
    const modalVariants: Variants = {
        initial: { opacity: 0, scale: 0.9, y: 50 },
        animate: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
        collapsed: { height: 280, transition: { type: "spring", stiffness: 200, damping: 25 } },
        expanded: { height: '85vh', transition: { type: "spring", stiffness: 120, damping: 20, delay: 0.1 } },
        exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
    };

    const contentStagger: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <div className={`fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/90 sm:bg-black/70 sm:backdrop-blur-md transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>

            <motion.div
                variants={modalVariants}
                initial="initial"
                animate={["animate", isExpanded ? "expanded" : "collapsed"]}
                exit="exit"
                className="w-full max-w-5xl rounded-[36px] overflow-hidden border-4 flex flex-col relative will-change-transform"
                style={{
                    backgroundColor: theme.colors.cardBg,
                    borderColor: theme.colors.primary,
                    boxShadow: isExpanded ? '0 25px 50px -12px rgba(0,0,0,0.5)' : 'none'
                }}
            >
                {/* --- HERO HEADER --- */}
                <div className="relative h-40 shrink-0 overflow-hidden" style={{ backgroundColor: theme.colors.accent }}>
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
                    <div className="relative z-10 h-full px-8 flex items-center justify-between">
                        <div className="ml-32 sm:ml-40 mt-4 text-white drop-shadow-md">
                            <motion.h2 layoutId="modal-title" className="text-2xl sm:text-4xl font-black tracking-tight">Lukas Höwarth</motion.h2>
                            <motion.p layoutId="modal-role" className="opacity-90 font-bold text-xs sm:text-base flex items-center gap-2 uppercase tracking-wider">
                                <Sparkles size={14} /> Fullstack Engineer
                            </motion.p>
                        </div>
                        <button onClick={handleClose} className="p-2.5 rounded-full transition-all duration-200 backdrop-blur-md border shadow-sm hover:scale-110 bg-white/20 border-white/30 text-white">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* --- FLOATING AVATAR --- */}
                <div className="absolute top-16 left-8 z-20">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-[6px] shadow-2xl overflow-hidden flex items-center justify-center bg-white dark:bg-gray-800 relative" style={{ borderColor: theme.colors.cardBg }}>
                        <div className="absolute inset-0 flex items-center justify-center"><span className="text-4xl font-black opacity-20" style={{ color: theme.colors.accent }}>LH</span></div>
                        <motion.img src="/profile/me.jpg" alt="LH" className="w-full h-full object-cover relative z-10" initial={{ opacity: 0 }} animate={{ opacity: isImageLoaded ? 1 : 0 }} transition={{ duration: 0.5 }} onLoad={() => setIsImageLoaded(true)} onError={(e) => e.currentTarget.style.display='none'} decoding="async" />
                    </div>
                </div>

                {/* --- MAIN BODY --- */}
                <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">

                    {/* MOBILE TOP NAV */}
                    {isExpanded && (
                        <div className="sm:hidden w-full px-4 pt-16 pb-2 border-b z-10 grid grid-cols-2 gap-2 shrink-0" style={{ borderColor: theme.colors.primary }}>
                            {TABS.map((tab) => (
                                <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`relative px-2 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors border ${activeTab === tab.id ? 'text-white border-transparent' : 'border-transparent hover:bg-black/5'}`} style={{ color: activeTab === tab.id ? theme.colors.contrastAccent : theme.colors.textLight, backgroundColor: activeTab === tab.id ? 'transparent' : theme.colors.secondary }}>
                                    {activeTab === tab.id && <motion.div layoutId="activeTabMobile" className="absolute inset-0 rounded-xl" style={{ backgroundColor: theme.colors.accent }} transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                                    <span className="relative z-10 flex items-center gap-2">{tab.icon} {tab.label}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* DESKTOP SIDEBAR */}
                    <div className="hidden sm:flex w-64 p-4 pt-24 flex-col gap-2 border-r z-10" style={{ backgroundColor: theme.colors.primary, borderColor: theme.colors.secondary }}>
                        {isExpanded && (
                            <motion.div variants={contentStagger} initial="hidden" animate="visible" className="flex flex-col h-full">
                                <div className="space-y-2">
                                    {TABS.map((tab) => (
                                        <motion.button variants={itemVariants} key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`w-full flex items-center gap-4 p-3 rounded-xl font-bold text-sm transition-all relative overflow-hidden group`} style={{ backgroundColor: activeTab === tab.id ? theme.colors.accent : 'transparent', color: activeTab === tab.id ? theme.colors.contrastAccent : theme.colors.textLight }}>
                                            <div className={`relative z-10 flex items-center gap-3`}>{tab.icon}<span className="tracking-wide">{tab.label}</span></div>
                                        </motion.button>
                                    ))}
                                </div>

                                {/* DESKTOP CONNECT */}
                                <div className="mt-auto pt-6">
                                    <h4 className="text-xs font-black uppercase tracking-widest opacity-50 mb-3 px-2" style={{ color: theme.colors.text }}>Connect</h4>
                                    <div className="flex gap-2">
                                        {SOCIALS.map((social, i) => (
                                            <a key={i} href={social.url} target="_blank" rel="noopener noreferrer"
                                               className="p-2.5 rounded-xl border flex items-center justify-center transition-all hover:scale-110 hover:shadow-md"
                                               style={{ backgroundColor: theme.colors.cardBg, borderColor: theme.colors.secondary, color: theme.colors.text }}
                                               title={social.label}
                                            >
                                                {social.icon}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* CONTENT AREA */}
                    <div
                        ref={contentRef}
                        className="flex-1 p-6 sm:p-10 overflow-y-auto custom-scrollbar relative"
                        style={{ backgroundColor: theme.colors.cardBg }}
                    >
                        {isExpanded && (
                            <AnimatePresence mode="wait">

                                {/* === TAB: ID === */}
                                {activeTab === 'ID' && (
                                    <motion.div key="ID" variants={contentStagger} initial="hidden" animate="visible" exit={{ opacity: 0, y: 10 }} className="space-y-8 sm:pt-4">
                                        <motion.div variants={itemVariants} className="relative p-6 rounded-2xl rounded-tl-none border shadow-sm" style={{ backgroundColor: theme.colors.primary, borderColor: theme.colors.secondary }}>
                                            <h4 className="text-xs font-black uppercase tracking-widest mb-2 opacity-60 flex items-center gap-2" style={{ color: theme.colors.text }}>
                                                <User size={14} /> {t('modal.quote')}
                                            </h4>
                                            <p className="text-sm sm:text-lg font-medium leading-relaxed" style={{ color: theme.colors.text }}>{t('modal.quote_text')}</p>
                                        </motion.div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {[
                                                { label: t('modal.class'), val: t('hero.role'), icon: <Briefcase size={20} /> },
                                                { label: t('modal.region'), val: t('modal.loc_name'), icon: <MapPin size={20} /> },
                                                { label: t('modal.langs'), val: t('modal.lang_native'), sub: t('modal.lang_fluent'), icon: <Languages size={20} /> },
                                                { label: t('modal.hobbies'), val: t('modal.hobbies_list'), sub: t('modal.hobbies_learning'), icon: <Utensils size={20} /> },
                                            ].map((stat, i) => (
                                                <motion.div variants={itemVariants} key={i} className="p-4 rounded-2xl border shadow-sm flex items-start gap-4 group" style={{ backgroundColor: theme.colors.primary, borderColor: theme.colors.secondary }}>
                                                    <div className="p-2.5 rounded-xl" style={{ backgroundColor: theme.colors.accent, color: theme.colors.contrastAccent }}>{stat.icon}</div>
                                                    <div>
                                                        <div className="text-[10px] font-black uppercase mb-1 tracking-widest opacity-50" style={{ color: theme.colors.text }}>{stat.label}</div>
                                                        <div className="font-bold text-sm sm:text-base leading-tight" style={{ color: theme.colors.text }}>{stat.val}</div>
                                                        {stat.sub && <div className="text-xs font-medium opacity-60 mt-0.5" style={{ color: theme.colors.text }}>{stat.sub}</div>}
                                                    </div>
                                                </motion.div>
                                            ))}

                                            <motion.div variants={itemVariants} className="sm:col-span-2 p-4 rounded-2xl border shadow-sm flex items-center gap-4" style={{ backgroundColor: theme.colors.primary, borderColor: theme.colors.secondary }}>
                                                <div className="p-3 rounded-xl" style={{ backgroundColor: theme.colors.cardBg, color: theme.colors.accent, border: `2px solid ${theme.colors.secondary}` }}>
                                                    <Medal size={24} />
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-black uppercase mb-1 tracking-widest opacity-50" style={{ color: theme.colors.text }}>{t('modal.badges')}</div>
                                                    <div className="font-bold text-sm sm:text-base" style={{ color: theme.colors.text }}>Certified Scrum Master (2021)</div>
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* MOBILE CONNECT */}
                                        <div className="sm:hidden">
                                            <motion.div variants={itemVariants} className="space-y-3">
                                                <h4 className="text-xs font-black uppercase tracking-widest opacity-80" style={{ color: theme.colors.text }}>Connect</h4>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {SOCIALS.map((social, i) => (
                                                        <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl border flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform cursor-pointer" style={{ backgroundColor: theme.colors.accent, color: theme.colors.contrastAccent, boxShadow: '0 4px 15px -5px rgba(0,0,0,0.3)' }}>
                                                            <div className="opacity-80">{social.icon}</div>
                                                            <span className="text-xs font-bold">{social.label}</span>
                                                        </a>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        </div>

                                        <motion.div variants={itemVariants} className="p-6 rounded-2xl border relative mt-4" style={{ backgroundColor: theme.colors.primary, borderColor: theme.colors.secondary }}>
                                            <Quote size={32} className="absolute top-4 right-4 rotate-12 opacity-20" style={{ color: theme.colors.accent }} />
                                            <p className="text-lg font-bold italic relative z-10 text-center" style={{ color: theme.colors.text }}>{t('modal.sakurai_quote')}</p>
                                            <p className="text-xs font-black uppercase tracking-widest text-right mt-4 opacity-60" style={{ color: theme.colors.text }}>{t('modal.quote_author')}</p>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* === TAB: EXP === */}
                                {activeTab === 'EXP' && (
                                    <motion.div key="EXP" variants={contentStagger} initial="hidden" animate="visible" exit={{ opacity: 0 }} className="sm:pt-4">
                                        <div className="relative border-l-2 ml-3 space-y-8 py-2" style={{ borderColor: theme.colors.secondary }}>
                                            {EXPERIENCE_DATA.map((item, i) => (
                                                <motion.div variants={itemVariants} key={i} className="relative pl-8 group">
                                                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-[3px] shadow-sm group-hover:scale-125 transition-transform duration-300" style={{ borderColor: theme.colors.cardBg, backgroundColor: theme.colors.accent }}></div>
                                                    <div className="p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all hover:-translate-y-1" style={{ backgroundColor: theme.colors.primary, borderColor: theme.colors.secondary }}>
                                                        <div className="flex flex-wrap justify-between items-baseline mb-2 gap-2">
                                                            <h3 className="font-bold text-lg" style={{ color: theme.colors.text }}>{item.title}</h3>
                                                            <span className="text-xs font-bold px-2.5 py-1 rounded-full opacity-80" style={{ backgroundColor: theme.colors.cardBg, color: theme.colors.text }}>{item.year}</span>
                                                        </div>
                                                        <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: theme.colors.accent }}>{item.role[language]}</div>
                                                        <p className="text-sm leading-relaxed opacity-80" style={{ color: theme.colors.text }}>{item.desc[language]}</p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* === TAB: SKILLS === */}
                                {activeTab === 'SKILLS' && (
                                    <motion.div key="SKILLS" variants={contentStagger} initial="hidden" animate="visible" exit={{ opacity: 0 }} className="sm:pt-4 space-y-6">
                                        <div className="flex gap-2 p-1 rounded-xl border w-fit max-w-full overflow-x-auto no-scrollbar mx-auto" style={{ borderColor: theme.colors.secondary, backgroundColor: theme.colors.primary }}>
                                            {SKILLS_DATA.map((cat) => (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => setActiveSkillLevel(cat.id)}
                                                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all relative shrink-0 ${activeSkillLevel === cat.id ? 'text-white' : 'opacity-60'}`}
                                                    style={{ color: activeSkillLevel === cat.id ? theme.colors.contrastAccent : theme.colors.text }}
                                                >
                                                    {activeSkillLevel === cat.id && (
                                                        <motion.div
                                                            layoutId="activeSkillTab"
                                                            className="absolute inset-0 rounded-lg"
                                                            style={{ backgroundColor: theme.colors.accent }}
                                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                        />
                                                    )}
                                                    <span className="relative z-10">{cat.label[language]}</span>
                                                </button>
                                            ))}
                                        </div>

                                        <AnimatePresence mode="wait">
                                            {activeSkillCategory && (
                                                <motion.div
                                                    key={activeSkillCategory.id}
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="space-y-4"
                                                >
                                                    <p className="text-sm font-medium opacity-70 italic" style={{ color: theme.colors.text }}>
                                                        {activeSkillCategory.description[language]}
                                                    </p>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        {activeSkillCategory.skills.map((skill, i) => (
                                                            <motion.div
                                                                custom={i}
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: i * 0.05 }}
                                                                key={skill.name}
                                                                className="p-5 rounded-2xl shadow-sm border"
                                                                style={{ backgroundColor: theme.colors.primary, borderColor: theme.colors.secondary }}
                                                            >
                                                                <div className="flex justify-between text-sm font-bold mb-3">
                                                                    <span style={{ color: theme.colors.text }}>{skill.name}</span>
                                                                    <span style={{ color: theme.colors.accent }}>{skill.level}%</span>
                                                                </div>
                                                                <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: theme.colors.cardBg }}>
                                                                    <motion.div
                                                                        initial={{ width: 0 }}
                                                                        animate={{ width: `${skill.level}%` }}
                                                                        transition={{ duration: 1, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                                                                        className="h-full rounded-full"
                                                                        style={{ backgroundColor: theme.colors.accent }}
                                                                    />
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                )}

                                {/* === TAB: LIKES === */}
                                {activeTab === 'LIKES' && (
                                    <motion.div key="LIKES" variants={contentStagger} initial="hidden" animate="visible" exit={{ opacity: 0 }} className="grid grid-cols-1 gap-4 sm:pt-4">
                                        {LIKES_DATA.map((item) => (
                                            <motion.div variants={itemVariants} key={item.id} className="p-5 rounded-2xl shadow-sm border flex gap-5 items-center hover:shadow-md transition-all hover:scale-[1.01]" style={{ backgroundColor: theme.colors.primary, borderColor: theme.colors.secondary }}>
                                                <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center text-white shrink-0 shadow-md`}>{item.icon}</div>
                                                <div>
                                                    <h3 className="font-bold text-lg" style={{ color: theme.colors.text }}>{item.title}</h3>
                                                    <p className="text-xs font-bold uppercase tracking-wide mb-1 opacity-60" style={{ color: theme.colors.text }}>{item.role[language]}</p>
                                                    <p className="text-sm leading-snug opacity-80" style={{ color: theme.colors.text }}>{item.description[language]}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};