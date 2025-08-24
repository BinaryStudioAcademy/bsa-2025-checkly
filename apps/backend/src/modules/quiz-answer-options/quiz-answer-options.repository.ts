import { type QuizAnswerOptionCreateRequestDto } from "shared/src/modules/quiz/libs/validation-schemas/quiz-answer-option-create.validation-schema.js";

import { type QuizAnswerOptionModel } from "./quiz-answer-options.model.js";

class QuizAnswerOptionRepository {
	private quizAnswerOptionModel: typeof QuizAnswerOptionModel;

	public constructor(quizModel: typeof QuizAnswerOptionModel) {
		this.quizAnswerOptionModel = quizModel;
	}

	public async bulkCreate(
		payload: QuizAnswerOptionCreateRequestDto[],
	): Promise<void> {
		await this.quizAnswerOptionModel.query().insert(payload).returning("*");
	}

	public async create(
		payload: QuizAnswerOptionCreateRequestDto,
	): Promise<QuizAnswerOptionModel> {
		const quizAnswer = await this.quizAnswerOptionModel
			.query()
			.insert(payload)
			.returning("*");

		return quizAnswer;
	}
}

export { QuizAnswerOptionRepository };
