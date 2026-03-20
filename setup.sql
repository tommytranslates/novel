-- ════════════════════════════════════════
--  NovelNest — Supabase Database Setup
--  Paste this into Supabase → SQL Editor → New query → Run
-- ════════════════════════════════════════

-- 1. Create the novels table
create table public.novels (
  id          uuid    default gen_random_uuid() primary key,
  title       text    not null,
  author      text    not null,
  description text    default '',
  cover_url   text    default '',
  genre       text    default 'General',
  status      text    default 'ongoing',   -- 'ongoing' or 'completed'
  created_at  timestamptz default timezone('utc', now())
);

-- 2. Create the chapters table
create table public.chapters (
  id             uuid    default gen_random_uuid() primary key,
  novel_id       uuid    not null references public.novels(id) on delete cascade,
  chapter_number integer not null,
  title          text    not null,
  content        text    not null default '',
  created_at     timestamptz default timezone('utc', now()),
  unique (novel_id, chapter_number)
);

-- 3. Enable Row Level Security (RLS) — keeps data safe
alter table public.novels   enable row level security;
alter table public.chapters enable row level security;

-- 4. Allow anyone to read novels and chapters (public site)
create policy "Public can read novels"
  on public.novels for select using (true);

create policy "Public can read chapters"
  on public.chapters for select using (true);

-- ════════════════════════════════════════
--  Optional: Insert a sample novel to test
-- ════════════════════════════════════════

insert into public.novels (title, author, description, genre, status)
values (
  'The Lost Kingdom',
  'Your Name',
  'A young scholar discovers an ancient map that leads her to a forgotten kingdom buried beneath the sea. What she finds there will change history forever.',
  'Fantasy',
  'ongoing'
);

-- After inserting the novel, grab its ID from the novels table
-- and replace 'PASTE-NOVEL-ID-HERE' below with it to add a sample chapter.

-- insert into public.chapters (novel_id, chapter_number, title, content)
-- values (
--   'PASTE-NOVEL-ID-HERE',
--   1,
--   'The Map',
--   'It was a rainy Tuesday when Aria found the map tucked inside a crumbling leather journal.

-- The journal had arrived with a box of donated books — nobody had touched it in decades.

-- She almost missed it. But then the edge of yellowed parchment caught the light, and everything changed.'
-- );
