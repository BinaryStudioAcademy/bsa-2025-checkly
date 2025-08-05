import {
	type QuizAnswersRequestDto,
	type QuizAnswersResponseDto,
	type QuizQuestionsResponseDto,
} from "shared";

import { type QuizRepository } from "./quiz.repository.js";

class QuizService {
	private quizRepository: QuizRepository;

	public constructor(quizRepository: QuizRepository) {
		this.quizRepository = quizRepository;
	}

	public async findAllQuestions(): Promise<QuizQuestionsResponseDto> {
		const data = await this.quizRepository.findAllQuestionsWithOptions();

		return {
			items: data.map((question) => question.toObject()),
		};
	}

	public async submitAnswers(
		body: QuizAnswersRequestDto,
	): Promise<QuizAnswersResponseDto> {
		const ANSWERS_PROCESSING_TIME = 0;
		await new Promise((resolve) =>
			setTimeout(resolve, ANSWERS_PROCESSING_TIME),
		);

		return {
			response: body,
		};
	}
}

export { QuizService };
