-- SpatialSprout buyer accounts: run once in Supabase → SQL Editor.
create table if not exists public.purchases (
  id bigint generated always as identity primary key,
  email text not null,
  book_slug text not null,
  stripe_session text unique,
  created_at timestamptz not null default now()
);
create index if not exists purchases_email_idx on public.purchases (lower(email));
alter table public.purchases enable row level security;
-- a signed-in buyer can read only their own purchases; only the server (service role) can write
drop policy if exists "read own purchases" on public.purchases;
create policy "read own purchases" on public.purchases
  for select to authenticated
  using (lower(email) = lower(auth.jwt() ->> 'email'));
