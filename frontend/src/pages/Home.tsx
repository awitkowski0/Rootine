import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { DINOS } from "../data/dinos";

const MENU_ITEMS = [
    "User Profile",
    "Digital Journal",
    "Mood Tracker",
    "My Stats",
    "My Time Capsules",
    "Greenhouse Activities",
    "My Greenhouse",
    "Calm-ics",
    "Friends",
    "Blog",
    "Discord Server",
    "Resources",
    "About Us"
];

export default function Home() {
    const [, setLocation] = useLocation();
    const [selectedItem, setSelectedItem] = useState("User Profile");

    // Pick a random dino for the footer
    const randomDino = useMemo(() => {
        return DINOS[Math.floor(Math.random() * DINOS.length)];
    }, []);

    return (
        <div className="min-h-screen bg-dark-green flex flex-col items-center justify-center p-4 font-display relative">
            {/* Main Card Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[402px] bg-rootine-bg rounded-[50px] shadow-2xl overflow-hidden mb-8 z-10"
            >
                {/* Header */}
                <div className="w-full h-32 bg-primary-green rounded-b-[50px] relative flex items-center justify-center shrink-0 z-20">
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

                {/* Main Body */}
                <div className="bg-rootine-bg flex flex-col items-center justify-start px-2 py-8 min-h-[400px]">
                        {/* Big Logo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-128 h-128 md:w-64 md:h-64 flex items-center justify-center"
                        >
                            <img
                                src="/rootine_logo_no_background.png"
                                alt="Rootine Logo"
                                className="w-full h-full object-contain drop-shadow-md"
                            />
                        </motion.div>

                        {/* Menu Buttons Grid */}
                        <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {MENU_ITEMS.map((item) => (
                                <motion.button
                                    key={item}
                                    onHoverStart={() => setSelectedItem(item)}
                                    whileHover={{ scale: 1.0 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`
                                py-4 px-6 rounded-2xl text-lg font-bold shadow-md transition-colors 
                                ${selectedItem === item
                                            ? "bg-accent-yellow text-white ring-2 ring-white/50"
                                            : "bg-dark-green text-white hover:bg-[#5b6648]"}
                            `}
                                    onClick={() => {}}
                                >
                                    {item}
                                </motion.button>
                            ))}
                        </div>
                    </div>
            </motion.div>

            {/* Footer */}
            <footer className="w-full max-w-[400px] flex items-center justify-center py-4 mt-auto">
                <div className="w-32 h-32">
                    <img
                        src={randomDino.image}
                        alt="Dino Footer"
                        className="w-full h-full object-contain drop-shadow-xl"
                    />
                </div>
            </footer>
        </div>
    );
}
