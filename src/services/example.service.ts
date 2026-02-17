import { z } from "zod";

export const createItemSchema = z.object({
	name: z.string().min(1).max(100),
	description: z.string().max(500).optional(),
});

export type Item = {
	id: string;
	name: string;
	description?: string;
};

const items: Item[] = [
	{
		id: "1",
		name: "Example Item",
		description: "A sample item"
	},
];

export function getAllItems(): Item[] {
	return items;
}

export function createItem(data: z.infer<typeof createItemSchema>): Item {
	const item: Item = {
		id: String(items.length + 1),
		...data
	};
	items.push(item);
	return item;
}
