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
  -- only the display name column, so users can never change their own shekels
  update public.profiles set display_name = trim(new_name) where id = auth.uid();
end;
$$;

revoke execute on function public.set_my_display_name(text) from public, anon;
grant execute on function public.set_my_display_name(text) to authenticated;