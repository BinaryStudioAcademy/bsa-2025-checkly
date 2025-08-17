import { z } from "zod";

import { ExecutionTimeType } from "../enums/enums.js";

const taskUpdate = z
	.object({
		description: z.string().optional(),
		executionTimeType: z.nativeEnum(ExecutionTimeType).nullable().optional(),
		title: z.string().optional(),
	})
	.partial();

export { taskUpdate };
