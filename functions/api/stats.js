import { checkAuth, json } from './_auth.js';

export async function onRequestOptions() {
  return json({});
}

export async function onRequestGet(context) {
  const auth = await checkAuth(context.request, context.env);
  if (auth) return auth;

  const url = new URL(context.request.url);
  const days = parseInt(url.searchParams.get('days') || '30');

  const since = new Date();
  since.setDate(since.getDate() - days);
  const sinceStr = since.toISOString().split('T')[0];

  // Total pageviews
  const total = await context.env.DB.prepare(
    'SELECT COUNT(*) as count FROM pageviews WHERE created_at >= ?'
  ).bind(sinceStr).first();

  // Top pages
  const topPages = await context.env.DB.prepare(
    'SELECT path, COUNT(*) as views FROM pageviews WHERE created_at >= ? GROUP BY path ORDER BY views DESC LIMIT 20'
  ).bind(sinceStr).all();

  // Daily counts
  const daily = await context.env.DB.prepare(
    "SELECT DATE(created_at) as day, COUNT(*) as views FROM pageviews WHERE created_at >= ? GROUP BY DATE(created_at) ORDER BY day DESC LIMIT ?"
  ).bind(sinceStr, days).all();

  // Top referrers
  const referrers = await context.env.DB.prepare(
    "SELECT referrer, COUNT(*) as count FROM pageviews WHERE created_at >= ? AND referrer != '' GROUP BY referrer ORDER BY count DESC LIMIT 10"
  ).bind(sinceStr).all();

  // Top countries
  const countries = await context.env.DB.prepare(
    "SELECT country, COUNT(*) as count FROM pageviews WHERE created_at >= ? AND country != '' GROUP BY country ORDER BY count DESC LIMIT 10"
  ).bind(sinceStr).all();

  return json({
    period: `${days} days`,
    total: total.count,
    topPages: topPages.results,
    daily: daily.results,
    referrers: referrers.results,
    countries: countries.results,
  });
}
