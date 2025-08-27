import {
	type QuizCreateRequestDto,
	type QuizResponseDto,
} from "./libs/types/types.js";
import { type QuizModel } from "./quiz.model.js";

class QuizRepository {
	private quizModel: typeof QuizModel;

	public constructor(quizModel: typeof QuizModel) {
		this.quizModel = quizModel;
	}

	public async create(payload: QuizCreateRequestDto): Promise<number> {
		const quiz = await this.quizModel
			.query()
			.insert({
				categoryId: payload.categoryId,
			})
			.returning("id");

		return quiz.id;
	}

	public async find(id: number): Promise<null | QuizResponseDto> {
		const answer = await this.quizModel.query().where({ id }).first();

		return answer ?? null;
	}
}

export { QuizRepository };
