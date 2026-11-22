# syntax=docker/dockerfile:1.7

# ==============================================================================
# Stage 1: Base Node 24 Alpine with Corepack & pnpm
# ==============================================================================
FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.26.1 --activate
WORKDIR /app

# ==============================================================================
# Stage 2: Production-only dependencies (for lean runtime image)
# ==============================================================================
FROM base AS prod-deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --prod --frozen-lockfile

# ==============================================================================
# Stage 3: Build Angular 22 Hybrid SSR + SSG Application
# ==============================================================================
FROM base AS builder
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# ==============================================================================
# Stage 4: Hardened Production Runner (Coolify Ready)
# ==============================================================================
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000
ENV HOST=0.0.0.0
ENV NG_ALLOWED_HOSTS="localhost,127.0.0.1"
ENV NG_TRUST_PROXY_HEADERS="x-forwarded-host,x-forwarded-proto,x-forwarded-for"

# Install curl for Coolify UI healthchecks and create non-root user for security
RUN apk add --no-cache curl \
  && addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 angular

COPY --from=prod-deps --chown=angular:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=angular:nodejs /app/package.json ./package.json
COPY --from=builder --chown=angular:nodejs /app/dist/swiftroute ./dist/swiftroute

USER angular

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 4000) + '/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "dist/swiftroute/server/server.mjs"]
