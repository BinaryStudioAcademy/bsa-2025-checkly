import { type RelationMappings, type RelationMappingsThunk } from "objection";
import { type QuestionType } from "shared";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { OPTIONS } from "../enums/enums.js";
import { QuestionOptionModel } from "./models.js";

class QuestionModel extends AbstractModel {
	static get relationMappings(): RelationMappings | RelationMappingsThunk {
		return {
			[OPTIONS]: {
				join: {
					from: `${DatabaseTableName.QUESTION_OPTIONS}.questionId`,
					to: `${DatabaseTableName.QUESTIONS}.id`,
				},
				modelClass: QuestionOptionModel,
				relation: AbstractModel.HasManyRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.QUESTIONS;
	}

	public isOptional!: boolean;
	public options!: QuestionOptionModel[];
	public order!: number;
	public text!: string;
	public type!: QuestionType;
}

export { QuestionModel };
