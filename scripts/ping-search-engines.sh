#!/bin/bash
# Ping IndexNow (Bing, Yandex, Naver) and Google with all sitemap URLs
# Run after deploy: bash scripts/ping-search-engines.sh

SITE="https://glenrobisonrealestate.com"
KEY="dc6986b3ccd8d34107555bd0b59d0e13"
SITEMAP="$SITE/sitemap-index.xml"

# Extract URLs from sitemap
URLS=$(curl -s "$SITE/sitemap-0.xml" | grep -oP '(?<=<loc>)[^<]+')

if [ -z "$URLS" ]; then
  echo "Could not fetch sitemap URLs. Trying local build..."
  URLS=$(grep -oP '(?<=<loc>)[^<]+' dist/sitemap-0.xml 2>/dev/null)
fi

URL_COUNT=$(echo "$URLS" | wc -l | tr -d ' ')
echo "Found $URL_COUNT URLs"

# Build JSON array
URL_JSON=$(echo "$URLS" | jq -R . | jq -s .)

# IndexNow payload
PAYLOAD=$(cat <<EOJSON
{
  "host": "glenrobisonrealestate.com",
  "key": "$KEY",
  "keyLocation": "$SITE/$KEY.txt",
  "urlList": $URL_JSON
}
EOJSON
)

# Ping IndexNow (covers Bing, Yandex, Seznam, Naver)
echo ""
echo "--- IndexNow (Bing) ---"
curl -s -o /dev/null -w "HTTP %{http_code}" -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD"
echo ""

echo "--- IndexNow (Bing direct) ---"
curl -s -o /dev/null -w "HTTP %{http_code}" -X POST "https://www.bing.com/indexnow" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD"
echo ""

echo "--- IndexNow (Yandex) ---"
curl -s -o /dev/null -w "HTTP %{http_code}" -X POST "https://yandex.com/indexnow" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD"
echo ""

# Ping Google sitemap
echo ""
echo "--- Google Sitemap Ping ---"
curl -s -o /dev/null -w "HTTP %{http_code}" "https://www.google.com/ping?sitemap=$SITEMAP"
echo ""

echo ""
echo "Done. $URL_COUNT URLs submitted."
