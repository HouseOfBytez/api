import { z, type ZodType } from "zod";
import type { ValidationTargets } from "hono";
import { zValidator } from "@hono/zod-validator";

export function validate<
	Target extends keyof ValidationTargets,
	Schema extends ZodType,
>(target: Target, schema: Schema) {
	return zValidator(target, schema, (result, c) => {
		if (!result.success) {
			const flattened = z.flattenError(result.error);
			return c.json(
				{
					error: "Validation Error",
					details: flattened.fieldErrors,
				},
				400,
			);
		}
	});
}
