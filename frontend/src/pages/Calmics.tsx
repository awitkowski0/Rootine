import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { DINOS } from "../data/dinos";
import { useMemo } from "react";

// Placeholder data for Comics
const COMICS = [
    { id: 1, title: "Dino's Big Day", image: "/comic_placeholder_1.png" }, // Using placeholders, will fail to load image but structure is there
    { id: 2, title: "Sunny Disposition", image: "/comic_placeholder_2.png" },
    { id: 3, title: "Growth Mindset", image: "/comic_placeholder_3.png" },
    { id: 4, title: "Friendship", image: "/comic_placeholder_4.png" },
];

export default function Calmics() {
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
                     <h2 className="text-2xl font-bold text-dark-green mb-6 text-center w-full">Calm-ics</h2>
                     <p className="text-sm text-neutral-dark mb-6 text-center">
                        Enjoy comics created by our community!
                     </p>

                     <div className="grid grid-cols-2 gap-4 w-full">
                        {COMICS.map((comic) => (
                            <motion.div
                                key={comic.id}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white p-2 rounded-xl  border border-black/5 cursor-pointer"
                            >
                                <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center text-xs text-center text-gray-400">
                                    Comic #{comic.id}
                                </div>
                                <p className="text-xs font-bold text-dark-green text-center">{comic.title}</p>
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
