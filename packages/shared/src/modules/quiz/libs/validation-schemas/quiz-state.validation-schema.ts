import { DataStatus } from "shared";
import { z } from "zod";

import {
	QuizCategory,
	QuizIndexes,
	QuizQuestionFormat,
} from "../enums/enums.js";
import { quizAnswerSchema } from "./quiz-shared.validation-schema.js";

const questionOptionSchema = z.object({
	id: z.number().int().positive(),
	order: z.number().int().positive(),
	text: z.string().min(QuizIndexes.FIRST_INDEX),
});

const questionSchema = z.object({
	id: z.number().int().positive(),
	isOptional: z.boolean(),
	options: z.array(questionOptionSchema),
	text: z.string().min(QuizIndexes.FIRST_INDEX),
	type: z.nativeEnum(QuizQuestionFormat),
});

const quizQuestionsResponseSchema = z.object({
	items: z.array(questionSchema),
});

const quizStateSchema = z.object({
	answers: z
		.record(z.coerce.number().int().positive(), quizAnswerSchema)
		.default({}),
	currentQuestion: z.number().int().positive().default(QuizIndexes.FIRST_INDEX),
	dataStatus: z.nativeEnum(DataStatus).default(DataStatus.IDLE),
	notes: z.string().default(""),
	questions: quizQuestionsResponseSchema.nullable().default(null),
	selectedCategory: z.nativeEnum(QuizCategory).nullable().default(null),
});

export { quizStateSchema };
