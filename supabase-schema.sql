create table if not exists public.ideal_type_results (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  mode integer not null check (mode in (20, 50, 100)),
  answer_count integer not null,
  answer_pattern jsonb not null,
  result_title text not null,
  result_summary text not null,
  image_prompt text not null,
  scores jsonb not null,
  top_traits jsonb not null,
  app_name text not null default '내 이상형을 돌려도!',
  maker text not null default 'KMokky'
);

alter table public.ideal_type_results enable row level security;

grant usage on schema public to anon, authenticated;
grant insert on public.ideal_type_results to anon, authenticated;

drop policy if exists "Allow anonymous ideal type inserts" on public.ideal_type_results;

create policy "Allow anonymous ideal type inserts"
on public.ideal_type_results
for insert
to anon, authenticated
with check (
  app_name = '내 이상형을 돌려도!'
  and maker = 'KMokky'
  and mode in (20, 50, 100)
  and answer_count between 1 and 100
);

create index if not exists ideal_type_results_created_at_idx
on public.ideal_type_results (created_at desc);

create index if not exists ideal_type_results_mode_idx
on public.ideal_type_results (mode);
