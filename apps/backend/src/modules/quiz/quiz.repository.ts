import { type QuizModel } from "./quiz.model.js";

class QuizRepository {
	private quizModel: typeof QuizModel;

	public constructor(quizModel: typeof QuizModel) {
		this.quizModel = quizModel;
	}

	public async create(): Promise<number> {
		const quiz = await this.quizModel.query().insert({}).returning("id");

		return quiz.id;
	}
}

export { QuizRepository };
