import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

import { type Encryptor } from "./encryptor.js";
import { DEFAULT_KEY_LENGTH } from "./libs/constants/constants.js";

const scryptAsync = promisify(scrypt);

class BaseEncryptor implements Encryptor {
	private readonly keyLength: number;
	private readonly saltSize: number;

	public constructor({
		keyLength = DEFAULT_KEY_LENGTH,
		saltSize,
	}: {
		keyLength?: number;
		saltSize: number;
	}) {
		this.saltSize = saltSize;
		this.keyLength = keyLength;
	}

	public async decrypt(
		value: string,
		storedHash: string,
		salt: string,
	): Promise<boolean> {
		const computedHash = await this.generateHash(value, salt);
		const storedHashBuffer = Buffer.from(storedHash, "hex");

		if (computedHash.length !== storedHashBuffer.length) {
			return false;
		}

		return timingSafeEqual(computedHash, storedHashBuffer);
	}

	public async encrypt(value: string): Promise<{ hash: string; salt: string }> {
		const salt = this.generateSalt();
		const hashBuffer = await this.generateHash(value, salt);

		return { hash: hashBuffer.toString("hex"), salt };
	}

	private async generateHash(value: string, salt: string): Promise<Buffer> {
		return (await scryptAsync(value, salt, this.keyLength)) as Buffer;
	}

	private generateSalt(): string {
		return randomBytes(this.saltSize).toString("hex");
	}
}

export { BaseEncryptor };
