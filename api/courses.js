module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return res.status(500).json({ error: 'Missing Supabase environment variables' });
  }

  const endpoint = `${SUPABASE_URL}/rest/v1/courses`;
  const params = new URLSearchParams({
    select: 'slug,title,description,updated_at',
    status: 'eq.published',
    order: 'updated_at.desc'
  });

  try {
    const response = await fetch(`${endpoint}?${params.toString()}`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (!response.ok) {
      const details = await response.text();
      return res.status(500).json({ error: 'Supabase error', details });
    }

    const courses = await response.json();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: 'Unexpected server error' });
  }
};
