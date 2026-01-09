-- Fix stack depth limit exceeded by replacing recursive triggers/functions.
-- Review table/column names before running if your schema differs.

-- 1) Safe updated_at trigger for courses (no recursive UPDATE).
create or replace function public.set_updated_at_safe()
returns trigger
language plpgsql
as $$
begin
  if (tg_op = 'UPDATE') then
    if row(NEW.*) is distinct from row(OLD.*) then
      NEW.updated_at = now();
    end if;
  end if;
  return NEW;
end;
$$;

drop trigger if exists set_courses_updated_at on public.courses;
create trigger set_courses_updated_at
before update on public.courses
for each row execute function public.set_updated_at_safe();

-- Optional: add the same trigger on course_blocks only if updated_at exists.
do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'course_blocks'
      and column_name = 'updated_at'
  ) then
    drop trigger if exists set_course_blocks_updated_at on public.course_blocks;
    create trigger set_course_blocks_updated_at
    before update on public.course_blocks
    for each row execute function public.set_updated_at_safe();
  end if;
end;
$$;

-- 2) Non-recursive admin check to avoid RLS function loops.
-- If your admin_users column is not user_id, change it here.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public, row_security = off
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;
