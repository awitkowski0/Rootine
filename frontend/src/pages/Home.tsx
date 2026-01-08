import { UserButton, useUser } from "@clerk/clerk-react";
import { useLocation } from "wouter";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { motion } from "framer-motion";

export default function Home() {
  const { user } = useUser();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-rootine-bg p-8">
      <header className="flex justify-between items-center mb-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-display text-text-black">Rootine</h1>
        <UserButton />
      </header>
      
      <main className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2 mb-12">
            <h2 className="text-4xl font-bold text-dark-green">Welcome back, {user?.firstName}!</h2>
            <p className="text-neutral-dark text-lg">Your dino is happy to see you.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Journal Card */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card 
                    className="p-8 h-64 flex flex-col justify-between cursor-pointer border-primary-green/20 hover:border-primary-green transition-colors"
                    onClick={() => setLocation("/journal/new")}
                >
                    <div className="space-y-4">
                        <span className="text-4xl">📝</span>
                        <h3 className="text-2xl font-display text-text-black">Daily Journal</h3>
                        <p className="text-neutral-dark">Log your mood and thoughts for the day.</p>
                    </div>
                    <Button className="w-full">New Entry</Button>
                </Card>
            </motion.div>

            {/* Stats Card */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card 
                    className="p-8 h-64 flex flex-col justify-between cursor-pointer border-primary-green/20 hover:border-primary-green transition-colors"
                    onClick={() => setLocation("/stats")}
                >
                    <div className="space-y-4">
                        <span className="text-4xl">📊</span>
                        <h3 className="text-2xl font-display text-text-black">Statistics</h3>
                        <p className="text-neutral-dark">View your mood trends and insights.</p>
                    </div>
                    <Button variant="outline" className="w-full">View History</Button>
                </Card>
            </motion.div>
        </div>
      </main>
    </div>
  );
}
