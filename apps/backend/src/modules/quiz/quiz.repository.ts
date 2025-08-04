import {
	type QuestionModel,
	type QuestionOptionsModel,
} from "./libs/models/models.js";

class QuizRepository {
	private questionModel: typeof QuestionModel;
	private questionOptionsModel: typeof QuestionOptionsModel;

	public constructor(
		quetionModel: typeof QuestionModel,
		questionOptionsModel: typeof QuestionOptionsModel,
	) {
		this.questionModel = quetionModel;
		this.questionOptionsModel = questionOptionsModel;
	}

	public async findAllQuestionOptions(): Promise<
		{ options: QuestionOptionsModel[]; question: QuestionModel }[]
	> {
		const questions = await this.questionModel.query().orderBy("order");

		const questionsWithOptions = await Promise.all(
			questions.map(async (question) => {
				const options = await this.questionOptionsModel
					.query()
					.where("questionId", question.id)
					.orderBy("order");

				return { options, question };
			}),
		);

		return questionsWithOptions;
	}
}

export { QuizRepository };
