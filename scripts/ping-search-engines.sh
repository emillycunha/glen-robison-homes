#!/bin/bash
# Ping IndexNow (Bing, Yandex, Naver) and Google with all sitemap URLs
# Run after deploy: bash scripts/ping-search-engines.sh

SITE="https://glenrobisonrealestate.com"
KEY="dc6986b3ccd8d34107555bd0b59d0e13"
SITEMAP="$SITE/sitemap-index.xml"

# Extract URLs from sitemap
URLS=$(curl -s "$SITE/sitemap-0.xml" | tr '<' '\n' | grep '^loc>' | sed 's|^loc>||')

if [ -z "$URLS" ]; then
  echo "Remote sitemap not available. Trying local build..."
  URLS=$(cat dist/sitemap-0.xml 2>/dev/null | tr '<' '\n' | grep '^loc>' | sed 's|^loc>||')
fi

if [ -z "$URLS" ]; then
  echo "No URLs found. Exiting."
  exit 1
fi

URL_COUNT=$(echo "$URLS" | wc -l | tr -d ' ')
echo "Found $URL_COUNT URLs"

# Build JSON array
URL_JSON=$(echo "$URLS" | jq -R . | jq -s .)

# IndexNow payload
PAYLOAD=$(jq -n \
  --arg host "glenrobisonrealestate.com" \
  --arg key "$KEY" \
  --arg keyLocation "$SITE/$KEY.txt" \
  --argjson urlList "$URL_JSON" \
  '{host: $host, key: $key, keyLocation: $keyLocation, urlList: $urlList}')

echo ""
echo "$PAYLOAD" | jq '.urlList | length' | xargs -I{} echo "Submitting {} URLs..."

# Ping IndexNow (covers Bing, Yandex, Seznam, Naver)
echo ""
echo "--- IndexNow (api.indexnow.org) ---"
curl -s -o /dev/null -w "HTTP %{http_code}" -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$PAYLOAD"
echo ""

echo "--- IndexNow (Bing) ---"
curl -s -o /dev/null -w "HTTP %{http_code}" -X POST "https://www.bing.com/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$PAYLOAD"
echo ""

echo "--- IndexNow (Yandex) ---"
curl -s -o /dev/null -w "HTTP %{http_code}" -X POST "https://yandex.com/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$PAYLOAD"
echo ""

# Google: ping sitemap (deprecated but still sometimes works)
# Primary method is Google Search Console
echo ""
echo "--- Google Sitemap Ping ---"
RESP=$(curl -s -w "\nHTTP %{http_code}" "https://www.google.com/ping?sitemap=$SITEMAP")
echo "$RESP" | tail -1
echo "(Google recommends using Search Console for sitemap submission)"

echo ""
echo "Done. $URL_COUNT URLs submitted to IndexNow."
echo "For Google: submit sitemap at https://search.google.com/search-console"
