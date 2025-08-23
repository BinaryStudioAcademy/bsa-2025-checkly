import * as crypto from "node:crypto";

import { config } from "~/libs/modules/config/config.js";
import { type Encryptor } from "~/libs/modules/encryptor/encryptor.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/service.type.js";

import { UserValidationMessage } from "../auth/libs/enums/enums.js";
import { AuthorizationError } from "../auth/libs/exceptions/exceptions.js";
import { checkExpirationDate } from "./libs/helpers/check-expiration-date.helper.js";
import { type PasswordTokenDto } from "./libs/types/password-token-dto.type.js";
import { PasswordTokenEntity } from "./password-token.entity.js";
import { type PasswordTokenRepository } from "./password-token.repository.js";

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

	public checkTokenIsExpired(existingToken: PasswordTokenEntity): void {
		const expirationDate = existingToken.getExpirationDate();
		const hasExpired = checkExpirationDate(expirationDate);

		if (hasExpired) {
			throw new AuthorizationError({
				message: UserValidationMessage.LINK_HAS_EXPIRED,
				status: HTTPCode.NOT_FOUND,
			});
		}
	}

	public async checkTokenIsValid(
		existingToken: PasswordTokenEntity,
		tokenValue: string,
	): Promise<void> {
		const { tokenHash, tokenSalt } = existingToken.getToken();
		const isValidToken = await this.encryptor.compare(
			tokenValue,
			tokenHash,
			tokenSalt,
		);

		if (!isValidToken) {
			throw new AuthorizationError({
				message: UserValidationMessage.LINK_HAS_EXPIRED,
				status: HTTPCode.NOT_FOUND,
			});
		}
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

	public async findByUserId(
		userId: number,
	): Promise<null | PasswordTokenEntity> {
		return await this.passwordTokenRepository.findByUserId("userId", userId);
	}

	public generateToken(): string {
		return crypto
			.randomBytes(config.ENV.PASSWORD_TOKEN.KEY_SIZE)
			.toString("hex");
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
