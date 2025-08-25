import { type QuizAnswer } from "shared";

import { type Repository } from "~/libs/types/types.js";
import { QuizAnswerEntity } from "~/modules/quiz-answers/quiz-answer.entity.js";
import { type QuizAnswerModel } from "~/modules/quiz-answers/quiz-answer.model.js";

class QuizAnswerRepository implements Repository {
	private quizAnswerModel: typeof QuizAnswerModel;
	public constructor(quizAnswerModel: typeof QuizAnswerModel) {
		this.quizAnswerModel = quizAnswerModel;
	}

	public async create(entity: QuizAnswerEntity): Promise<QuizAnswerEntity> {
		const { isSkipped, questionId, quizId, userInput } = entity.toNewObject();

		const answers = await this.quizAnswerModel
			.query()
			.insert({
				isSkipped,
				questionId,
				quizId,
				userInput,
			})
			.returning("*")
			.execute();

		return QuizAnswerEntity.initialize(answers);
	}

	public async delete(id: number): Promise<boolean> {
		const deletedAnswer = await this.quizAnswerModel.query().deleteById(id);

		return Boolean(deletedAnswer);
	}

	public async find(id: number): Promise<null | QuizAnswerEntity> {
		const answer = await this.quizAnswerModel.query().where({ id }).first();

		return answer ? QuizAnswerEntity.initialize(answer) : null;
	}

	public async findAll(): Promise<QuizAnswerEntity[]> {
		const answers = await this.quizAnswerModel.query().execute();

		return answers.map((answer) => QuizAnswerEntity.initialize(answer));
	}

	public async findAllWithOption(quizId: number): Promise<QuizAnswer[]> {
		const answers = await this.quizAnswerModel
			.query()
			.alias("answers")
			.where("answers.quiz_id", quizId)
			.select(
				"answers.is_skipped as isSkipped",
				"answers.id as answerId",
				"answers.user_input as userInput",
				"questions.id as questionId",
				"questions.text as questionText",
				this.quizAnswerModel.raw(
					"json_agg(question_options.text) as selectedOptions",
				),
			)
			.leftJoin("questions", "answers.question_id", "questions.id")
			.leftJoin("answer_options", "answers.id", "answer_options.answer_id")
			.leftJoin(
				"question_options",
				"answer_options.option_id",
				"question_options.id",
			)
			.groupBy("answers.id", "questions.id");

		return answers;
	}

	public async update(
		id: number,
		payload: Partial<QuizAnswerModel>,
	): Promise<null | QuizAnswerEntity> {
		const updatedAnswer = await this.quizAnswerModel
			.query()
			.patchAndFetchById(id, payload);

		return QuizAnswerEntity.initialize(updatedAnswer);
	}
}

export { QuizAnswerRepository };
