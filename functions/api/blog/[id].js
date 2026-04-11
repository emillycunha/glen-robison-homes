import { checkAuth, json } from '../_auth.js';

export async function onRequestOptions() {
  return json({});
}

// GET single draft (full content)
export async function onRequestGet(context) {
  const auth = await checkAuth(context.request, context.env);
  if (auth) return auth;

  const id = context.params.id;
  const draft = await context.env.DB.prepare(
    'SELECT * FROM blog_drafts WHERE id = ? AND status != ?'
  ).bind(id, 'trashed').first();

  if (!draft) return json({ error: 'Not found' }, 404);
  return json({ draft });
}

// PUT update draft
export async function onRequestPut(context) {
  const auth = await checkAuth(context.request, context.env);
  if (auth) return auth;

  const id = context.params.id;
  const body = await context.request.json();
  const { title, content, excerpt, category, tags, status } = body;

  const updates = ["updated_at = datetime('now')"];
  const params = [];

  if (title !== undefined) { updates.push('title = ?'); params.push(title); }
  if (content !== undefined) { updates.push('content = ?'); params.push(content); }
  if (excerpt !== undefined) { updates.push('excerpt = ?'); params.push(excerpt); }
  if (category !== undefined) { updates.push('category = ?'); params.push(category); }
  if (tags !== undefined) { updates.push('tags = ?'); params.push(Array.isArray(tags) ? tags.join(',') : tags); }
  if (status !== undefined) {
    updates.push('status = ?');
    params.push(status);
    if (status === 'published') {
      updates.push("published_at = datetime('now')");
    }
  }

  params.push(id);
  await context.env.DB.prepare(
    `UPDATE blog_drafts SET ${updates.join(', ')} WHERE id = ?`
  ).bind(...params).run();

  return json({ ok: true });
}
