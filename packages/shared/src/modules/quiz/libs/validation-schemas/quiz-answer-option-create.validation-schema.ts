import { z } from "zod";

const quizAnswerOptionSchema = z.object({
	answerId: z.number(),
	optionId: z.number(),
});

type QuizAnswerOptionCreateRequestDto = z.infer<typeof quizAnswerOptionSchema>;

export { type QuizAnswerOptionCreateRequestDto, quizAnswerOptionSchema };
