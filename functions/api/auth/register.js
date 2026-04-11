import { json } from '../_auth.js';

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function onRequestOptions() {
  return json({});
}

export async function onRequestPost(context) {
  const body = await context.request.json();
  const { email, password, name, setup_key } = body;

  if (!email || !password) return json({ error: 'Email and password required' }, 400);

  // First user can register freely. After that, require ADMIN_TOKEN as setup_key
  const { results } = await context.env.DB.prepare('SELECT COUNT(*) as count FROM admin_users').all();
  const userCount = results[0].count;

  if (userCount > 0 && setup_key !== context.env.ADMIN_TOKEN) {
    return json({ error: 'Registration requires setup key' }, 403);
  }

  const password_hash = await hashPassword(password);

  try {
    await context.env.DB.prepare(
      'INSERT INTO admin_users (email, password_hash, name) VALUES (?, ?, ?)'
    ).bind(email.toLowerCase(), password_hash, name || '').run();
  } catch (e) {
    return json({ error: 'Email already registered' }, 409);
  }

  return json({ ok: true });
}
