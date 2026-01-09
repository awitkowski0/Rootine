import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useProfile } from "../hooks/useProfile";
import { DINOS } from "../data/dinos";
import { useMemo } from "react";

export default function MyGreenhouse() {
    const [, setLocation] = useLocation();
    const { profile } = useProfile();
    
    // Find user's dino
    const myDino = useMemo(() => {
        if (!profile?.dinoId) return null;
        return DINOS.find(d => d.id === profile.dinoId) || DINOS[0];
    }, [profile]);
    
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
                        className="absolute left-6 top-6 text-white hover:text-rootine-bg transition-colors z-30"
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
                <div className="bg-rootine-bg flex flex-col items-center justify-start px-6 py-8 min-h-[400px]">
                     <h2 className="text-2xl font-bold text-dark-green mb-2 text-center w-full">My Greenhouse</h2>
                     <p className="text-sm text-neutral-dark mb-8 text-center">
                        Here is your dino companion!
                     </p>
                     
                     {myDino ? (
                        <div className="flex flex-col items-center">
                            <motion.div 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="w-48 h-48 mb-4 relative"
                            >
                                <div className="absolute inset-0 bg-primary-green/20 rounded-full blur-2xl animate-pulse"></div>
                                <img 
                                    src={myDino.image} 
                                    alt={myDino.name} 
                                    className="w-full h-full object-contain relative z-10 drop-shadow-md" 
                                />
                            </motion.div>
                            <h3 className="text-xl font-bold text-dark-green">{myDino.name}</h3>
                            <div className="mt-4 px-4 py-2 bg-white rounded-xl shadow-sm text-center">
                                <p className="text-xs text-neutral-dark">Happiness Level</p>
                                <div className="flex gap-1 justify-center mt-1">
                                    {[1,2,3,4,5].map(i => (
                                        <div key={i} className={`w-2 h-2 rounded-full ${i <= 4 ? "bg-accent-yellow" : "bg-gray-200"}`}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                     ) : (
                         <div className="text-center py-10">
                             <p className="text-neutral-dark mb-4">You haven't adopted a dino yet!</p>
                             <button 
                                onClick={() => setLocation("/onboarding")}
                                className="px-6 py-2 bg-primary-green text-white rounded-xl font-bold hover:bg-[#5b6648]"
                            >
                                Adopt Now
                            </button>
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
