import { type QuizQuestionsResponseDto } from "./libs/types/types.js";
import { type QuizQuestionRepository } from "./quiz-question.repository.js";

class QuizQuestionService {
	private quizQuestionRepository: QuizQuestionRepository;

	public constructor(quizQuestionRepository: QuizQuestionRepository) {
		this.quizQuestionRepository = quizQuestionRepository;
	}

	public async findAllByCategoryId(
		categoryId: number,
	): Promise<QuizQuestionsResponseDto> {
		const questions =
			await this.quizQuestionRepository.findAllWithOptionsByCategoryId(
				categoryId,
			);

		return {
			items: questions.map((question) => question.toObjectWithQuestion()),
		};
	}
}

export { QuizQuestionService };
