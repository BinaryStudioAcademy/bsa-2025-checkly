import { type Repository } from "~/libs/types/repository.type.js";

import { PasswordTokenEntity } from "./password-token.entity.js";
import { type PasswordTokenModel } from "./password-token.model.js";

class PasswordTokenRepository implements Repository {
	private passwordTokenModel: typeof PasswordTokenModel;
	public constructor(passwordTokenModel: typeof PasswordTokenModel) {
		this.passwordTokenModel = passwordTokenModel;
	}

	public async create(
		entity: PasswordTokenEntity,
	): Promise<PasswordTokenEntity> {
		const { expirationDate, tokenHash, tokenSalt, userId } =
			entity.toNewObject();

		const passwordToken = await this.passwordTokenModel
			.query()
			.insert({
				expirationDate,
				tokenHash,
				tokenSalt,
				userId,
			})
			.returning("*")
			.execute();

		return PasswordTokenEntity.initialize(passwordToken);
	}

	public async delete(id: number): Promise<boolean> {
		const deletedPasswordToken = await this.passwordTokenModel
			.query()
			.deleteById(id);

		return Boolean(deletedPasswordToken);
	}

	public async find(id: number): Promise<null | PasswordTokenEntity> {
		const passwordToken = await this.passwordTokenModel.query().findById(id);

		return passwordToken ? PasswordTokenEntity.initialize(passwordToken) : null;
	}

	public async findAll(): Promise<PasswordTokenEntity[]> {
		const passwordTokens = await this.passwordTokenModel.query().execute();

		return passwordTokens.map((passwordToken) =>
			PasswordTokenEntity.initialize(passwordToken),
		);
	}

	public async findByUserId(
		field: "userId",
		value: number,
	): Promise<null | PasswordTokenEntity> {
		const existingToken = await this.passwordTokenModel
			.query()
			.where(field, value)
			.orderBy("created_at", "desc")
			.first();

		return existingToken ? PasswordTokenEntity.initialize(existingToken) : null;
	}

	public async update(
		id: number,
		payload: Partial<PasswordTokenModel>,
	): Promise<null | PasswordTokenEntity> {
		const updatedPasswordToken = await this.passwordTokenModel
			.query()
			.patchAndFetchById(id, payload);

		return PasswordTokenEntity.initialize(updatedPasswordToken);
	}
}

export { PasswordTokenRepository };
