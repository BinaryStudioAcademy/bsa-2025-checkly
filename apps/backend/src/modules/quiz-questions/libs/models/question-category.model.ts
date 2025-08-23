import { type RelationMappings, type RelationMappingsThunk } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { QuestionModel } from "./models.js";

class QuestionCategoryModel extends AbstractModel {
	static get relationMappings(): RelationMappings | RelationMappingsThunk {
		return {
			question: {
				join: {
					from: `${DatabaseTableName.QUESTIONS_CATEGORIES}.question_id`,
					to: `${DatabaseTableName.QUESTIONS}.id`,
				},
				modelClass: QuestionModel,
				relation: AbstractModel.BelongsToOneRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.QUESTIONS_CATEGORIES;
	}

	public categoryId!: number;
	public order!: number;
	public question!: QuestionModel;
	public questionId!: number;
}

export { QuestionCategoryModel };
