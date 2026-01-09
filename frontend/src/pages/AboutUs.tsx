import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { DINOS } from "../data/dinos";
import { useMemo } from "react";

export default function AboutUs() {
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
                <div className="bg-rootine-bg flex flex-col items-start justify-start px-6 py-8 h-[600px] overflow-y-auto custom-scrollbar text-left text-dark-green">
                     <h2 className="text-2xl font-bold text-center w-full mb-6">About Us</h2>
                     
                     {/* Alex Section */}
                     <div className="mb-6">
                        <h3 className="text-xl font-bold">Alex ("FunAlex")</h3>
                        <p className="text-xs font-bold text-primary-green mb-1">Coder, Programmer</p>
                        <p className="text-sm">
                            Coded and programmed all aspects of Rootine. Recruited to help make Rootine a reality. Introduced the platform "Figma" to Em for them to make the application a reality. Develops various projects.
                        </p>
                     </div>

                     {/* Em Section */}
                     <div className="mb-6">
                        <h3 className="text-xl font-bold">Em ("x3mG3m")</h3>
                        <p className="text-xs font-bold text-primary-green mb-1">Graphic designer, Writer</p>
                        <p className="text-sm">
                            Developed the idea for Rootine as a secondary platform for her project, Rooting for You! Designed all visual graphics for the app and decided on the intended features. Originally started R4U as a project hosted over Discord, but decided it would thrive and flourish as a mobile application.
                        </p>
                     </div>

                     <p className="text-xs italic text-center w-full mb-8">
                        **Rootine was made by two passionate individuals, NOT professionals.
                     </p>

                     {/* Discord Section */}
                     <div className="bg-white p-4 rounded-2xl shadow-sm border border-black/5 text-center">
                        <h3 className="font-bold text-lg mb-1">The discord server with</h3>
                        <h2 className="font-bold text-xl text-primary-green mb-2">Rooting for You!</h2>
                        
                        <p className="text-sm font-bold mb-1">Wellness Committee</p>
                        <p className="text-sm font-bold mb-4">Community</p>
                        
                        <h3 className="font-bold text-lg mb-2">Discord Server!</h3>
                        <p className="text-xs mb-4">
                            A rapidly growing server for peer support, events, and much more!
                        </p>
                        
                        <p className="font-bold text-sm mb-4">Join now! We’re all Rooting for You!</p>
                        
                        <a 
                            href="https://discord.gg/pxunB48MDA" 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-block w-full py-3 bg-accent-yellow text-white rounded-xl font-bold hover:bg-[#e6c200] transition-colors"
                        >
                            Join Discord
                        </a>
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
