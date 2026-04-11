import { json } from '../_auth.js';

export async function onRequestOptions() {
  return json({});
}

export async function onRequestPost(context) {
  const body = await context.request.json();
  const { path } = body;
  if (!path) return json({ ok: true });

  const referrer = context.request.headers.get('Referer') || '';
  const country = context.request.cf?.country || '';

  await context.env.DB.prepare(
    'INSERT INTO pageviews (path, referrer, country) VALUES (?, ?, ?)'
  ).bind(path, referrer, country).run();

  return json({ ok: true });
}
