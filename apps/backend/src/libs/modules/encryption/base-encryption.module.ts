import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

import { type Config } from "~/libs/modules/config/config.js";

import { type Encryption } from "./encryption.js";
import { DEFAULT_KEY_LENGTH } from "./libs/contants/contants.js";

const scryptAsync = promisify(scrypt);

class BaseEncryption implements Encryption {
	private readonly config: Config;
	private readonly keyLength: number;

	public constructor(config: Config, keyLength = DEFAULT_KEY_LENGTH) {
		this.config = config;
		this.keyLength = keyLength;
	}

	public async compare(
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
		return randomBytes(this.config.ENV.ENCRYPTION.SALT_SIZE).toString("hex");
	}
}

export { BaseEncryption };
