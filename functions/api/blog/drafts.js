import { checkAuth, json } from '../_auth.js';

export async function onRequestOptions() {
  return json({});
}

export async function onRequestGet(context) {
  const auth = await checkAuth(context.request, context.env);
  if (auth) return auth;

  const url = new URL(context.request.url);
  const status = url.searchParams.get('status') || 'draft';

  let query, params;
  if (status === 'all') {
    query = 'SELECT id, title, slug, excerpt, category, author, status, created_at, updated_at, published_at FROM blog_drafts WHERE status != ? ORDER BY created_at DESC';
    params = ['trashed'];
  } else {
    query = 'SELECT id, title, slug, excerpt, category, author, status, created_at, updated_at, published_at FROM blog_drafts WHERE status = ? ORDER BY created_at DESC';
    params = [status];
  }

  const { results } = await context.env.DB.prepare(query).bind(...params).all();
  return json({ drafts: results, count: results.length });
}
