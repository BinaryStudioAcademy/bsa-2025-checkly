import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { type Nullable } from "~/libs/types/types.js";

class UserModel extends AbstractModel {
	public static override get tableName(): string {
		return DatabaseTableName.USERS;
	}

	public avatarUrl!: Nullable<string>;

	public dob!: Nullable<string>;

	public email!: string;

	public name!: string;

	public passwordHash!: string;

	public passwordSalt!: string;
}

export { UserModel };
