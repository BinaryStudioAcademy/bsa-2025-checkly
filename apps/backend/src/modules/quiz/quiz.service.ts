import {
	type QuizAnswersRequestDto,
	type QuizAnswersResponseDto,
	type QuizQuestionsResponseDto,
} from "shared";

import { createPrompt } from "./libs/utilities/utilities.js";
import { type QuizRepository } from "./quiz.repository.js";

class QuizService {
	private quizRepository: QuizRepository;

	public constructor(quizRepository: QuizRepository) {
		this.quizRepository = quizRepository;
	}

	public async findAllQuestions(): Promise<QuizQuestionsResponseDto> {
		const questions = await this.quizRepository.findAllQuestionsWithOptions();

		return {
			items: questions.map((question) => question.toObject()),
		};
	}

	public submitAnswers(payload: QuizAnswersRequestDto): QuizAnswersResponseDto {
		const prompt = createPrompt(payload);

		return {
			response: prompt,
		};
	}
}

export { QuizService };
