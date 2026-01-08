import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { DINOS } from "../../../data/dinos";

interface VenusProps {
  onConfirm: (dinoId: string) => void;
}

export function Venus({ onConfirm }: VenusProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentDino = DINOS[selectedIndex];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % DINOS.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + DINOS.length) % DINOS.length);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 p-6">
      {/* Left: Dino Display */}
      <div className="flex-1 relative flex justify-center items-center h-[400px] w-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentDino.id}
            src={currentDino.image}
            alt={currentDino.name}
            initial={{ y: 50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-full object-contain drop-shadow-2xl z-10"
            style={{ maxHeight: "350px" }}
          />
        </AnimatePresence>
        
        {/* Background Blob */}
        <motion.div 
           layoutId="dino-blob"
           className={`absolute w-64 h-64 rounded-full opacity-20 blur-3xl ${currentDino.color}`}
           transition={{ duration: 0.5 }}
        />
      </div>

      {/* Right: Info & Controls */}
      <div className="flex-1 w-full space-y-8">
        <div className="text-center md:text-left space-y-2">
            <h2 className="text-5xl font-display text-text-black">{currentDino.name}</h2>
            <p className="text-xl text-neutral-dark font-medium">{currentDino.type}</p>
        </div>

        <Card variant="glass" className="p-6">
            <p className="text-neutral-dark mb-6 text-lg">
                {currentDino.description}
            </p>
            
            <div className="flex items-center justify-between gap-4">
                <Button variant="outline" onClick={handlePrev}>
                    ←
                </Button>
                
                <div className="flex gap-2">
                   {DINOS.map((dino, idx) => (
                       <div 
                         key={dino.id}
                         className={`w-3 h-3 rounded-full transition-colors ${idx === selectedIndex ? 'bg-text-black' : 'bg-gray-soft'}`}
                       />
                   ))}
                </div>

                <Button variant="outline" onClick={handleNext}>
                    →
                </Button>
            </div>
        </Card>

        <Button 
            className="w-full text-xl py-4" 
            onClick={() => onConfirm(currentDino.name)}
        >
            Adopt {currentDino.name}
        </Button>
      </div>
    </div>
  );
}
