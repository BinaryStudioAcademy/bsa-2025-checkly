import z from "zod";

import {
	PlanSearchQueryValidationMessage,
	ZERO_CATEGORY_ID,
} from "../enums/enums.js";

const planSearchQueryParameters = z.object({
	categoryId: z
		.string()
		.optional()
		.transform((value) => {
			if (!value || value === "0" || value === "") {
				return ZERO_CATEGORY_ID;
			}

			const parsed = Number.parseInt(value, 10);

			if (Number.isNaN(parsed)) {
				throw new TypeError(PlanSearchQueryValidationMessage.CATEGORY_ID_TYPE);
			}

			return parsed;
		})
		.refine((value) => value >= ZERO_CATEGORY_ID, {
			message: PlanSearchQueryValidationMessage.CATEGORY_ID_POSITIVE,
		})
		.default("0"),
	title: z.string().optional().default(""),
});

type PlanSearchQueryDto = z.infer<typeof planSearchQueryParameters>;

export { type PlanSearchQueryDto, planSearchQueryParameters };
