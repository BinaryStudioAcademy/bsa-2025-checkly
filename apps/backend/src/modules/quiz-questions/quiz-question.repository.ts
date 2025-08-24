import {
	QuestionEntity,
	QuestionOptionEntity,
} from "./libs/entities/entities.js";
import { QuestionCategoryEntity } from "./libs/entities/question-category.entity.js";
import { type QuestionCategoryModel } from "./libs/models/models.js";

class QuizQuestionRepository {
	private questionCategoryModel: typeof QuestionCategoryModel;

	public constructor(questionCategoryModel: typeof QuestionCategoryModel) {
		this.questionCategoryModel = questionCategoryModel;
	}

	public async findAllWithOptionsByCategoryId(
		categoryId: number,
	): Promise<QuestionCategoryEntity[]> {
		const data = await this.questionCategoryModel
			.query()
			.where("categoryId", categoryId)
			.withGraphFetched("question.options")
			.orderBy("order");

		return data.map((questionCategory) => {
			const options = questionCategory.question.options.map((option) =>
				QuestionOptionEntity.initialize(option),
			);
			const { id, isOptional, text, type } = questionCategory.question;

			return QuestionCategoryEntity.initialize({
				categoryId: questionCategory.categoryId,
				id: questionCategory.id,
				order: questionCategory.order,
				question: QuestionEntity.initialize({
					id,
					isOptional,
					options,
					text,
					type,
				}),
				questionId: questionCategory.questionId,
			});
		});
	}
}

export { QuizQuestionRepository };
