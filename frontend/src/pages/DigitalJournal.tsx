import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Plus } from "lucide-react";
import { DINOS } from "../data/dinos";
import { useMemo } from "react";
import { useUser } from "@clerk/clerk-react";

// Mock Journal Entries
const ENTRIES = [
    { id: 1, date: "Oct 24", title: "My First Entry", preview: "Dear Diary, today I..." },
    { id: 2, date: "Oct 26", title: "Feeling Great", preview: "The sun is shining..." },
    { id: 3, date: "Nov 02", title: "A New Friend", preview: "I met someone today..." },
];

export default function DigitalJournal() {
    const [, setLocation] = useLocation();
    const { user } = useUser();
    
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
                     <h2 className="text-2xl font-bold text-dark-green mb-1 text-center w-full">
                        {user?.username ? `${user.username}'s Journal` : "My Journal"}
                     </h2>
                     <p className="text-xs text-neutral-dark mb-6">View my journal</p>

                     {/* New Page Button */}
                     <button 
                        onClick={() => setLocation("/journal/new")}
                        className="w-full py-4 mb-6 bg-accent-yellow text-white rounded-2xl font-bold shadow-md hover:bg-[#e6c200] transition-colors flex items-center justify-center gap-2"
                     >
                        <Plus size={24} />
                        New Journal Page
                     </button>
                     
                     {/* Entries Grid */}
                     <div className="w-full grid grid-cols-2 gap-4">
                        {ENTRIES.map((entry) => (
                            <motion.div
                                key={entry.id}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white p-4 rounded-2xl shadow-sm border border-black/5 aspect-[3/4] flex flex-col relative overflow-hidden cursor-pointer hover:border-primary-green/30"
                            >
                                <div className="absolute top-0 left-0 w-full h-2 bg-primary-green/20"></div>
                                <h3 className="font-bold text-dark-green text-sm mb-1 mt-2 line-clamp-1">{entry.title}</h3>
                                <p className="text-xs text-neutral-dark mb-2">{entry.date}</p>
                                <p className="text-[10px] text-gray-400 line-clamp-4 leading-relaxed">
                                    {entry.preview}
                                </p>
                            </motion.div>
                        ))}
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
