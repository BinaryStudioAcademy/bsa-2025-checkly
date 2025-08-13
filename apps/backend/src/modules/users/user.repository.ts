import { type Repository } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";

class UserRepository implements Repository {
	private userModel: typeof UserModel;
	public constructor(userModel: typeof UserModel) {
		this.userModel = userModel;
	}

	public async create(entity: UserEntity): Promise<UserEntity> {
		const { avatarUrl, email, name, passwordHash, passwordSalt } =
			entity.toNewObject();

		const user = await this.userModel
			.query()
			.insert({
				avatarUrl,
				email,
				name,
				passwordHash,
				passwordSalt,
			})
			.returning("*")
			.execute();

		return UserEntity.initialize(user);
	}

	public async delete(id: number): Promise<boolean> {
		const deletedUser = await this.userModel.query().deleteById(id);

		return Boolean(deletedUser);
	}

	public async find(id: number): Promise<null | UserEntity> {
		const user = await this.userModel.query().findById(id).execute();

		return user ? UserEntity.initialize(user) : null;
	}

	public async findAll(): Promise<UserEntity[]> {
		const users = await this.userModel.query().execute();

		return users.map((user) => UserEntity.initialize(user));
	}

	public async findByField(
		field: "email",
		value: number | string,
	): Promise<null | UserEntity> {
		const user = await this.userModel.query().where(field, value).first();

		return user ? UserEntity.initialize(user) : null;
	}

	public async update(
		id: number,
		payload: Partial<UserModel>,
	): Promise<null | UserEntity> {
		const updatedUser = await this.userModel
			.query()
			.patchAndFetchById(id, payload);

		return UserEntity.initialize(updatedUser);
	}
}

export { UserRepository };
