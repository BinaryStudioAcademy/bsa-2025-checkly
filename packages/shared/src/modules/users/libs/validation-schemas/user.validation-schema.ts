import { z } from "zod";

const user = z.object({
	avatarUrl: z.string().nullable(),
	dob: z.string().nullable(),
	email: z.string().email(),
	id: z.number().int().positive(),
	name: z.string(),
});

export { user };
