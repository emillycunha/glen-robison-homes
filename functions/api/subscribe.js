export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { name, email, phone, guide } = body;

    if (!email || !guide) {
      return new Response(JSON.stringify({ error: 'Email and guide are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await env.DB.prepare(
      'INSERT INTO leads (name, email, phone, guide) VALUES (?, ?, ?, ?)'
    ).bind(name || '', email, phone || '', guide).run();

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
