import { json } from './_auth.js';

export async function onRequestOptions() {
  return json({});
}

export async function onRequestPost(context) {
  const body = await context.request.json();
  const { name, email, phone, message } = body;

  if (!email || !name) {
    return json({ error: 'Name and email required' }, 400);
  }

  await context.env.DB.prepare(
    'INSERT INTO leads (name, email, phone, guide, status, notes) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(name, email, phone || null, 'contact', 'new', message || null).run();

  return json({ ok: true });
}
