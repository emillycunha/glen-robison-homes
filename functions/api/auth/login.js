import { json } from '../_auth.js';

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateToken() {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function onRequestOptions() {
  return json({});
}

export async function onRequestPost(context) {
  const body = await context.request.json();
  const { email, password } = body;

  if (!email || !password) return json({ error: 'Email and password required' }, 400);

  const password_hash = await hashPassword(password);

  const user = await context.env.DB.prepare(
    'SELECT * FROM admin_users WHERE email = ? AND password_hash = ?'
  ).bind(email.toLowerCase(), password_hash).first();

  if (!user) return json({ error: 'Invalid email or password' }, 401);

  // Generate a session token (valid until logout)
  const session_token = generateToken();

  // Store session in a simple KV-like approach using D1
  await context.env.DB.prepare(
    "INSERT OR REPLACE INTO admin_sessions (token, user_id, created_at) VALUES (?, ?, datetime('now'))"
  ).bind(session_token, user.id).run();

  return json({ ok: true, token: session_token, name: user.name, email: user.email });
}
