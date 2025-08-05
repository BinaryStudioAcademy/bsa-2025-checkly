import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class QuestionOptionModel extends AbstractModel {
	public static override get tableName(): string {
		return DatabaseTableName.QUESTION_OPTIONS;
	}

	public order!: number;
	public questionId!: number;
	public text!: string;
}

export { QuestionOptionModel };
