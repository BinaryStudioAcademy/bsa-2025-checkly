import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class PasswordTokenModel extends AbstractModel {
	public static override get tableName(): string {
		return DatabaseTableName.PASSWORD_TOKENS;
	}

	public expirationDate!: Date;

	public tokenHash!: string;

	public tokenSalt!: string;

	public userId!: number;
}

export { PasswordTokenModel };
