create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null check (username ~ '^[A-Za-z]+[0-9]{2}$'),
  display_name text not null check (char_length(display_name) between 1 and 40),
  shekels integer not null default 0 check (shekels >= 0),
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create unique index profiles_username_lower on public.profiles (lower(username));

alter table public.profiles enable row level security;

create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

create policy "Anyone can view the leaderboard"
  on public.profiles for select
  using (true);

create policy "Admins can edit users"
  on public.profiles for update
  using (public.is_admin())
  with check (public.is_admin());

revoke insert, update, delete on public.profiles from anon, authenticated;
grant update (display_name, shekels) on public.profiles to authenticated;

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (new.id, new.raw_user_meta_data ->> 'username', new.raw_user_meta_data ->> 'display_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create function public.set_my_display_name(new_name text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'You must be logged in.';
  end if;
  if char_length(trim(new_name)) not between 1 and 40 then
    raise exception 'Display names must be between 1 and 40 characters.';
  end if;
  update public.profiles set display_name = trim(new_name) where id = auth.uid();
end;
$$;

revoke execute on function public.set_my_display_name(text) from public, anon;
grant execute on function public.set_my_display_name(text) to authenticated;