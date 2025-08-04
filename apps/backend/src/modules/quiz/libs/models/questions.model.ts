import { type QuestionType } from "shared";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class QuestionModel extends AbstractModel {
	public static override get tableName(): string {
		return DatabaseTableName.QUESTIONS;
	}

	public isOptional!: boolean;
	public order!: number;
	public text!: string;
	public type!: QuestionType;
}

export { QuestionModel };
