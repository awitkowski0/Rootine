import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useUser } from '@clerk/clerk-react';

export interface Profile {
  id: string; // matches clerk user.id
  dino_type: string;
  onboarding_complete: boolean;
  created_at?: string;
}

export function useProfile() {
  const { user } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchProfile() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id) // Corrected: user.id might be undefined in TS check if not guarded, but useEffect checks user
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
          console.error('Error fetching profile:', error);
        }

        if (data) {
          setProfile(data);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  const createProfile = async (dinoType: string) => {
    if (!user) return null;

    const newProfile = {
      user_id: user.id,
      dino_type: dinoType,
      onboarding_complete: true,
    };

    const { data, error } = await supabase
      .from('profiles')
      .upsert(newProfile) // upsert to be safe
      .select()
      .single();

    if (error) {
      console.error('Error creating profile:', error);
      throw error;
    }

    setProfile(data);
    return data;
  };

  return { profile, loading, createProfile };
}
