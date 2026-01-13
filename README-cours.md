# Cours - Supabase + Vercel

Ce document decrit la configuration pour alimenter la section "Cours" via Supabase et exposer une API publique de lecture sur Vercel.

## Variables d'environnement Vercel

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

## SQL (tables + trigger)

```sql
create extension if not exists "pgcrypto";

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_courses_updated_at on public.courses;
create trigger set_courses_updated_at
before update on public.courses
for each row execute function public.set_updated_at();

create table if not exists public.course_blocks (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  type text not null check (type in ('text', 'image', 'links')),
  content jsonb not null default '{}'::jsonb,
  "order" integer not null default 0
);

create index if not exists course_blocks_course_id_order_idx
  on public.course_blocks(course_id, "order");
```

## RLS (lecture publique des cours publies)

```sql
alter table public.courses enable row level security;
alter table public.course_blocks enable row level security;

create policy "public_read_published_courses"
  on public.courses
  for select
  using (status = 'published');

create policy "public_read_published_course_blocks"
  on public.course_blocks
  for select
  using (
    exists (
      select 1
      from public.courses c
      where c.id = course_blocks.course_id
        and c.status = 'published'
    )
  );
```

## Storage (images publiques)

- Creer un bucket Storage nomme `course-assets`.
- Passer le bucket en mode public ON (pour des URLs stables).
- Les images sont uploadees dans `course-assets/courses/{courseId}/{timestamp}-{random}.{ext}`.
- Stocker dans `course_blocks.content.url` l'URL publique retournee par `getPublicUrl()`.

### Policies Storage (upload admin seulement)

Appliquer des policies Storage pour limiter l'upload aux admins (fonction `public.is_admin()`).
Vous pouvez utiliser le fichier `supabase-storage-policies.sql`.

## Exemple d'insertion

```sql
insert into public.courses (slug, title, description, status)
values ('navigation-web', 'Bien demarrer sur le web', 'Un cours pour apprendre a naviguer.', 'published');

insert into public.course_blocks (course_id, type, content, "order")
select
  c.id,
  'text',
  '{"html": "<p>Bienvenue dans ce cours.</p>"}'::jsonb,
  1
from public.courses c
where c.slug = 'navigation-web';

insert into public.course_blocks (course_id, type, content, "order")
select
  c.id,
  'links',
  '{"items": [{"label": "Service-public.fr", "url": "https://www.service-public.fr"}]}'::jsonb,
  2
from public.courses c
where c.slug = 'navigation-web';
```
