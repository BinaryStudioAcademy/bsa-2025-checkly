import { DataStatus } from "shared";
import { z } from "zod";

import { QuizCategory, QuizIndexes, QuizQuestionFormat } from "../enums/enums.js";

const QuestionOptionSchema = z.object({
	id: z.number().int().positive(),
	order: z.number().int().positive(),
	text: z.string().min(QuizIndexes.FIRST_INDEX),
});

const QuestionSchema = z.object({
	id: z.number().int().positive(),
	isOptional: z.boolean(),
	options: z.array(QuestionOptionSchema),
	order: z.number().int().positive(),
	text: z.string().min(QuizIndexes.FIRST_INDEX),
	type: z.nativeEnum(QuizQuestionFormat),
});

const QuizQuestionsResponseSchema = z.object({
	items: z.array(QuestionSchema),
});

const QuizAnswerSchema = z.object({
	isSkipped: z.boolean(),
	questionId: z.coerce.number().int().positive(),
	questionText: z.string().min(QuizIndexes.FIRST_INDEX),
	selectedOptions: z.array(z.union([z.number(), z.string()])),
	userInput: z.string().default(""),
});

const QuizStateSchema = z.object({
	answers: z.record(z.coerce.number().int().positive(), QuizAnswerSchema).default({}),
	currentQuestion: z.number().int().positive().default(QuizIndexes.FIRST_INDEX),
	dataStatus: z.nativeEnum(DataStatus).default(DataStatus.IDLE),
	notes: z.string().default(""),
	questions: QuizQuestionsResponseSchema.nullable().default(null),
	selectedCategory: z.nativeEnum(QuizCategory).nullable().default(null),
});

export { QuizAnswerSchema, QuizStateSchema };