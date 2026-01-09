import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { DINOS } from "../data/dinos";
import { useMemo } from "react";

export default function GreenhouseActivities() {
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
                <div className="bg-rootine-bg flex flex-col items-center justify-start px-6 py-8 h-[600px] overflow-y-auto custom-scrollbar text-center">
                     <h2 className="text-xl font-bold text-dark-green mb-1 w-full leading-tight">Greenhouse Activities</h2>
                     <p className="text-sm font-bold text-primary-green mb-6 w-full">Step-By-Step Instructed At-Home Crafts!</p>
                     
                     <div className="text-sm text-neutral-dark space-y-4">
                        <p>
                            Join our biweekly greenhouse activities! Step-by-step instructions will be provided for you to follow along and make your own craft - all from your own home! Share your creations with us, we’d love to see what you make!
                        </p>
                        <p>
                            Craft materials are sourced from your local Walmart and/or Dollar Store. We intend to keep costs low so those who wish to participate may.
                        </p>
                        <p>
                            Of course, participation is NOT mandatory. Although, we encourage you seek alternative mindful hobbies! Whether it’s simply getting outside for a nature walk, that counts!
                        </p>
                        <p className="font-bold text-dark-green pt-4">
                            Keep going, friend! We are all Rooting for You!
                        </p>
                     </div>

                     {/* Placeholder for current activity image/card */}
                     <div className="mt-8 w-full p-4 bg-white rounded-2xl  border border-black/5">
                        <div className="h-32 bg-gray-100 rounded-xl flex items-center justify-center text-gray-300">
                            Current Activity Placeholder
                        </div>
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
