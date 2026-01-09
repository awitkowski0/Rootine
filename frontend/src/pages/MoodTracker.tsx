import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { DINOS } from "../data/dinos";

export default function MoodTracker() {
    const [, setLocation] = useLocation();
    
    // Form States
    const [dayDescription, setDayDescription] = useState("");
    const [moodRank, setMoodRank] = useState(3); // 1-5
    const [activities, setActivities] = useState<string[]>([]);
    const [sleepHours, setSleepHours] = useState("");
    const [highlight, setHighlight] = useState("");
    const [overallRank, setOverallRank] = useState(3); // 1-5

    const footerDino = useMemo(() => {
        return DINOS[Math.floor(Math.random() * DINOS.length)];
    }, []);

    const toggleActivity = (activity: string) => {
        if (activities.includes(activity)) {
            setActivities(activities.filter(a => a !== activity));
        } else {
            setActivities([...activities, activity]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            dayDescription,
            moodRank,
            activities,
            sleepHours,
            highlight,
            overallRank
        });
        alert("Mood tracked! (This would save to backend)");
        setLocation("/"); // Return home after submit
    };

    return (
        <div className="min-h-screen bg-dark-green flex flex-col items-center justify-center p-4 font-display relative overflow-hidden">
             {/* Main Card Container */}
             <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[402px] bg-rootine-bg rounded-[50px] overflow-hidden mb-8 z-10"
            >
                {/* Header */}
                <div className="w-full h-32 bg-primary-green rounded-b-[50px] relative flex items-center justify-center shrink-0 z-20">
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

                {/* Body (Scrollable for form) */}
                <div className="bg-rootine-bg flex flex-col items-center justify-start px-4 py-8 h-[600px] overflow-y-auto custom-scrollbar">
                    <h2 className="text-2xl font-bold text-dark-green mb-6 text-center">Mood Tracker</h2>
                    
                    <form onSubmit={handleSubmit} className="w-full space-y-6">
                        {/* Tell us about your day */}
                        <div className="space-y-2">
                             <label className="block text-sm font-bold text-dark-green">Tell us about your day!</label>
                             <textarea 
                                value={dayDescription}
                                onChange={(e) => setDayDescription(e.target.value)}
                                className="w-full p-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-green min-h-[80px]"
                                placeholder="Today was..."
                             />
                        </div>

                         {/* Rank your mood */}
                         <div className="space-y-2">
                             <label className="block text-sm font-bold text-dark-green">Rank your mood:</label>
                             <div className="flex justify-between px-2">
                                {[1, 2, 3, 4, 5].map((val) => (
                                    <button
                                        key={val}
                                        type="button"
                                        onClick={() => setMoodRank(val)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors border-2 
                                            ${moodRank === val 
                                                ? "bg-accent-yellow text-white border-accent-yellow" 
                                                : "bg-white text-dark-green border-gray-200"}`}
                                    >
                                        {val}
                                    </button>
                                ))}
                             </div>
                        </div>

                        {/* What did you do today */}
                        <div className="space-y-2">
                             <label className="block text-sm font-bold text-dark-green">What did you do today?</label>
                             <div className="grid grid-cols-2 gap-2">
                                {["Exercise", "Meditation", "Hobbies", "Socializing", "Getting Outside", "Other"].map((act) => (
                                    <button
                                        key={act}
                                        type="button"
                                        onClick={() => toggleActivity(act)}
                                        className={`p-2 rounded-xl text-xs font-bold transition-colors border-2
                                            ${activities.includes(act)
                                                ? "bg-dark-green text-white border-dark-green"
                                                : "bg-white text-dark-green border-gray-200"}`}
                                    >
                                        {act}
                                    </button>
                                ))}
                             </div>
                        </div>

                        {/* Sleep Hours */}
                        <div className="space-y-2">
                             <label className="block text-sm font-bold text-dark-green">How many hours did you sleep?</label>
                             <select
                                value={sleepHours}
                                onChange={(e) => setSleepHours(e.target.value)}
                                className="w-full p-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-green"
                             >
                                 <option value="" disabled>Select hours...</option>
                                 <option value="1-4">1-4 Hours</option>
                                 <option value="4-7">4-7 Hours</option>
                                 <option value="7-9">7-9 Hours</option>
                                 <option value="9+">9+ Hours</option>
                             </select>
                        </div>
                        
                        {/* Highlight of day */}
                        <div className="space-y-2">
                             <label className="block text-sm font-bold text-dark-green">Tell us about the highlight of your day!</label>
                             <input 
                                type="text"
                                value={highlight}
                                onChange={(e) => setHighlight(e.target.value)}
                                className="w-full p-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-green"
                                placeholder="My highlight was..."
                             />
                        </div>

                        {/* Rank today overall */}
                         <div className="space-y-2">
                             <label className="block text-sm font-bold text-dark-green">Rank today, overall!</label>
                             <div className="flex justify-between px-2">
                                {[1, 2, 3, 4, 5].map((val) => (
                                    <button
                                        key={val}
                                        type="button"
                                        onClick={() => setOverallRank(val)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors border-2 
                                            ${overallRank === val 
                                                ? "bg-accent-yellow text-white border-accent-yellow" 
                                                : "bg-white text-dark-green border-gray-200"}`}
                                    >
                                        {val}
                                    </button>
                                ))}
                             </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full py-3 bg-dark-green text-white rounded-xl font-bold shadow-md hover:bg-[#5b6648] transition-colors"
                        >
                            Save Entry
                        </button>
                    </form>
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
