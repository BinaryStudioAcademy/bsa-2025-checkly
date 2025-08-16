import { UserValidationMessage } from "shared";

import { type Encryptor } from "~/libs/modules/encryptor/encryptor.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import {
	type UserDto,
	type UserGetAllResponseDto,
	type UserSignUpRequestDto,
	type UserUpdateRequestDto,
} from "./libs/types/types.js";

class UserService implements Service {
	private encryptor: Encryptor;
	private userRepository: UserRepository;

	public constructor(userRepository: UserRepository, encryptor: Encryptor) {
		this.userRepository = userRepository;
		this.encryptor = encryptor;
	}

	public async create(payload: UserSignUpRequestDto): Promise<UserDto> {
		const { hash, salt } = await this.encryptor.encrypt(payload.password);

		const item = await this.userRepository.create(
			UserEntity.initializeNew({
				dob: null,
				email: payload.email,
				name: payload.name,
				passwordHash: hash,
				passwordSalt: salt,
			}),
		);

		return item.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		return await this.userRepository.delete(id);
	}

	public async find(id: number): Promise<null | UserDto> {
		const item = await this.userRepository.find(id);

		return item ? item.toObject() : null;
	}

	public async findAll(): Promise<UserGetAllResponseDto> {
		const items = await this.userRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public async findByEmail(email: string): Promise<null | UserEntity> {
		return await this.userRepository.findByField("email", email);
	}

	public async update(
		id: number,
		payload: UserUpdateRequestDto,
	): Promise<null | UserDto> {
		if (payload.email) {
			const existing = await this.userRepository.findByField(
				"email",
				payload.email,
			);

			if (existing && existing.toObject().id !== id) {
				throw new HTTPError({
					message: UserValidationMessage.EMAIL_ALREADY_EXISTS,
					status: HTTPCode.CONFLICT,
				});
			}
		}

		const updateData = Object.fromEntries(
			Object.entries({
				dob: payload.dob,
				email: payload.email,
				name: payload.name,
			}).filter(([, value]) => value !== undefined),
		) as Partial<UserModel>;

		if (payload.password && payload.password.trim()) {
			const { hash, salt } = await this.encryptor.encrypt(payload.password);
			updateData.passwordHash = hash;
			updateData.passwordSalt = salt;
		}

		const item = await this.userRepository.update(id, updateData);

		return item ? item.toObject() : null;
	}
}

export { UserService };
