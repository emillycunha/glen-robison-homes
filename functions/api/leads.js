import { checkAuth, json } from './_auth.js';

export async function onRequestOptions() {
  return json({});
}

export async function onRequestGet(context) {
  const auth = await checkAuth(context.request, context.env);
  if (auth) return auth;

  const url = new URL(context.request.url);
  const status = url.searchParams.get('status');
  const limit = parseInt(url.searchParams.get('limit') || '100');

  let query = 'SELECT * FROM leads WHERE status != ?';
  let params = ['trashed'];

  if (status) {
    query = 'SELECT * FROM leads WHERE status = ?';
    params = [status];
  }

  query += ' ORDER BY created_at DESC LIMIT ?';
  params.push(limit);

  const { results } = await context.env.DB.prepare(query).bind(...params).all();
  return json({ leads: results, count: results.length });
}

export async function onRequestPut(context) {
  const auth = await checkAuth(context.request, context.env);
  if (auth) return auth;

  const body = await context.request.json();
  const { id, status, notes } = body;

  if (!id) return json({ error: 'id required' }, 400);

  const updates = [];
  const params = [];

  if (status) { updates.push('status = ?'); params.push(status); }
  if (notes !== undefined) { updates.push('notes = ?'); params.push(notes); }

  if (updates.length === 0) return json({ error: 'Nothing to update' }, 400);

  params.push(id);
  await context.env.DB.prepare(
    `UPDATE leads SET ${updates.join(', ')} WHERE id = ?`
  ).bind(...params).run();

  return json({ ok: true });
}
