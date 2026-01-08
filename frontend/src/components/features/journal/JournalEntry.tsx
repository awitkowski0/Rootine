import { useState } from "react";
import { useMoodEntries } from "../../../hooks/useMoodEntries";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

const MOOD_TAGS = [
  "Happy", "Excited", "Grateful", "Relaxed",
  "Tired", "Anxious", "Stressed", "Sad",
  "Angry", "Confused", "Bored", "Productive"
];

export default function JournalEntry() {
  const [, setLocation] = useLocation();
  const { addEntry } = useMoodEntries();
  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await addEntry(rating, selectedTags, note);
      setLocation("/"); // Return to dashboard
    } catch (error) {
      alert("Failed to save entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-rootine-bg p-4 flex flex-col items-center">
      <div className="w-full max-w-2xl space-y-8">
        <header>
          <Button variant="ghost" onClick={() => setLocation("/")}>← Back</Button>
          <h1 className="text-3xl font-display text-text-black mt-4">New Entry</h1>
          <p className="text-neutral-dark">How are you feeling right now?</p>
        </header>

        <Card className="space-y-8">
          {/* Rating Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
                <label className="font-bold text-lg text-text-black">Mood Rating</label>
                <span className="text-4xl font-display text-primary-green">{rating}</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={rating} 
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full h-4 bg-gray-soft rounded-full appearance-none cursor-pointer accent-primary-green"
            />
            <div className="flex justify-between text-sm text-neutral-dark">
                <span>Not Good</span>
                <span>Amazing</span>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <label className="font-bold text-lg text-text-black">Tags</label>
            <div className="flex flex-wrap gap-2">
                {MOOD_TAGS.map(tag => (
                    <motion.button
                        key={tag}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleTag(tag)}
                        className={`px-4 py-2 rounded-xl border-2 transition-colors font-medium ${
                            selectedTags.includes(tag)
                            ? "bg-primary-green border-primary-green text-white"
                            : "bg-white border-gray-soft text-text-black hover:border-primary-green"
                        }`}
                    >
                        {tag}
                    </motion.button>
                ))}
            </div>
          </div>

          {/* Note */}
          <div className="space-y-4">
            <label className="font-bold text-lg text-text-black">Journal Note</label>
            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write about your day..."
                className="w-full h-32 p-4 rounded-xl border-2 border-gray-soft focus:border-primary-green outline-none resize-none bg-white font-sans text-lg"
            />
          </div>

          <Button 
            onClick={handleSubmit} 
            className="w-full text-lg py-4 shadow-lg"
            isLoading={isSubmitting}
          >
            Save Entry
          </Button>
        </Card>
      </div>
    </div>
  );
}
