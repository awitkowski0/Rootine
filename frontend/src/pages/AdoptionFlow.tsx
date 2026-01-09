import { useLocation } from "wouter";
import { useProfile } from "../hooks/useProfile";
import { useState, useMemo } from "react";
import { DINOS } from "../data/dinos";
import { motion } from "framer-motion";

export default function AdoptionFlow() {
  const [, setLocation] = useLocation();
  const { createProfile } = useProfile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDino, setSelectedDino] = useState(DINOS[0]);

  // Random footer dino (different from selection logic)
  const footerDino = useMemo(() => {
     return DINOS[Math.floor(Math.random() * DINOS.length)];
  }, []);


  const handleAdoption = async () => {
    setIsSubmitting(true);
    try {
      await createProfile(selectedDino.id);
      setLocation("/");
    } catch (error) {
      console.error("Failed to adopt:", error);
      alert("Something went wrong adopting your dino. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                    {/* Flower Image - Left Center, Rotated */}
                    <div className="absolute left-2">
                        <img
                            src="/header_flower.png"
                            alt="Flower"
                            className="w-36 h-auto transform -rotate-[-19.22deg]"
                        />
                    </div>
                    {/* Center Cutout Circle */}
                    <div className="absolute bottom-0 w-36 h-18 bg-rootine-bg border-rootine-bg border-4 rounded-t-full translate-y-[1px]"></div>
            </div>

            {/* Body */}
            <div className="bg-rootine-bg flex flex-col items-center justify-start px-4 py-8 min-h-[500px]">
                <h1 className="text-2xl font-bold text-dark-green mb-4 text-center">Dinosaur Adoption!</h1>
                <p className="text-center text-sm text-neutral-dark mb-6 px-4">
                    Click on each dinosaur to learn more about them! Your chosen companion will appear in your greenhouse.
                </p>

                {/* Dino Selection Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8 w-full">
                    {DINOS.map((dino) => (
                        <motion.button
                            key={dino.id}
                            onClick={() => setSelectedDino(dino)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                                relative p-4 rounded-2xl flex flex-col items-center justify-center transition-all
                                ${selectedDino.id === dino.id
                                    ? "bg-accent-yellow ring-4 ring-primary-green/30 shadow-lg"
                                    : "bg-white border-2 border-transparent hover:border-primary-green/50 shadow-sm"
                                }
                            `}
                        >
                            <img src={dino.image} alt={dino.name} className="w-16 h-16 object-contain mb-2" />
                            <span className={`text-xs font-bold ${selectedDino.id === dino.id ? "text-white" : "text-dark-green"}`}>
                                {dino.name}
                            </span>
                        </motion.button>
                    ))}
                </div>
                
                {/* Selected Description/Details Placeholder - "Click to learn more" implies details shown? 
                    For now, showing the selected dino's basic info summary if we had one.
                    Let's just show the Confirm Button.
                */}
                
                 <button
                    onClick={handleAdoption}
                    disabled={isSubmitting}
                    className="w-full py-4 bg-dark-green text-white rounded-xl font-bold text-lg shadow-md hover:bg-[#5b6648] transition-colors disabled:opacity-50"
                 >
                    {isSubmitting ? "Adopting..." : `Adopt ${selectedDino.name}!`}
                 </button>

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
