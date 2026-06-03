create extension if not exists pgcrypto;

create table if not exists public.ideal_type_feedback (
  id uuid primary key default gen_random_uuid(),
  satisfaction text not null check (satisfaction in ('liked', 'disliked')),
  reason text check (reason is null or char_length(reason) <= 600),
  mode integer check (mode is null or mode in (20, 50, 80)),
  target_gender text,
  target_age_range text,
  user_agent text,
  submitted_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.ideal_type_feedback enable row level security;

grant usage on schema public to anon, authenticated;
revoke select, update, delete on public.ideal_type_feedback from anon, authenticated;
grant insert on public.ideal_type_feedback to anon, authenticated;

drop policy if exists "Allow public feedback inserts" on public.ideal_type_feedback;
create policy "Allow public feedback inserts"
  on public.ideal_type_feedback
  for insert
  to anon, authenticated
  with check (
    satisfaction in ('liked', 'disliked')
    and (reason is null or char_length(reason) <= 600)
    and (mode is null or mode in (20, 50, 80))
  );
