import { type QuizAnswer } from "shared";

import { type QuizAnswerOptionRepository } from "~/libs/modules/quiz-answer-options/quiz-answer-options.repository.js";
import { type Service } from "~/libs/types/types.js";
import { QuizAnswerEntity } from "~/modules/quiz-answers/quiz-answer.entity.js";
import { type QuizAnswerRepository } from "~/modules/quiz-answers/quiz-answer.repository.js";

import {
	type QuizAnswerCreateRequestDto,
	type QuizAnswerGetAllResponseDto,
	type QuizAnswerResponseDto,
	type QuizAnswerUpdateRequestDto,
} from "./libs/types/types.js";

type QuizAnswersRequestDto = {
	answers: QuizAnswer[];
	quizId: number;
};

class QuizAnswerService implements Service {
	private quizAnswerOptionRepository: QuizAnswerOptionRepository;
	private quizAnswerRepository: QuizAnswerRepository;

	public constructor(
		quizAnswerRepository: QuizAnswerRepository,
		quizAnswerOptionRepository: QuizAnswerOptionRepository,
	) {
		this.quizAnswerRepository = quizAnswerRepository;
		this.quizAnswerOptionRepository = quizAnswerOptionRepository;
	}

	public async create(
		payload: QuizAnswerCreateRequestDto,
	): Promise<QuizAnswerResponseDto> {
		const item = await this.quizAnswerRepository.create(
			QuizAnswerEntity.initializeNew(payload),
		);

		return item.toObject();
	}

	public async createAnswerWithOptions(
		payload: QuizAnswersRequestDto,
	): Promise<number[]> {
		const { answers, quizId } = payload;

		const normalizedAnswers = answers.map((answer) => ({
			...answer,
			selectedOptions: answer.selectedOptions
				.map(Number)
				.filter((id) => Number.isInteger(id)),
		}));

		const quizAnswers = normalizedAnswers.map((answer) =>
			QuizAnswerEntity.initializeNew({
				isSkipped: answer.isSkipped,
				questionId: answer.questionId,
				quizId,
				userInput: answer.userInput,
			}),
		);

		await this.quizAnswerRepository.bulkCreate(quizAnswers);

		const insertedAnswers =
			await this.quizAnswerRepository.findAnswersByQuiz(quizId);

		const optionsToInsert = insertedAnswers.flatMap((inserted) => {
			const original = normalizedAnswers.find(
				(answer) => answer.questionId === inserted.questionId,
			);

			if (!original) {
				return [];
			}

			return original.selectedOptions.map((optionId) => ({
				answerId: inserted.id,
				optionId: Number(optionId),
			}));
		});

		await this.quizAnswerOptionRepository.bulkCreate(optionsToInsert);

		return insertedAnswers.map((answer) => answer.id);
	}

	public async delete(id: number): Promise<boolean> {
		return await this.quizAnswerRepository.delete(id);
	}

	public async find(id: number): Promise<null | QuizAnswerResponseDto> {
		const item = await this.quizAnswerRepository.find(id);

		return item ? item.toObject() : null;
	}

	public async findAll(): Promise<QuizAnswerGetAllResponseDto> {
		const items = await this.quizAnswerRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public async update(
		id: number,
		payload: QuizAnswerUpdateRequestDto,
	): Promise<null | QuizAnswerResponseDto> {
		const quiz = await this.quizAnswerRepository.update(id, payload);

		return quiz ? quiz.toObject() : null;
	}
}

export { QuizAnswerService };
