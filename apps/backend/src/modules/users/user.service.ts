import { type Encryptor } from "~/libs/modules/encryptor/encryptor.js";
import { type Service } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
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

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public find(): Promise<null | UserEntity> {
		return Promise.resolve(null);
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

	public async findById(id: number): Promise<null | UserDto> {
		const item = await this.userRepository.findById(id);

		return item ? item.toObject() : null;
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}

	public async updateById(
		id: number,
		payload: UserUpdateRequestDto,
	): Promise<UserDto> {
		const updateData: Partial<{
			dob: null | string;
			email: string;
			name: string;
			passwordHash: string;
			passwordSalt: string;
		}> = {
			dob: payload.dob,
			email: payload.email,
			name: payload.name,
		};

		if (payload.password && payload.password.trim()) {
			const { hash, salt } = await this.encryptor.encrypt(payload.password);
			updateData.passwordHash = hash;
			updateData.passwordSalt = salt;
		}

		const updated = await this.userRepository.updateById(id, updateData);

		return updated.toObject();
	}
}

export { UserService };
