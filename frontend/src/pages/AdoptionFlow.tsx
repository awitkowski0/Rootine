import { useLocation } from "wouter";
import { Venus } from "../components/features/onboarding/Venus";
import { useProfile } from "../hooks/useProfile";
import { useState } from "react";

export default function AdoptionFlow() {
  const [, setLocation] = useLocation();
  const { createProfile } = useProfile();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdoption = async (dinoName: string) => {
    setIsSubmitting(true);
    try {
      await createProfile(dinoName);
      setLocation("/");
    } catch (error) {
      console.error("Failed to adopt:", error);
      // Ideally show a toast here
      alert("Something went wrong adopting your dino. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-rootine-bg flex flex-col items-center justify-center p-4">
       <Venus onConfirm={handleAdoption} />
       
       {isSubmitting && (
         <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4">
                <div className="w-6 h-6 border-4 border-primary-green border-t-transparent rounded-full animate-spin" />
                <p className="font-display text-lg">Adopting your new friend...</p>
            </div>
         </div>
       )}
    </div>
  );
}
