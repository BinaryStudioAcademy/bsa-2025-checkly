import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class QuizModel extends AbstractModel {
	public static override get tableName(): string {
		return DatabaseTableName.QUIZ;
	}

	public categoryId!: number;
}

export { QuizModel };
