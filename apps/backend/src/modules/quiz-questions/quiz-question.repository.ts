import { OPTIONS } from "./libs/constants/constants.js";
import {
	QuestionEntity,
	QuestionOptionEntity,
} from "./libs/entities/entities.js";
import { type QuestionModel } from "./libs/models/models.js";

class QuizQuestionRepository {
	private questionModel: typeof QuestionModel;

	public constructor(questionModel: typeof QuestionModel) {
		this.questionModel = questionModel;
	}

	public async findAllQuestionsWithOptions(): Promise<QuestionEntity[]> {
		const data = await this.questionModel
			.query()
			.orderBy("order")
			.withGraphFetched(OPTIONS);

		return data.map((question) => {
			const options = question.options.map((option) =>
				QuestionOptionEntity.initialize(option),
			);

			return QuestionEntity.initialize({
				id: question.id,
				isOptional: question.isOptional,
				options,
				order: question.order,
				text: question.text,
				type: question.type,
			});
		});
	}
}

export { QuizQuestionRepository };
