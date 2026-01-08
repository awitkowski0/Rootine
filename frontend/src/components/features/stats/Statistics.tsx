import { useEffect } from "react";
import { useMoodEntries } from "../../../hooks/useMoodEntries";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { useLocation } from "wouter";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

export default function Statistics() {
  const [, setLocation] = useLocation();
  const { entries, fetchEntries, loading } = useMoodEntries();

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  // Transform data for chart
  const chartData = [...entries].reverse().map(entry => ({
    date: format(new Date(entry.created_at), 'MMM d'),
    rating: entry.rating,
  }));

  const averageMood = entries.length > 0
    ? (entries.reduce((acc, curr) => acc + curr.rating, 0) / entries.length).toFixed(1)
    : "N/A";

  return (
    <div className="min-h-screen bg-rootine-bg p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-8">
        <header className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-3xl font-display text-text-black">Mood Statistics</h1>
            <p className="text-neutral-dark">Your emotional journey</p>
          </div>
          <Button onClick={() => setLocation("/")}>Dashboard</Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Summary Cards */}
            <Card className="text-center p-8 space-y-2 bg-white/60">
                <h3 className="text-lg font-bold text-neutral-dark">Total Entries</h3>
                <p className="text-4xl font-display text-primary-green">{entries.length}</p>
            </Card>
            <Card className="text-center p-8 space-y-2 bg-white/60">
                <h3 className="text-lg font-bold text-neutral-dark">Average Mood</h3>
                <p className="text-4xl font-display text-accent-yellow">{averageMood}</p>
            </Card>
            <Card className="text-center p-8 space-y-2 bg-white/60">
                <h3 className="text-lg font-bold text-neutral-dark">Streak</h3>
                <p className="text-4xl font-display text-text-black">3 Days</p> 
                {/* Streak logic would go here */}
            </Card>
        </div>

        {/* Main Chart */}
        <Card className="p-8 h-[400px]">
            <h3 className="text-xl font-bold text-text-black mb-6">Mood History</h3>
            {loading ? (
                <div className="h-full flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin" />
                </div>
            ) : entries.length > 0 ? (
                <ResponsiveContainer width="100%" height="85%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                        <XAxis 
                            dataKey="date" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#828282', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis 
                            domain={[0, 10]} 
                            ticks={[1, 5, 10]}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#828282', fontSize: 12 }}
                        />
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="rating" 
                            stroke="#ACBD8D" 
                            strokeWidth={4}
                            dot={{ fill: '#ACBD8D', strokeWidth: 2, r: 6, stroke: '#fff' }}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-neutral-dark opacity-60">
                    <p>No entries yet</p>
                    <Button variant="ghost" size="sm" onClick={() => setLocation("/journal/new")}>
                        Add your first entry
                    </Button>
                </div>
            )}
        </Card>
      </div>
    </div>
  );
}
