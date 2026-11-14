#!/usr/bin/env bash
# Builds the site locally on Node 24 and ships it to the server, which runs it in a node:24-slim container.
# Usage: SITE_URL=https://www.example.in DEPLOY_HOST=ubuntu@1.2.3.4 DEPLOY_KEY=~/.ssh/key.pem scripts/deploy.sh
set -euo pipefail

: "${SITE_URL:?Set SITE_URL, for example https://www.your-domain.in}"
: "${DEPLOY_HOST:?Set DEPLOY_HOST, for example ubuntu@13.60.74.62}"
DEPLOY_KEY="${DEPLOY_KEY:-$HOME/.ssh/virat.pem}"
NODE_BIN_DIR="${NODE_BIN_DIR:-$HOME/.nvm/versions/node/v24.22.3/bin}"
APP_PORT="${APP_PORT:-3100}"
REMOTE_ROOT="/srv/codingmonk"
RELEASE_NAME="$(date -u +%Y%m%d%H%M%S)-$(git rev-parse --short HEAD)"
RELEASE_DIRECTORY="$(mktemp -d)/release"
SSH=(ssh -i "$DEPLOY_KEY" -o ConnectTimeout=20 "$DEPLOY_HOST")

echo "Building $RELEASE_NAME for $SITE_URL on Node $("$NODE_BIN_DIR/node" --version)"
rm -rf .next
BUILD_STANDALONE=true SITE_URL="$SITE_URL" PATH="$NODE_BIN_DIR:$PATH" node node_modules/next/dist/bin/next build

mkdir -p "$RELEASE_DIRECTORY/.next" "$RELEASE_DIRECTORY/src/app" "$RELEASE_DIRECTORY/node_modules/@electric-sql"
cp -R .next/standalone/. "$RELEASE_DIRECTORY/"
cp -R .next/static "$RELEASE_DIRECTORY/.next/static"
cp -R public drizzle assets "$RELEASE_DIRECTORY/"
cp src/app/globals.css "$RELEASE_DIRECTORY/src/app/globals.css"
cp -R node_modules/@electric-sql/pglite "$RELEASE_DIRECTORY/node_modules/@electric-sql/"

echo "Uploading release"
tar -C "$RELEASE_DIRECTORY" -czf - . | "${SSH[@]}" "sudo mkdir -p $REMOTE_ROOT/releases/$RELEASE_NAME $REMOTE_ROOT/data && sudo tar -xzf - -C $REMOTE_ROOT/releases/$RELEASE_NAME && sudo chown -R 1000:1000 $REMOTE_ROOT/releases/$RELEASE_NAME $REMOTE_ROOT/data"

echo "Switching to the new release"
"${SSH[@]}" "set -e
  sudo ln -sfn $REMOTE_ROOT/releases/$RELEASE_NAME $REMOTE_ROOT/current
  sudo touch $REMOTE_ROOT/codingmonk.env
  sudo docker rm -f codingmonk-web >/dev/null 2>&1 || true
  sudo docker run -d --name codingmonk-web --restart unless-stopped \
    --memory 420m --memory-swap 900m \
    -p 127.0.0.1:$APP_PORT:3000 \
    -v $REMOTE_ROOT/releases/$RELEASE_NAME:/app \
    -v $REMOTE_ROOT/data:/data \
    --env-file $REMOTE_ROOT/codingmonk.env \
    -e NODE_ENV=production -e HOSTNAME=0.0.0.0 -e PORT=3000 -e PGLITE_DATA_DIR=/data/pglite -e SITE_URL=$SITE_URL \
    --user 1000:1000 -w /app node:24-slim node server.js
  for attempt in \$(seq 1 30); do curl -fs -o /dev/null http://127.0.0.1:$APP_PORT/ && break; sleep 2; done
  curl -fs -o /dev/null -w 'Health check: HTTP %{http_code}\n' http://127.0.0.1:$APP_PORT/
  ls -1dt $REMOTE_ROOT/releases/* | tail -n +6 | xargs -r sudo rm -rf"
echo "Deployed $RELEASE_NAME"
