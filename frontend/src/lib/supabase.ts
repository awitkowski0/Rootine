import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase credentials. Supabase features will not work.')
}

// Prevent crash if credentials are missing
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: { message: "Missing Supabase Credentials", code: "MISSING_CREDS" } }),
          }),
        }),
        upsert: () => ({
          select: () => ({
            single: async () => ({ data: null, error: { message: "Missing Supabase Credentials", code: "MISSING_CREDS" } }),
          }),
        }),
      })
    } as any;
