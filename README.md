## Project Structure
``` bash
	api/
	├── src/
	│   ├── index.ts              # Entry point (server start)
	│   ├── app.ts                # App config (middleware, routes)
	│   ├── env.ts                # Environment variables
	│   ├── routes/
	│   │   ├── index.ts          # Route aggregator
	│   │   └── health.ts         # Health check endpoint
	│   ├── middleware/
	│   │   ├── logger.ts         # Request logging
	│   │   └── error-handler.ts  # Global error handler
	│   └── services/             # Business logic (ready for use)
	├── package.json
	├── tsconfig.json
	└── .gitignore
```
## Why Hono
- 4x faster than Express, ~14KB total
- Platform-agnostic — same code runs on Node.js, Bun, Deno, Cloudflare Workers, AWS Lambda, Vercel Edge. Migration = swap the entry point adapter
- TypeScript-first with built-in type inference
- Web Standards based (Request/Response) — future-proof

## How to scale
- Add routes: Create a file in src/routes/, mount it in routes/index.ts
- Add services: Put business logic in src/services/, import into routes
- Add database: Install your ORM (Drizzle, Prisma), add to services/
- Deploy anywhere: Swap @hono/node-server adapter for your target platform

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