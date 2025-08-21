import { type FastifyRequest } from "fastify";
import { UserValidationMessage } from "shared";

import { type Encryptor } from "~/libs/modules/encryptor/encryptor.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
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
	): Promise<null | UserDto> {
		const userWithSameEmail = await this.userRepository.findByField(
			"email",
			payload.email,
		);

		if (userWithSameEmail && userWithSameEmail.toObject().id !== id) {
			throw new HTTPError({
				message: UserValidationMessage.EMAIL_ALREADY_EXISTS,
				status: HTTPCode.CONFLICT,
			});
		}

		if (payload.password?.trim()) {
			if (!payload.currentPassword?.trim()) {
				throw new HTTPError({
					message: UserValidationMessage.CURRENT_PASSWORD_REQUIRED,
					status: HTTPCode.BAD_REQUEST,
				});
			}

			const currentUser = await this.userRepository.find(id);

			if (!currentUser) {
				throw new HTTPError({
					message: UserValidationMessage.USER_NOT_FOUND,
					status: HTTPCode.NOT_FOUND,
				});
			}

			const { passwordHash, passwordSalt } = currentUser.getPasswordData();
			const isCurrentPasswordValid = await this.encryptor.compare(
				payload.currentPassword,
				passwordHash,
				passwordSalt,
			);

			if (!isCurrentPasswordValid) {
				throw new HTTPError({
					message: UserValidationMessage.CURRENT_PASSWORD_INVALID,
					status: HTTPCode.UNPROCESSED_ENTITY,
				});
			}
		}

		const updateData = {
			dob: payload.dob ?? null,
			email: payload.email.trim(),
			name: payload.name.trim(),
		};

		if (payload.password?.trim()) {
			const { hash, salt } = await this.encryptor.encrypt(payload.password);
			Object.assign(updateData, {
				passwordHash: hash,
				passwordSalt: salt,
			});
		}

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
