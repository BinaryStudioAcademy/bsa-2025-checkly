import * as crypto from "node:crypto";

import { type Encryptor } from "~/libs/modules/encryptor/encryptor.js";
import { type Service } from "~/libs/types/service.type.js";

import { type PasswordTokenDto } from "./libs/types/password-token-dto.type.js";
import { PasswordTokenEntity } from "./password-token.entity.js";
import { type PasswordTokenRepository } from "./password-token.repository.js";

const KEY_SIZE = 256;

class PasswordTokenService implements Service {
	private encryptor: Encryptor;
	private passwordTokenRepository: PasswordTokenRepository;

	public constructor(
		passwordTokenRepository: PasswordTokenRepository,
		encryptor: Encryptor,
	) {
		this.passwordTokenRepository = passwordTokenRepository;
		this.encryptor = encryptor;
	}

	public async create(payload: PasswordTokenDto): Promise<PasswordTokenDto> {
		const { hash, salt } = await this.encryptor.encrypt(
			payload.token as string,
		);

		const item = await this.passwordTokenRepository.create(
			PasswordTokenEntity.initializeNew({
				expirationDate: payload.expirationDate,
				tokenHash: hash,
				tokenSalt: salt,
				userId: payload.userId,
			}),
		);

		return item.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		return await this.passwordTokenRepository.delete(id);
	}

	public async find(id: number): Promise<null | PasswordTokenDto> {
		const item = await this.passwordTokenRepository.find(id);

		return item ? item.toObject() : null;
	}

	public async findAll(): Promise<{ items: unknown[] }> {
		const items = await this.passwordTokenRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public generateToken(): string {
		return crypto.randomBytes(KEY_SIZE).toString();
	}

	public async update(
		id: number,
		payload: Partial<PasswordTokenDto>,
	): Promise<null | PasswordTokenDto> {
		const item = await this.passwordTokenRepository.update(id, payload);

		return item ? item.toObject() : null;
	}
}

export { PasswordTokenService };
