import {
	QuestionEntity,
	QuestionOptionEntity,
} from "./libs/entities/entities.js";
import { OPTIONS } from "./libs/enums/enums.js";
import { type QuestionModel } from "./libs/models/models.js";

class QuizRepository {
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
			return QuestionEntity.initialize({
				id: question.id,
				isOptional: question.isOptional,
				options: question.options.map((option) =>
					QuestionOptionEntity.initialize({
						id: option.id,
						order: option.order,
						text: option.text,
					}),
				),
				order: question.order,
				text: question.text,
				type: question.type,
			});
		});
	}
}

export { QuizRepository };
