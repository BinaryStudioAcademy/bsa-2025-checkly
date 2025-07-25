import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

import { type EncryptedData, type Encryptor } from "./encryptor.js";
import { DEFAULT_KEY_LENGTH, ENCODING_HEX } from "./libs/contants/contants.js";

const scryptAsync = promisify(scrypt);

type Constructor = {
	keyLength?: number;
	saltSize: number;
};

class BaseEncryptor implements Encryptor {
	private readonly keyLength: number;
	private readonly saltSize: number;

	public constructor({
		keyLength = DEFAULT_KEY_LENGTH,
		saltSize,
	}: Constructor) {
		this.keyLength = keyLength;
		this.saltSize = saltSize;
	}

	public async compare(
		value: string,
		storedHash: string,
		salt: string,
	): Promise<boolean> {
		const computedHash = await this.generateHash(value, salt);
		const storedHashBuffer = Buffer.from(storedHash, ENCODING_HEX);

		if (computedHash.length !== storedHashBuffer.length) {
			return false;
		}

		return timingSafeEqual(computedHash, storedHashBuffer);
	}

	public async encrypt(value: string): Promise<EncryptedData> {
		const salt = this.generateSalt();
		const hashBuffer = await this.generateHash(value, salt);

		return { hash: hashBuffer.toString(ENCODING_HEX), salt };
	}

	private async generateHash(value: string, salt: string): Promise<Buffer> {
		return (await scryptAsync(value, salt, this.keyLength)) as Buffer;
	}

	private generateSalt(): string {
		return randomBytes(this.saltSize).toString(ENCODING_HEX);
	}
}

export { BaseEncryptor };
