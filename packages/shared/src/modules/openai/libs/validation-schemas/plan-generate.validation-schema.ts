import { z } from "zod";

import { quizAnswersValidationSchema } from "../../../quiz/quiz.js";

const generatePlanSchema = z.object({
	quizAnswers: quizAnswersValidationSchema,
	userId: z.union([z.number().positive(), z.null()]),
});

export { generatePlanSchema };
