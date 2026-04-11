import { json } from '../_auth.js';

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Public POST (OpenClaw agent) — requires auth
// Also used by admin to create drafts
export async function onRequestOptions() {
  return json({});
}

export async function onRequestPost(context) {
  const token = context.request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token || token !== context.env.ADMIN_TOKEN) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const body = await context.request.json();
  const { title, content, excerpt, category, author, tags } = body;

  if (!title || !content) return json({ error: 'title and content required' }, 400);

  const slug = slugify(title);
  const tagsStr = Array.isArray(tags) ? tags.join(',') : (tags || '');

  const result = await context.env.DB.prepare(
    `INSERT INTO blog_drafts (title, slug, excerpt, content, category, author, tags)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    title, slug, excerpt || '', content,
    category || 'Market Update', author || 'Glen Robison', tagsStr
  ).run();

  return json({ ok: true, id: result.meta.last_row_id, slug });
}
