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
		const questionsCategories =
			await this.quizQuestionRepository.findAllWithOptionsByCategoryId(
				categoryId,
			);

		return {
			items: questionsCategories.map(
				(questionCategory) => questionCategory.toObjectWithQuestion().question,
			),
		};
	}
}

export { QuizQuestionService };
