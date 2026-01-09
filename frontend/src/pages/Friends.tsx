import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Search, UserPlus, UserMinus } from "lucide-react";
import { DINOS } from "../data/dinos";

export default function Friends() {
    const [, setLocation] = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    
    // Mock Friends Data
    const [friends] = useState([
        { id: 1, username: "DinoLover123", name: "Sarah", avatar: "/avatar_placeholder_1.png", isFriend: true },
        { id: 2, username: "GreenThumb", name: "Mike", avatar: "/avatar_placeholder_2.png", isFriend: true },
        { id: 3, username: "ZenMaster", name: "Alex", avatar: "/avatar_placeholder_3.png", isFriend: false }, // Not friend yet (for search demo)
    ]);

    const footerDino = useMemo(() => {
        return DINOS[Math.floor(Math.random() * DINOS.length)];
    }, []);

    const filteredFriends = friends.filter(f => 
        f.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
        f.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                     <h2 className="text-2xl font-bold text-dark-green mb-6 text-center w-full">Friends</h2>

                     {/* Search Bar */}
                     <div className="w-full relative mb-6">
                        <input
                            type="text"
                            placeholder="Find friends by username..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-green"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                     </div>

                     {/* List */}
                     <div className="w-full space-y-3">
                        {filteredFriends.length > 0 ? (
                            filteredFriends.map((person) => (
                                <motion.div
                                    key={person.id}
                                    layout
                                    className="bg-white p-3 rounded-xl shadow-sm border border-black/5 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div> {/* Placeholder Avatar */}
                                        <div>
                                            <p className="text-sm font-bold text-dark-green">{person.name}</p>
                                            <p className="text-xs text-neutral-dark">@{person.username}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <button 
                                        className={`p-2 rounded-full transition-colors ${person.isFriend 
                                            ? "text-rose-red hover:bg-rose-red/10" 
                                            : "text-primary-green hover:bg-primary-green/10"}`}
                                    >
                                        {person.isFriend ? <UserMinus size={18} /> : <UserPlus size={18} />}
                                    </button>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-center text-sm text-neutral-dark mt-4">No friends found.</p>
                        )}
                     </div>

                     {/* Friend Feed Placeholder */}
                     <div className="mt-8 w-full">
                        <h3 className="text-lg font-bold text-dark-green mb-4">Friend Activity</h3>
                        <div className="bg-white/50 p-4 rounded-xl text-center text-sm text-neutral-dark border-2 border-dashed border-gray-300">
                            See your friends' mood boards here soon!
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
