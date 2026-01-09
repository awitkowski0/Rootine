import { useUser, useClerk } from "@clerk/clerk-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, LogOut, Settings } from "lucide-react";
import { DINOS } from "../data/dinos";
import { useMemo } from "react";

export default function UserProfile() {
    const { user } = useUser();
    const { signOut } = useClerk();
    const [, setLocation] = useLocation();

    // Pick a random dino for the footer
    const randomDino = useMemo(() => {
        return DINOS[Math.floor(Math.random() * DINOS.length)];
    }, []);

    const handleSignOut = async () => {
        await signOut();
        setLocation("/login");
    };

    return (
        <div className="min-h-screen bg-dark-green flex flex-col items-center justify-center p-4 font-display relative overflow-hidden">
             {/* Main Card Container */}
             <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[402px] bg-rootine-bg rounded-[50px] overflow-hidden mb-8 z-10"
            >
                <div>
                     {/* Header */}
                    <div className="w-full h-32 bg-primary-green rounded-b-[50px] relative flex items-center justify-center shrink-0 z-20">
                         {/* Back Arrow */}
                         <button 
                            onClick={() => setLocation("/")}
                            className="absolute left-6 top-6 text-white hover:text-rootine-bg transition-colors"
                         >
                             <ArrowLeft size={32} strokeWidth={2.5} />
                         </button>

                        {/* Flower Image - Right Side now? Or Keep Left? User said "replace logo with user's profile". 
                            Home has flower on left. 
                            Let's keep the Header style consistent (Flower Left) but maybe move it slightly or just layer the Back Arrow on top?
                            User said "Back arrow top left". 
                            The flower is at `left-2`. They might overlap.
                            Let's move the flower to the right or Hide it?
                            User said "Similar to these but replace the logo with our user's profile".
                            "Top header doesn't have the right background..." checked.
                            
                            Let's put the flower on the RIGHT for profile to balance the Back Arrow on LEFT?
                            Or just keep it consistent.
                            If I put arrow at left-6, and flower is at left-2 (rotated), they will clash.
                            I'll move the flower to the right for this screen.
                        */}
                        <div className="absolute right-2 opacity-90">
                            <img
                                src="/header_flower.png"
                                alt="Flower"
                                className="w-36 h-auto transform rotate-[19.22deg]" // Flipped rotation for right side
                            />
                        </div>

                        {/* Center Cutout Circle */}
                        <div className="absolute bottom-0 w-36 h-18 bg-rootine-bg border-rootine-bg border-4 rounded-t-full translate-y-[1px]"></div>
                    </div>

                    {/* Main Body */}
                    <div className="bg-rootine-bg flex flex-col items-center justify-start px-4 py-8 min-h-[400px]">
                        {/* Avatar (Replaces Big Logo) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-32 h-32 mb-4 rounded-full border-4 border-primary-green overflow-hidden shadow-md flex items-center justify-center bg-white"
                        >
                             <img
                                src={user?.imageUrl}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        <h2 className="text-2xl font-bold text-dark-green mb-1">{user?.fullName || user?.username}</h2>
                        <p className="text-neutral-dark text-sm mb-6">@{user?.username || "user"}</p>

                        {/* Actions */}
                        <div className="flex gap-4 mb-8">
                             <button className="flex items-center gap-2 bg-dark-green text-white px-4 py-2 rounded-xl text-sm font-bold  hover:bg-[#5b6648] transition-colors">
                                <Settings size={16} />
                                Edit Account
                             </button>
                             <button 
                                onClick={handleSignOut}
                                className="flex items-center gap-2 bg-rose-red text-white px-4 py-2 rounded-xl text-sm font-bold  hover:bg-[#d13b2e] transition-colors"
                             >
                                <LogOut size={16} />
                                Log Out
                             </button>
                        </div>

                        {/* Recent Posts Placeholder */}
                        <div className="w-full text-left">
                            <h3 className="text-xl font-bold text-dark-green mb-4">Recent Posts</h3>
                            <div className="space-y-4">
                                {/* Placeholder Post 1 */}
                                <div className="bg-white p-4 rounded-2xl  border border-black/5">
                                     <div className="h-24 bg-gray-100 rounded-xl mb-2 flex items-center justify-center text-gray-300">
                                         Placeholder Image
                                     </div>
                                     <p className="text-xs text-neutral-dark">Today I felt really happy because I saw a cool bird!</p>
                                </div>
                                {/* Placeholder Post 2 */}
                                <div className="bg-white p-4 rounded-2xl  border border-black/5">
                                     <div className="h-24 bg-gray-100 rounded-xl mb-2 flex items-center justify-center text-gray-300">
                                         Placeholder Image
                                     </div>
                                     <p className="text-xs text-neutral-dark">My dino grew a new leaf today.</p>
                                </div>
                            </div>
                        </div>
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
