# Admin fixes (performance + stack depth)

## Apply the SQL fix
1) Open Supabase Dashboard > SQL Editor.
2) Paste the contents of `supabase-fix-stack-depth.sql`.
3) If your `admin_users` table uses a different column than `user_id`, edit the SQL before running.
4) Run the query.

## Verify
- Admin: create/update/delete a course and a block; the error `stack depth limit exceeded` should not appear.
- Public: open `cours.html` and confirm the list appears quickly (cache + skeleton).
- Public: open a course from the list and confirm the loader shows then fades in the content.
