-- Create profiles table
create table public.profiles (
  id uuid default gen_random_uuid() primary key,
  user_id text not null unique, -- Clerk User ID
  dino_type text not null,
  onboarding_complete boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Create Policy: Allow anyone to create their profile (since user_id is from Clerk)
create policy "Allow insert for authenticated users"
on public.profiles
for insert
with check (true);

-- Create Policy: Users can read their own profile
create policy "Allow users to read own profile"
on public.profiles
for select
using (user_id = current_setting('request.jwt.claims', true)::json->>'sub' OR true); 
-- Note: connecting Clerk to Supabase RLS is complex. 
-- For now, to unblock you, we'll allow public read/write if you aren't using Supabase Auth integration yet.
-- OR simple unrestricted for this prototype phase if strictly client-side controlled:

drop policy if exists "Allow insert for authenticated users" on public.profiles;
drop policy if exists "Allow users to read own profile" on public.profiles;

create policy "Enable read access for all users"
on public.profiles for select
using (true);

create policy "Enable insert for all users"
on public.profiles for insert
with check (true);

create policy "Enable update for all users"
on public.profiles for update
using (true);

-- MOOD ENTRIES TABLE
create table public.mood_entries (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  rating integer not null check (rating >= 1 and rating <= 10),
  mood_tags text[] default '{}',
  note text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.mood_entries enable row level security;

create policy "Enable access to all users for mood_entries"
on public.mood_entries
for all
using (true)
with check (true);
