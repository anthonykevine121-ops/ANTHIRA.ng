create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  email_verified_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
  on public.profiles
  for select
  to authenticated
  using (id = (select auth.uid()));

drop policy if exists "Admins can read verified customer profiles" on public.profiles;
create policy "Admins can read verified customer profiles"
  on public.profiles
  for select
  to authenticated
  using (
    email_verified_at is not null
    and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

grant select on public.profiles to authenticated;

create or replace function public.sync_auth_user_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, email_verified_at)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.email_confirmed_at
  )
  on conflict (id) do update
  set email = excluded.email,
      full_name = coalesce(excluded.full_name, public.profiles.full_name),
      email_verified_at = excluded.email_verified_at;

  return new;
end;
$$;

drop trigger if exists on_auth_user_profile_created on auth.users;
create trigger on_auth_user_profile_created
  after insert or update of email_confirmed_at on auth.users
  for each row execute function public.sync_auth_user_profile();
