## Project Structure
``` bash
api/
├── src/
│   ├── index.ts              # Entry point (server start, graceful shutdown)
│   ├── app.ts                # App config (middleware, routes)
│   ├── env.ts                # Environment variables (Zod-validated)
│   ├── routes/
│   │   ├── index.ts          # Route aggregator
│   │   ├── health.ts         # Health check endpoint
│   │   └── example.ts        # Example CRUD route with validation
│   ├── middleware/
│   │   ├── logger.ts         # Request logging
│   │   ├── error-handler.ts  # Global error handler (Zod/HTTP/unknown)
│   │   ├── validator.ts      # Request validation helper (Zod)
│   │   └── rate-limiter.ts   # In-memory rate limiting
│   └── services/             # Business logic (ready for use)
├── .env.example
├── package.json
├── tsconfig.json
└── .gitignore
```

## Features
- **Env validation** — Zod schema validates `PORT` and `NODE_ENV` at startup with sensible defaults
- **Request validation** — `validate()` helper wraps `@hono/zod-validator` for consistent error responses
- **Error handling** — Distinguishes `ZodError` (400), `HTTPException` (its status), and unknown errors (500 with stack trace in dev)
- **Security headers** — Hono's built-in `secureHeaders` middleware
- **Rate limiting** — In-memory rate limiter (60 req/min default, easily swappable for Redis/etc.)
- **Not found handler** — Structured JSON 404 for unknown routes
- **Graceful shutdown** — Handles `SIGTERM`/`SIGINT` with a 10s timeout
- **CORS** — Enabled by default

## Why Hono
- 4x faster than Express, ~14KB total
- Platform-agnostic — same code runs on Node.js, Bun, Deno, Cloudflare Workers, AWS Lambda, Vercel Edge. Migration = swap the entry point adapter
- TypeScript-first with built-in type inference
- Web Standards based (Request/Response) — future-proof

## Getting Started
``` bash
cp .env.example .env
npm install
npm run dev
```

## API Endpoints
``` bash
GET  /               # Running message
GET  /api/health     # Health check + uptime
GET  /api/example    # List example items
POST /api/example    # Create item (body: { name: string, description?: string })
```

## How to Scale
- Add routes: Create a file in `src/routes/`, mount it in `routes/index.ts`
- Add services: Put business logic in `src/services/`, import into routes
- Add database: Install your ORM (Drizzle, Prisma), add to services
- Deploy anywhere: Swap `@hono/node-server` adapter for your target platform

## Commands
``` bash
┌───────────────┬────────────────────────────┐
│    Command    │        Description         │
├───────────────┼────────────────────────────┤
│ npm run dev   │ Dev server with hot reload │
├───────────────┼────────────────────────────┤
│ npm run build │ Compile TypeScript         │
├───────────────┼────────────────────────────┤
│ npm start     │ Run production build       │
└───────────────┴────────────────────────────┘
```
