import { motion } from 'framer-motion';
import { User, Wifi, Battery } from 'lucide-react';
import type {Theme} from "../../types";

interface StatusBarProps {
    time: string;
    showProfileWidget: boolean;
    onProfileClick: () => void;
    theme: Theme;
}

export const StatusBar = ({ time, showProfileWidget, onProfileClick, theme }: StatusBarProps) => (
    <div className="flex justify-between items-center px-4 py-1 bg-black/90 text-white text-xs font-mono border-b border-white/10 z-50 relative select-none h-8 shadow-md shrink-0">
        <div className="flex items-center gap-4">
            <motion.button
                onClick={onProfileClick}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: showProfileWidget ? 0 : -20, opacity: showProfileWidget ? 1 : 0 }}
                className={`flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-0.5 rounded-full transition-colors border border-gray-600 group ${!showProfileWidget && 'pointer-events-none'}`}
                title="Back to Profile"
            >
                <div className="w-4 h-4 rounded-full border border-white overflow-hidden relative" style={{backgroundColor: theme.colors.accent}}>
                    <User size={10} className="absolute bottom-0 left-1/2 -translate-x-1/2 text-white/90" />
                </div>
                <span className="font-bold text-[10px] group-hover:text-[var(--accent)]">Lukas</span>
            </motion.button>
        </div>
        <div className="flex items-center space-x-4">
            <span className="hidden sm:inline font-bold tracking-widest opacity-80">{time}</span>
            <div className="flex items-center space-x-1">
                <span className="text-[10px] text-gray-400">WiFi</span>
                <Wifi size={14} className="text-blue-400" />
            </div>
            <div className="flex items-center space-x-1">
                <Battery size={14} className="text-green-400" />
            </div>
        </div>
    </div>
);