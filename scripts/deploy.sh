#!/usr/bin/env bash

set -e

# Load environment variables for Node, NVM, and PM2
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
export PATH=$PATH:/usr/local/bin:/usr/bin

PROJECT_DIR="/var/www/dev-fullstack"

echo "=== Deployment started at $(date) ==="
cd "$PROJECT_DIR"

echo "Pulling latest code from master..."
git pull origin master

echo "Installing dependencies..."
npm install

echo "Building Next.js application..."
npm run build

echo "Reloading application with PM2..."
pm2 reload dev-fullstack || pm2 reload all || pm2 restart all

echo "=== Deployment finished successfully at $(date) ==="
