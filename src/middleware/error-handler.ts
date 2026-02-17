import type { ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { env } from "../env.js";

export const errorHandler: ErrorHandler = (err, c) => {
	if (err instanceof z.ZodError) {
		const flattened = z.flattenError(err);
		return c.json(
			{
				error: "Validation Error",
				details: flattened.fieldErrors,
			},
			400,
		);
	}

	if (err instanceof HTTPException) {
		return c.json(
			{
				error: err.message
			},
			err.status
		);
	}

	console.error(`[Error] ${err.message}`);

	return c.json(
		{
			error: "Internal Server Error",
			...(env.NODE_ENV === "development" && { stack: err.stack }),
		},
		500,
	);
};
