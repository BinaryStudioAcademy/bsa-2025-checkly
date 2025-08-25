import { type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { UserModel } from "../users/user.model.js";

class FeedbackModel extends AbstractModel {
	static get relationMappings(): RelationMappings {
		return {
			user: {
				join: {
					from: `${DatabaseTableName.FEEDBACK}.user_id`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: AbstractModel.BelongsToOneRelation,
			},
		};
	}
	public static override get tableName(): string {
		return DatabaseTableName.FEEDBACK;
	}

	public text!: string;
	public userId!: number;
}

export { FeedbackModel };
