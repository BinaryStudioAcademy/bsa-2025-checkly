import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class QuizAnswerOptionModel extends AbstractModel {
	public static override get tableName(): string {
		return DatabaseTableName.QUESTION_ANSWER_OPTIONS;
	}

	public answerId!: number;

	public optionId!: number;
}

export { QuizAnswerOptionModel };
