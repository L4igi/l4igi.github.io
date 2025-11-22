import { useState } from 'react';
import { X, User, Briefcase, Award, Languages, Utensils, MapPin, Quote, Heart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Theme } from "../../types";
import { useLanguage } from "../../context/LanguageContext";
import { EXPERIENCE_DATA, SKILLS_DATA, LIKES_DATA } from "../../data/content";
import type {Variants} from "motion";

export const AboutModal = ({ onClose, theme }: { onClose: () => void, theme: Theme }) => {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState<'ID' | 'EXP' | 'SKILLS' | 'LIKES'>('ID');
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => { setIsClosing(true); setTimeout(onClose, 300); };

    const TABS = [
        { id: 'ID', label: t('modal.id'), icon: <User size={18} /> },
        { id: 'EXP', label: t('modal.exp'), icon: <Briefcase size={18} /> },
        { id: 'SKILLS', label: t('modal.skills'), icon: <Award size={18} /> },
        { id: 'LIKES', label: t('cat.likes'), icon: <Heart size={18} /> },
    ];

    const modalVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
        exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
    };

    const contentVariants: Variants = {
        hidden: { opacity: 0, x: 10 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
        exit: { opacity: 0, x: -10, transition: { duration: 0.2 } }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i: number) => ({
            opacity: 1, y: 0,
            transition: { delay: i * 0.05, type: "spring", stiffness: 100 }
        })
    };

    return (
        <div className={`fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>

            <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-5xl h-[85vh] rounded-[36px] overflow-hidden shadow-2xl border-4 flex flex-col relative"
                style={{ backgroundColor: theme.colors.cardBg, borderColor: theme.colors.primary }}
            >
                {/* --- HERO HEADER --- */}
                <div className="relative h-40 shrink-0 overflow-hidden" style={{ backgroundColor: theme.colors.accent }}>
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>

                    {/* Header Content */}
                    <div className="relative z-10 h-full px-8 flex items-center justify-between">
                        {/* Empty space for avatar layout */}
                        <div className="ml-32 sm:ml-40 mt-4 text-white drop-shadow-md">
                            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Lukas Höwarth</h2>
                            <p className="opacity-90 font-bold text-sm sm:text-base flex items-center gap-2 uppercase tracking-wider">
                                <Sparkles size={14} /> Fullstack Engineer
                            </p>
                        </div>

                        <button
                            onClick={handleClose}
                            className="p-2.5 rounded-full transition-all duration-200 backdrop-blur-md border shadow-sm hover:scale-110 bg-white/20 border-white/30 text-white"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* --- FLOATING AVATAR --- */}
                <div className="absolute top-16 left-8 z-20">
                    <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                        className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-[6px] shadow-2xl overflow-hidden flex items-center justify-center"
                        style={{ backgroundColor: theme.colors.cardBg, borderColor: theme.colors.cardBg }}
                    >
                        <div className="text-4xl font-black" style={{ color: theme.colors.accent }}>LH</div>
                    </motion.div>
                </div>

                {/* --- MAIN BODY --- */}
                <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">

                    {/* SIDEBAR NAV */}
                    <div className="w-full sm:w-64 p-4 pt-20 sm:pt-24 flex flex-col gap-2 border-r z-10" style={{ backgroundColor: theme.colors.primary, borderColor: theme.colors.secondary }}>
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`w-full flex items-center gap-4 p-3 rounded-xl font-bold text-sm transition-all relative overflow-hidden group`}
                                style={{
                                    backgroundColor: activeTab === tab.id ? theme.colors.accent : 'transparent',
                                    color: activeTab === tab.id ? theme.colors.contrastAccent : theme.colors.textLight
                                }}
                            >
                                <div className={`relative z-10 flex items-center gap-3`}>
                                    {tab.icon}
                                    <span className="tracking-wide">{tab.label}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* CONTENT AREA */}
                    <div className="flex-1 p-6 sm:p-10 overflow-y-auto custom-scrollbar relative" style={{ backgroundColor: theme.colors.cardBg }}>
                        <AnimatePresence mode="wait">

                            {/* TAB: ID CARD */}
                            {activeTab === 'ID' && (
                                <motion.div key="ID" variants={contentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">

                                    <div className="space-y-2">
                                        <h4 className="text-xs font-black uppercase tracking-widest mb-2 opacity-80" style={{ color: theme.colors.accent }}>{t('modal.quote')}</h4>
                                        <p className="text-base sm:text-lg font-medium leading-relaxed" style={{ color: theme.colors.text }}>
                                            {t('modal.quote_text')}
                                        </p>
                                    </div>

                                    <div className="w-full h-px opacity-10" style={{ backgroundColor: theme.colors.text }}></div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[
                                            { label: t('modal.class'), val: t('hero.role'), icon: <Briefcase size={20} /> },
                                            { label: t('modal.region'), val: t('modal.loc_name'), icon: <MapPin size={20} /> },
                                            { label: t('modal.langs'), val: t('modal.lang_native'), sub: t('modal.lang_fluent'), icon: <Languages size={20} /> },
                                            { label: t('modal.hobbies'), val: t('modal.hobbies_list'), sub: t('modal.hobbies_learning'), icon: <Utensils size={20} /> },
                                        ].map((stat, i) => (
                                            <motion.div
                                                custom={i} variants={itemVariants} key={i}
                                                className="p-5 rounded-2xl border shadow-sm flex items-start gap-4 group"
                                                style={{ backgroundColor: theme.colors.primary, borderColor: theme.colors.secondary }}
                                            >
                                                <div className="p-2.5 rounded-xl" style={{ backgroundColor: theme.colors.accent, color: theme.colors.contrastAccent }}>
                                                    {stat.icon}
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-black uppercase mb-1 tracking-widest opacity-50" style={{ color: theme.colors.text }}>{stat.label}</div>
                                                    <div className="font-bold text-base leading-tight" style={{ color: theme.colors.text }}>{stat.val}</div>
                                                    {stat.sub && <div className="text-sm font-medium opacity-60 mt-0.5" style={{ color: theme.colors.text }}>{stat.sub}</div>}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="p-6 rounded-2xl border relative mt-4" style={{ backgroundColor: theme.colors.primary, borderColor: theme.colors.secondary }}>
                                        <Quote size={32} className="absolute top-4 right-4 rotate-12 opacity-20" style={{ color: theme.colors.accent }} />
                                        <p className="text-lg font-bold italic relative z-10 text-center" style={{ color: theme.colors.text }}>
                                            "Coding for compliments. Also building cool stuff with Kotlin & Godot. Moving forward to the next iteration."
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {/* TAB: EXPERIENCE */}
                            {activeTab === 'EXP' && (
                                <motion.div key="EXP" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                                    <div className="relative border-l-2 ml-3 space-y-8 py-2" style={{ borderColor: theme.colors.secondary }}>
                                        {EXPERIENCE_DATA.map((item, i) => (
                                            <motion.div custom={i} variants={itemVariants} key={i} className="relative pl-8 group">
                                                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-[3px] shadow-sm group-hover:scale-125 transition-transform duration-300" style={{ borderColor: theme.colors.cardBg, backgroundColor: theme.colors.accent }}></div>

                                                <div className="p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all hover:-translate-y-1" style={{ backgroundColor: theme.colors.primary, borderColor: theme.colors.secondary }}>
                                                    <div className="flex flex-wrap justify-between items-baseline mb-2 gap-2">
                                                        <h3 className="font-bold text-lg" style={{ color: theme.colors.text }}>{item.title}</h3>
                                                        <span className="text-xs font-bold px-2.5 py-1 rounded-full opacity-80" style={{ backgroundColor: theme.colors.cardBg, color: theme.colors.text }}>
                                                            {item.year}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: theme.colors.accent }}>{item.role[language]}</div>
                                                    <p className="text-sm leading-relaxed opacity-80" style={{ color: theme.colors.text }}>{item.desc[language]}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* TAB: SKILLS */}
                            {activeTab === 'SKILLS' && (
                                <motion.div key="SKILLS" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {SKILLS_DATA.map((stat, i) => (
                                            <motion.div custom={i} variants={itemVariants} key={stat.l} className="p-6 rounded-2xl shadow-sm border" style={{ backgroundColor: theme.colors.primary, borderColor: theme.colors.secondary }}>
                                                <div className="flex justify-between text-sm font-bold mb-3">
                                                    <span style={{ color: theme.colors.text }}>{stat.l}</span>
                                                    <span style={{ color: theme.colors.accent }}>{stat.v}%</span>
                                                </div>
                                                <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: theme.colors.cardBg }}>
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${stat.v}%` }}
                                                        transition={{ duration: 1, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                                                        className="h-full rounded-full"
                                                        style={{ backgroundColor: theme.colors.accent }}
                                                    ></motion.div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* TAB: LIKES */}
                            {activeTab === 'LIKES' && (
                                <motion.div key="LIKES" variants={contentVariants} initial="hidden" animate="visible" exit="exit" className="grid grid-cols-1 gap-4">
                                    {LIKES_DATA.map((item, i) => (
                                        <motion.div
                                            custom={i} variants={itemVariants}
                                            key={item.id}
                                            className="p-5 rounded-2xl shadow-sm border flex gap-5 items-center hover:shadow-md transition-all hover:scale-[1.01]"
                                            style={{ backgroundColor: theme.colors.primary, borderColor: theme.colors.secondary }}
                                        >
                                            <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center text-white shrink-0 shadow-md`}>
                                                {item.icon}
                                            </div>
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
                    </div>
                </div>
            </motion.div>
        </div>
    );
};