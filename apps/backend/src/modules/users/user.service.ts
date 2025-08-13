import { type FastifyRequest } from "fastify";

import { type Encryptor } from "~/libs/modules/encryptor/encryptor.js";
import { type Service } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import {
	handleAvatarRemove,
	handleAvatarUpload,
} from "./helpers/avatar.helper.js";
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

	public async removeAvatar(
		userId: number,
	): Promise<ReturnType<typeof handleAvatarRemove>> {
		return await handleAvatarRemove(this.userRepository, userId);
	}

	public async update(
		id: number,
		payload: UserUpdateRequestDto,
	): Promise<null | UserDto> {
		const item = await this.userRepository.update(
			id,
			payload as Partial<Record<string, unknown>>,
		);

		return item ? item.toObject() : null;
	}

	public async uploadAvatar(
		request: FastifyRequest,
	): Promise<ReturnType<typeof handleAvatarUpload>> {
		return await handleAvatarUpload(this.userRepository, request);
	}
}

export { UserService };
