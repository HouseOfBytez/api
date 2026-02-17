import { createMiddleware } from "hono/factory";

interface RateLimitOptions {
	windowMs: number;
	max: number;
}

export function rateLimiter({ windowMs = 60_000, max = 60 }: Partial<RateLimitOptions> = {}) {
	const hits = new Map<string, { count: number; resetTime: number }>();

	setInterval(() => {
		const now = Date.now();
		for (const [key, entry] of hits) {
			if (now > entry.resetTime) hits.delete(key);
		}
	}, windowMs);

	return createMiddleware(async (c, next) => {
		const key = c.req.header("x-forwarded-for") ?? "unknown";
		const now = Date.now();
		const entry = hits.get(key);

		if (!entry || now > entry.resetTime) {
			hits.set(key, { count: 1, resetTime: now + windowMs });
			await next();
			return;
		}

		entry.count++;

		if (entry.count > max) {
			return c.json(
				{
					error: "Too Many Requests"
				},
				429
			);
		}

		await next();
	});
}
