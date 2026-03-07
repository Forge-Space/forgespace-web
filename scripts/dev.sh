#!/usr/bin/env bash
# Run forgespace-web dev server via Docker (matches mcp-gateway/siza patterns)
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

if command -v docker-compose &>/dev/null; then
  COMPOSE_CMD="docker-compose"
elif docker compose version &>/dev/null 2>&1; then
  COMPOSE_CMD="docker compose"
else
  echo "Error: docker-compose or 'docker compose' required"
  exit 1
fi

case "${1:-up}" in
  up|"")
    $COMPOSE_CMD up --build
    ;;
  up-d)
    $COMPOSE_CMD up -d --build
    ;;
  down)
    $COMPOSE_CMD down
    ;;
  logs)
    $COMPOSE_CMD logs -f web
    ;;
  *)
    echo "Usage: $0 [up|up-d|down|logs]"
    echo "  up     - Start dev server (foreground, hot reload)"
    echo "  up-d   - Start dev server (detached)"
    echo "  down   - Stop containers"
    echo "  logs   - Follow web container logs"
    exit 1
    ;;
esac
