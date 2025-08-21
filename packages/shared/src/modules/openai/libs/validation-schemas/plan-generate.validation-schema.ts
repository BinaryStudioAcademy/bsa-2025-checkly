import { z } from "zod";

import { quizAnswersValidationSchema } from "../../../quiz/quiz.js";
import { userValidationSchema } from "../../../users/users.js";

const generatePlanSchema = z.object({
	quizAnswers: quizAnswersValidationSchema,
	user: z.union([userValidationSchema, z.null()]),
});

export { generatePlanSchema };
