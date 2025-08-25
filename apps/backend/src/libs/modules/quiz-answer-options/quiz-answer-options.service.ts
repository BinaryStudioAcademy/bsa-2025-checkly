import { type QuizAnswerOptionCreateRequestDto } from "./libs/types/types.js";
import { type QuizAnswerOptionModel } from "./quiz-answer-options.model.js";
import { type QuizAnswerOptionRepository } from "./quiz-answer-options.repository.js";

class QuizAnswerOptionService {
	private quizAnswerOptionRepository: QuizAnswerOptionRepository;

	public constructor(quizAnswerOptionRepository: QuizAnswerOptionRepository) {
		this.quizAnswerOptionRepository = quizAnswerOptionRepository;
	}

	public async create(
		payload: QuizAnswerOptionCreateRequestDto,
	): Promise<QuizAnswerOptionModel> {
		return await this.quizAnswerOptionRepository.create(payload);
	}
}

export { QuizAnswerOptionService };
