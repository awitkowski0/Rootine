import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { DINOS } from "../data/dinos";
import { useMemo } from "react";

export default function MyStats() {
    const [, setLocation] = useLocation();
    
    // Mock Data for Stats
    const stats = {
        streak: 5,
        totalEntries: 24,
        averageMood: 3.8,
        topActivity: "Greenhouse",
    };

    const footerDino = useMemo(() => {
        return DINOS[Math.floor(Math.random() * DINOS.length)];
    }, []);

    return (
        <div className="min-h-screen bg-dark-green flex flex-col items-center justify-center p-4 font-display relative overflow-hidden">
             {/* Main Card Container */}
             <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[402px] bg-rootine-bg rounded-[50px] shadow-2xl overflow-hidden mb-8 z-10"
            >
                {/* Header */}
                <div className="w-full h-32 bg-primary-green rounded-b-[50px] relative flex items-center justify-center shrink-0 shadow-sm z-20">
                     <button 
                        onClick={() => setLocation("/")}
                        className="absolute left-6 top-6 text-white hover:text-rootine-bg transition-colors"
                    >
                        <ArrowLeft size={32} strokeWidth={2.5} />
                    </button>
                    {/* Flower Right */}
                    <div className="absolute right-2 opacity-90">
                        <img
                            src="/header_flower.png"
                            alt="Flower"
                            className="w-36 h-auto transform rotate-[19.22deg]"
                        />
                    </div>
                    <div className="absolute bottom-0 w-36 h-18 bg-rootine-bg border-rootine-bg border-4 rounded-t-full translate-y-[1px]"></div>
                </div>

                {/* Body Content */}
                <div className="bg-rootine-bg flex flex-col items-center justify-start px-6 py-8 h-[600px] overflow-y-auto custom-scrollbar">
                     <h2 className="text-2xl font-bold text-dark-green mb-6 text-center w-full">My Stats</h2>
                     
                     <div className="grid grid-cols-2 gap-4 w-full mb-6">
                        {/* Streak */}
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-black/5 text-center">
                            <h3 className="text-3xl font-bold text-primary-green">{stats.streak}</h3>
                            <p className="text-xs font-bold text-neutral-dark">Day Streak</p>
                        </div>
                         {/* Total Entries */}
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-black/5 text-center">
                            <h3 className="text-3xl font-bold text-accent-yellow">{stats.totalEntries}</h3>
                            <p className="text-xs font-bold text-neutral-dark">Total Entries</p>
                        </div>
                     </div>

                     {/* Weekly Graph Placeholder */}
                     <div className="w-full bg-white p-4 rounded-2xl shadow-sm border border-black/5 mb-6">
                        <h3 className="text-sm font-bold text-dark-green mb-4">Mood Activity (This Week)</h3>
                        <div className="h-32 flex items-end justify-between px-2 gap-2">
                             {[3, 4, 2, 5, 4, 3, 5].map((val, i) => (
                                 <div key={i} className="flex flex-col items-center gap-1 w-full">
                                    <motion.div 
                                        initial={{ height: 0 }}
                                        animate={{ height: `${val * 20}%` }}
                                        className="w-full bg-primary-green rounded-t-sm opacity-80"
                                    ></motion.div>
                                    <span className="text-[10px] text-neutral-dark">{["M","T","W","T","F","S","S"][i]}</span>
                                 </div>
                             ))}
                        </div>
                     </div>

                     {/* Average Mood */}
                     <div className="w-full bg-white p-4 rounded-2xl shadow-sm border border-black/5 flex items-center justify-between mb-4">
                        <div>
                            <p className="text-xs font-bold text-neutral-dark">Average Mood</p>
                            <p className="text-lg font-bold text-dark-green">{stats.averageMood}/5</p>
                        </div>
                         <div className="text-2xl">😊</div>
                     </div>
                     
                     {/* Top Activity */}
                     <div className="w-full bg-white p-4 rounded-2xl shadow-sm border border-black/5 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-neutral-dark">Top Activity</p>
                            <p className="text-lg font-bold text-dark-green">{stats.topActivity}</p>
                        </div>
                         <div className="text-2xl">🌿</div>
                     </div>

                </div>
            </motion.div>

             {/* Footer */}
             <footer className="w-full max-w-[400px] flex items-center justify-center py-4 mt-auto">
                <div className="w-32 h-32">
                    <img
                        src={footerDino.image}
                        alt="Dino Footer"
                        className="w-full h-full object-contain drop-shadow-xl"
                    />
                </div>
            </footer>
        </div>
    );
}
