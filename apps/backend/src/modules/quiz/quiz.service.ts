import { type QuizQuestionsResponseDto } from "shared/src/modules/quiz/quiz.js";

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
}

export { QuizService };
