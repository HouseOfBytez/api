import { Hono } from "hono";
import { validate } from "../middleware/validator.js";
import {
	createItemSchema,
	getAllItems,
	createItem,
} from "../services/example.service.js";

const example = new Hono();

example.get("/", (c) => {
	return c.json(
		{
			items: getAllItems()
		}
	);
});

example.post("/", validate("json", createItemSchema), (c) => {
	const body = c.req.valid("json");
	const item = createItem(body);
	return c.json(
		{
			item
		},
		201
	);
});

export default example;
