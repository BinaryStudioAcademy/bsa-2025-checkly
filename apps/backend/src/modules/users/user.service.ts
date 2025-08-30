import { type FastifyRequest } from "fastify";

import { type Encryptor } from "~/libs/modules/encryptor/encryptor.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import {
	handleAvatarRemove,
	handleAvatarUpload,
} from "./helpers/avatar.helper.js";
import { validateAndPrepareUpdateData } from "./helpers/user-validation.helper.js";
import { UserValidationMessage } from "./libs/enums/enums.js";
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

	public async removeAvatar(
		userId: number,
	): Promise<ReturnType<typeof handleAvatarRemove>> {
		return await handleAvatarRemove(this.userRepository, userId);
	}

	public async update(
		id: number,
		payload: UserUpdateRequestDto,
		isReseting: boolean = false,
	): Promise<null | UserDto> {
		const updateData = await validateAndPrepareUpdateData({
			encryptor: this.encryptor,
			id,
			isReseting,
			payload,
			userRepository: this.userRepository,
		});

		try {
			const updatedUser = await this.userRepository.update(id, updateData);

			return updatedUser ? updatedUser.toObject() : null;
		} catch {
			throw new HTTPError({
				message: UserValidationMessage.FAILED_TO_UPDATE_PROFILE,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}
	}

	public async uploadAvatar(
		request: FastifyRequest,
	): Promise<ReturnType<typeof handleAvatarUpload>> {
		return await handleAvatarUpload(this.userRepository, request);
	}
}

export { UserService };
