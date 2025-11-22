import { useEffect } from 'react';
import { motion } from 'framer-motion';

export const BootSplash = ({ onComplete }: { onComplete: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onComplete, 600);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 animate-pulse">
                <div className="text-red-400 font-black text-5xl tracking-tighter flex items-center gap-2">
                    <div className="w-10 h-10 border-[10px] border-red-400 rounded-2xl"></div>
                    L4igi
                </div>
                <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden mt-8">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.6 }}
                        className="h-full bg-red-400"
                    />
                </div>
            </div>
        </div>
    );
};