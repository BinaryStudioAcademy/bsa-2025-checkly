import { z } from "zod";

const taskUpdate = z
	.object({
		description: z.string().optional(),
		title: z.string().optional(),
	})
	.partial();

export { taskUpdate };
