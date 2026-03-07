# syntax=docker/dockerfile:1
# forgespace-web — Next.js 15 marketing site
# Optimized multi-stage: dev (hot reload) + prod (standalone)
# Patterns from siza/api, mcp-gateway, core/patterns/docker

# ─── Dev stage: docker-compose dev with hot reload ───
FROM node:22.22.0-alpine AS dev
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm,sharing=locked \
    npm install --legacy-peer-deps && \
    npm cache clean --force

COPY . .
EXPOSE 3000
ENV NODE_ENV=development
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1
CMD ["npm", "run", "dev"]

# ─── Builder stage: production image ───
FROM node:22.22.0-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm,sharing=locked \
    npm install --legacy-peer-deps && \
    npm cache clean --force

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ─── Production stage: standalone output ───
FROM node:22.22.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/ >/dev/null || exit 1

CMD ["node", "server.js"]
