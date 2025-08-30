import { z } from "zod";

import { PlanValidationMessage } from "../../../../modules/plans/libs/enums/enums.js";
import { quizAnswersValidationSchema } from "../../../quiz/quiz.js";

const generatePlanSchema = z.object({
	quizAnswers: quizAnswersValidationSchema,
	quizId: z.number({
		required_error: PlanValidationMessage.FIELD_REQUIRED,
	}),
	userId: z.number().positive().nullable().optional().default(null),
});

export { generatePlanSchema };
