# SwiftRoute Logistics (Angular 22 + Tailwind CSS v4 + Coolify Docker)

Production-ready delivery & shipping web application built with **Angular 22**, **Hybrid SSR + SSG (`@angular/ssr`)**, **Tailwind CSS v4**, **@lucide/angular**, **Zod**, and **Vitest**.

## Pages & Features

- **Home (`/`)**: Hero with live **Interactive Shipment Tracker** (demo IDs: `SR-884120`, `SR-552910`, `SR-309441`), featured shipping services, 3-step workflow, and operational KPIs.
- **Services (`/services`)**: Filterable catalog of 6 logistics services with SLA badges, transit times, and deep-linked quote CTAs.
- **About Us (`/about`)**: Company mission, metrics, core principles, and flagship intercontinental hubs.
- **Contact Us (`/contact`)**: Reactive quote/contact form validated client-side with **Zod**, pre-selected service query param support (`?service=...`), and instant toast confirmation.
- **SEO & Hardening**: Per-route `<title>`, `<meta>`, OpenGraph, canonical URLs, `robots.txt`, `sitemap.xml`, `helmet` security headers, `compression`, `/health` endpoint, and graceful `SIGTERM`/`SIGINT` shutdown.

---

## Local Development (`pnpm`)

```bash
pnpm install
pnpm start        # http://localhost:4200
pnpm test         # Vitest unit tests
pnpm build        # Production Hybrid SSR + SSG build
```

---

## Docker Development (Hot Reload)

```bash
docker compose -f docker-compose.dev.yml up --build
```

Access the dev server at `http://localhost:4200`.

---

## Docker Production (Local Test)

```bash
cp .env.example .env
docker compose up --build -d
```

Verify health check:

```bash
curl http://localhost:4000/health
```

---

## Deploying to Coolify

1. Create a new **Application** in Coolify connected to your Git repository.
2. **Build Pack**: Select **Dockerfile** (uses root `Dockerfile`).
3. **Ports Exposes**: `4000`
4. **Health Check**:
   - Enabled: **Yes**
   - Path: `/health`
   - Port: `4000`
5. **Environment Variables** (Production):
   - `NODE_ENV=production`
   - `PORT=4000`
   - `NG_ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com` *(Required by Angular SSR SSRF protection)*
   - `NG_TRUST_PROXY_HEADERS=x-forwarded-host,x-forwarded-proto,x-forwarded-for`
6. Click **Deploy**. Coolify will build the multi-stage image, verify `/health`, and route HTTPS traffic via Traefik/Caddy with zero-downtime rolling updates.
