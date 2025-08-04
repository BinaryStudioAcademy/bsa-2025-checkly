import { type QuizQuestionsResponseDto } from "shared/src/modules/quiz/quiz.js";

import { type QuizRepository } from "./quiz.repository.js";

class QuizService {
	private quizRepository: QuizRepository;

	public constructor(quizRepository: QuizRepository) {
		this.quizRepository = quizRepository;
	}

	public async findAllQuestionOptions(): Promise<QuizQuestionsResponseDto> {
		const data = await this.quizRepository.findAllQuestionOptions();

		return {
			items: data.map(({ options, question }) => ({
				id: question.id,
				isOptional: question.isOptional,
				options: options.map((o) => ({
					id: o.id,
					order: o.order,
					text: o.text,
				})),
				order: question.order,
				text: question.text,
				type: question.type,
			})),
		};
	}
}

export { QuizService };
