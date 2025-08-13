import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class UserModel extends AbstractModel {
	public static override get tableName(): string {
		return DatabaseTableName.USERS;
	}

	public avatarUrl!: null | string;

	public email!: string;

	public name!: string;

	public passwordHash!: string;

	public passwordSalt!: string;
}

export { UserModel };
