import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Type, Image as ImageIcon, Save } from "lucide-react";
import { DINOS } from "../data/dinos";
import { useMemo, useState, useRef } from "react";

// Types for draggable items
type JournalItem = {
    id: string;
    type: 'text' | 'image';
    content: string;
    x: number;
    y: number;
};

export default function NewJournalEntry() {
    const [, setLocation] = useLocation();
    const constraintsRef = useRef(null);
    const [title, setTitle] = useState("Title");
    const [items, setItems] = useState<JournalItem[]>([]);

    const footerDino = useMemo(() => {
        return DINOS[Math.floor(Math.random() * DINOS.length)];
    }, []);

    const addText = () => {
        const newItem: JournalItem = {
            id: Date.now().toString(),
            type: 'text',
            content: "Double tap to edit",
            x: 50,
            y: 50
        };
        setItems([...items, newItem]);
    };

    const addImage = () => {
         // In a real app, this would trigger a file picker.
         // For now, we add a placeholder image sticker.
         const newItem: JournalItem = {
            id: Date.now().toString(),
            type: 'image',
            content: "/header_flower.png", // Using existing asset as placeholder
            x: 100,
            y: 100
        };
        setItems([...items, newItem]);
    };

    const handleSave = () => {
        alert("Journal entry saved!");
        setLocation("/journal");
    };

    return (
        <div className="min-h-screen bg-dark-green flex flex-col items-center justify-center p-4 font-display relative overflow-hidden">
             {/* Main Card Container */}
             <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[402px] bg-rootine-bg rounded-[50px] shadow-2xl overflow-hidden mb-8 z-10 flex flex-col h-[800px]"
            >
                {/* Header */}
                <div className="w-full h-32 bg-primary-green rounded-b-[50px] relative flex items-center justify-center shrink-0  z-20">
                     <button 
                        onClick={() => setLocation("/journal")}
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

                {/* Body Content - Canvas Area */}
                <div className="flex-1 bg-rootine-bg flex flex-col relative overflow-hidden">
                     {/* Toolbar */}
                     <div className="px-6 py-4 flex items-center justify-between z-30">
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value.substring(0, 30))} // Limit 30 chars
                            className="text-2xl font-bold text-dark-green bg-transparent border-b border-transparent focus:border-primary-green focus:outline-none w-2/3"
                            placeholder="Title..."
                        />
                        <div className="flex gap-2">
                             <button onClick={addText} className="p-2 bg-white rounded-full  text-dark-green hover:bg-gray-50"><Type size={20} /></button>
                             <button onClick={addImage} className="p-2 bg-white rounded-full  text-dark-green hover:bg-gray-50"><ImageIcon size={20} /></button>
                             <button onClick={handleSave} className="p-2 bg-primary-green rounded-full  text-white hover:bg-[#5b6648]"><Save size={20} /></button>
                        </div>
                     </div>
                     
                     <p className="text-[10px] text-center text-neutral-dark opacity-50 mb-2">
                        Drag items to arrange! Max 30 chars for title.
                     </p>

                     {/* Canvas */}
                     <div 
                        ref={constraintsRef} 
                        className="flex-1 m-4 bg-white rounded-3xl shadow-inner relative overflow-hidden border-2 border-dashed border-gray-200"
                     >
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                            <p className="text-4xl font-bold text-gray-300 -rotate-12">Canvas</p>
                        </div>

                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                drag
                                dragConstraints={constraintsRef}
                                dragMomentum={false}
                                initial={{ x: item.x, y: item.y, scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute cursor-move"
                            >
                                {item.type === 'text' ? (
                                    <div 
                                        className="bg-transparent min-w-[100px] p-2 border border-transparent hover:border-blue-300 rounded"
                                        contentEditable
                                        suppressContentEditableWarning
                                    >
                                        {item.content}
                                    </div>
                                ) : (
                                    <img 
                                        src={item.content} 
                                        alt="sticker" 
                                        className="w-24 h-auto drop-shadow-md pointer-events-none" 
                                    />
                                )}
                            </motion.div>
                        ))}
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
