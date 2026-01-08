module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return res.status(500).json({ error: 'Missing Supabase environment variables' });
  }

  const slug = Array.isArray(req.query.slug) ? req.query.slug[0] : req.query.slug;
  if (!slug) {
    return res.status(400).json({ error: 'Missing slug parameter' });
  }

  try {
    const courseParams = new URLSearchParams({
      select: 'id,slug,title,description,updated_at',
      status: 'eq.published',
      slug: `eq.${slug}`,
      limit: '1'
    });

    const courseResponse = await fetch(`${SUPABASE_URL}/rest/v1/courses?${courseParams.toString()}`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (!courseResponse.ok) {
      const details = await courseResponse.text();
      return res.status(500).json({ error: 'Supabase error', details });
    }

    const courses = await courseResponse.json();
    const course = Array.isArray(courses) ? courses[0] : null;

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const blocksParams = new URLSearchParams({
      select: 'id,type,content,order',
      course_id: `eq.${course.id}`,
      order: 'order.asc'
    });

    const blocksResponse = await fetch(`${SUPABASE_URL}/rest/v1/course_blocks?${blocksParams.toString()}`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (!blocksResponse.ok) {
      const details = await blocksResponse.text();
      return res.status(500).json({ error: 'Supabase error', details });
    }

    const blocks = await blocksResponse.json();
    return res.status(200).json({ course, blocks });
  } catch (error) {
    return res.status(500).json({ error: 'Unexpected server error' });
  }
};
