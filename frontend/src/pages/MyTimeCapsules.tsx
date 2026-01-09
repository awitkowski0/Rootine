import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { DINOS } from "../data/dinos";
import { useMemo } from "react";

// Mock Data for User Posts (Capsules)
const TIME_CAPSULES = [
    { id: 1, date: "2024-10-24", title: "My First Day", preview: "Today I joined Rootine and it was amazing..." },
    { id: 2, date: "2024-10-26", title: "Feeling Better", preview: "The sun was shining and I felt a sense of calm..." },
    { id: 3, date: "2024-11-02", title: "Greenhouse Update", preview: "My dino seems happy today! We did some crafts..." },
];

export default function MyTimeCapsules() {
    const [, setLocation] = useLocation();
    
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
                <div className="w-full h-32 bg-primary-green rounded-b-[50px] relative flex items-center justify-center shrink-0  z-20">
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
                     <h2 className="text-2xl font-bold text-dark-green mb-6 text-center w-full">My Time Capsules</h2>
                     
                     <div className="w-full space-y-4">
                        {TIME_CAPSULES.map((capsule) => (
                            <motion.div
                                key={capsule.id}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white p-4 rounded-2xl  border border-black/5 cursor-pointer hover:border-primary-green/30 transition-colors"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-dark-green text-lg">{capsule.title}</h3>
                                    <span className="text-xs text-neutral-dark bg-gray-100 px-2 py-1 rounded-full">{capsule.date}</span>
                                </div>
                                <p className="text-sm text-neutral-dark line-clamp-2">{capsule.preview}</p>
                            </motion.div>
                        ))}
                     </div>
                     
                     {/* Placeholder for 'No Capsules' state if array is empty */}
                     {TIME_CAPSULES.length === 0 && (
                         <div className="text-center py-10 opacity-50">
                             <p>No time capsules yet. Start journaling!</p>
                         </div>
                     )}

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
