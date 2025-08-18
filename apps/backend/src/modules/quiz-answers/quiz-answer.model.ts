import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class QuizAnswerModel extends AbstractModel {
	public static override get tableName(): string {
		return DatabaseTableName.QUESTION_ANSWERS;
	}

	public isSkipped!: boolean;

	public questionId!: number;

	public questionText!: string;

	public quizId!: number;

	public selectedOptions!: (number | string)[];

	public userInput!: string;
}

export { QuizAnswerModel };
