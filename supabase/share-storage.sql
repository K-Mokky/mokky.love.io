-- 공유 링크 미리보기용 이미지 저장소입니다.
-- Supabase SQL Editor에서 한 번 실행한 뒤, Vercel 환경변수에
-- SUPABASE_SHARE_BUCKET=ideal-type-shares 를 설정하면 /api/share가 이 버킷을 사용합니다.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'ideal-type-shares',
  'ideal-type-shares',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Allow public ideal type share uploads" on storage.objects;
create policy "Allow public ideal type share uploads"
  on storage.objects
  for insert
  to anon, authenticated
  with check (
    bucket_id = 'ideal-type-shares'
    and name like 'shares/%'
  );

drop policy if exists "Allow public ideal type share reads" on storage.objects;
create policy "Allow public ideal type share reads"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'ideal-type-shares');
