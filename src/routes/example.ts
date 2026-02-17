import { Hono } from "hono";
import { z } from "zod";
import { validate } from "../middleware/validator.js";

const example = new Hono();

const items: {
	id: string;
	name: string;
	description?: string
}[] = [
	{
		id: "1",
		name: "Example Item",
		description: "A sample item"
	},
];

example.get("/", (c) => {
	return c.json(
		{
			items
		}
	);
});

const createItemSchema = z.object(
	{
		name: z.string().min(1).max(100),
		description: z.string().max(500).optional(),
	}
);

example.post("/", validate("json", createItemSchema), (c) => {
	const body = c.req.valid("json");
	const item = {
		id: String(items.length + 1),
		...body
	};
	items.push(item);
	return c.json(
		{
			item
		},
		201
	);
});

export default example;
