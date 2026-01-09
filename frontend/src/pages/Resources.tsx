import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { DINOS } from "../data/dinos";
import { useMemo } from "react";

export default function Resources() {
    const [, setLocation] = useLocation();
    
    const footerDino = useMemo(() => {
        return DINOS[Math.floor(Math.random() * DINOS.length)];
    }, []);

    const ResourceSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <div className="mb-6">
            <h3 className="text-lg font-bold text-dark-green mb-2">{title}</h3>
            <div className="text-sm text-neutral-dark space-y-1">
                {children}
            </div>
        </div>
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
                <div className="bg-rootine-bg flex flex-col items-start justify-start px-6 py-8 h-[600px] overflow-y-auto custom-scrollbar text-left">
                     <h2 className="text-2xl font-bold text-dark-green mb-2 text-center w-full">Mental Health Resources</h2>
                     <p className="text-xs text-neutral-dark mb-6 text-center w-full">
                        We've collected a plethora of resources should you not feel comfortable utilizing ⁠🍃•venting or ⁠🌺•disorder-specific-discussions!
                     </p>

                    <ResourceSection title="National Phone Help Lines">
                        <a href="http://suicideprevention.wikia.com/wiki/National_Help_Lines" target="_blank" rel="noreferrer" className="text-primary-green hover:underline">
                            Wiki: National Help Lines
                        </a>
                    </ResourceSection>

                    <ResourceSection title="Kid's Help Phone (Canada)">
                        <p>Call <a href="tel:1-800-668-6868" className="text-primary-green font-bold">1-800-668-6868</a></p>
                        <p>Text <span className="font-bold">CONNECT</span> to 686868</p>
                    </ResourceSection>

                    <ResourceSection title="NEDIC (Canada)">
                        <p>National Eating Disorder Information Centre</p>
                        <a href="https://nedic.ca/" target="_blank" rel="noreferrer" className="text-primary-green hover:underline">https://nedic.ca/</a>
                    </ResourceSection>

                    <ResourceSection title="CMHA">
                         <p>Canadian Mental Health Association</p>
                         <a href="https://cmha.ca/" target="_blank" rel="noreferrer" className="text-primary-green hover:underline">https://cmha.ca/</a>
                    </ResourceSection>
                    
                    <ResourceSection title="Canada’s Suicide Crisis Line">
                        <p>Call <a href="tel:988" className="text-primary-green font-bold">988</a></p>
                        <p className="text-rose-red font-bold mt-1">In a moment of crisis, call 911.</p>
                    </ResourceSection>

                    <ResourceSection title="Crisis Text Lines">
                        <p><span className="font-bold">America:</span> Text HOME to 741741 <a href="http://crisistextline.org/" className="text-primary-green">Link</a></p>
                        <p><span className="font-bold">Canada:</span> <a href="http://crisistextline.ca/" className="text-primary-green">crisistextline.ca</a></p>
                        <p><span className="font-bold">UK:</span> Text SHOUT to 85258 <a href="http://crisistextline.uk/" className="text-primary-green">Link</a></p>
                    </ResourceSection>

                    <ResourceSection title="Online Chat Help Lines">
                        <a href="http://suicideprevention.wikia.com/wiki/Online" className="text-primary-green hover:underline">View International Chat Lines</a>
                    </ResourceSection>

                    <ResourceSection title="LGBTQIA2+ Help Lines">
                        <ul className="list-disc pl-4 space-y-1">
                            <li><a href="https://www.thetrevorproject.org/" className="text-primary-green hover:underline">The Trevor Project</a></li>
                            <li>TrevorLifeLine: <a href="tel:1-866-488-7386" className="font-bold">1-866-488-7386</a></li>
                            <li>Trevor Text: Text START to 678678</li>
                            <li><a href="https://www.translifeline.org/" className="text-primary-green hover:underline">Trans Lifeline</a></li>
                        </ul>
                    </ResourceSection>

                    <ResourceSection title="Resources by Country">
                          <a href="http://suicideprevention.wikia.com/wiki/International" className="block text-primary-green hover:underline mb-1">International Directory</a>
                          <a href="http://www.yourlifecounts.org/need-help/crisis-lines" className="block text-primary-green hover:underline">Your Life Counts</a>
                    </ResourceSection>

                    <ResourceSection title="Discord Community">
                        <a href="https://discord.gg/pxunB48MDA" target="_blank" rel="noreferrer" className="inline-block bg-accent-yellow text-white py-2 px-4 rounded-xl font-bold hover:scale-105 transition-transform">
                            Join our Discord Server
                        </a>
                    </ResourceSection>

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
