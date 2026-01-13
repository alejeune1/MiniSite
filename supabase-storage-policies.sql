-- Storage policies for course-assets uploads (admin only).
-- Requires public.is_admin() to be available.

alter table storage.objects enable row level security;

create policy "admin_upload_course_assets"
  on storage.objects
  for insert
  with check (
    bucket_id = 'course-assets'
    and public.is_admin()
  );

create policy "admin_update_course_assets"
  on storage.objects
  for update
  using (
    bucket_id = 'course-assets'
    and public.is_admin()
  )
  with check (
    bucket_id = 'course-assets'
    and public.is_admin()
  );

create policy "admin_delete_course_assets"
  on storage.objects
  for delete
  using (
    bucket_id = 'course-assets'
    and public.is_admin()
  );
