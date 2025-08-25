import { type Service } from "~/libs/types/types.js";
import { QuizAnswerEntity } from "~/modules/quiz-answers/quiz-answer.entity.js";
import { type QuizAnswerRepository } from "~/modules/quiz-answers/quiz-answer.repository.js";

import {
	type QuizAnswerCreateRequestDto,
	type QuizAnswerGetAllResponseDto,
	type QuizAnswerResponseDto,
	type QuizAnswerUpdateRequestDto,
} from "./libs/types/types.js";

class QuizAnswerService implements Service {
	private quizAnswerRepository: QuizAnswerRepository;

	public constructor(planRepository: QuizAnswerRepository) {
		this.quizAnswerRepository = planRepository;
	}

	public async create(
		payload: QuizAnswerCreateRequestDto,
	): Promise<QuizAnswerResponseDto> {
		const item = await this.quizAnswerRepository.create(
			QuizAnswerEntity.initializeNew(payload),
		);

		return item.toObject();
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
