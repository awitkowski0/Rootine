import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useUser } from '@clerk/clerk-react';

export interface MoodEntry {
  id: string;
  user_id: string;
  rating: number; // 1-10
  mood_tags: string[];
  note: string;
  created_at: string;
}

export function useMoodEntries() {
  const { user } = useUser();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEntries = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching mood entries:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addEntry = async (rating: number, mood_tags: string[], note: string) => {
    if (!user) return null;
    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .insert([
          {
            user_id: user.id,
            rating,
            mood_tags,
            note,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      
      // Optimistic update or refetch
      setEntries(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error adding mood entry:', error);
      throw error;
    }
  };

  return { entries, loading, fetchEntries, addEntry };
}
