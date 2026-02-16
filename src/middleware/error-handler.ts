import type { ErrorHandler } from "hono";

export const errorHandler: ErrorHandler = (err, c) => {
	console.error(`[Error] ${err.message}`);
	return c.json({
		error: "Internal Server Error"
	}, 500);
};
