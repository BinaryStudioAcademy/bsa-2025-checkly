import { type QuizQuestionsResponseDto } from "./libs/types/types.js";
import { type QuizQuestionRepository } from "./quiz-question.repository.js";

class QuizQuestionService {
	private quizQuestionRepository: QuizQuestionRepository;

	public constructor(quizQuestionRepository: QuizQuestionRepository) {
		this.quizQuestionRepository = quizQuestionRepository;
	}

	public async findAll(): Promise<QuizQuestionsResponseDto> {
		const questions = await this.quizQuestionRepository.findAllWithOptions();

		return {
			items: questions.map((question) => question.toObject()),
		};
	}
}

export { QuizQuestionService };
