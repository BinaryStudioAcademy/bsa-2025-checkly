import { pbkdf2, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

import { type Encrypt } from "./encrypt.js";
import { DEFAULT_SALT_SIZE } from "./libs/constants/constants.js";

const pbkdf2Async = promisify(pbkdf2);

class BaseEncrypt implements Encrypt {
	private readonly algorithm = "sha256";

	private readonly iterations = 100_000;

	private readonly keyLength = 32;

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
		return await pbkdf2Async(
			value,
			salt,
			this.iterations,
			this.keyLength,
			this.algorithm,
		);
	}

	private generateSalt(size: number = DEFAULT_SALT_SIZE): string {
		return randomBytes(size).toString("hex");
	}
}

export { BaseEncrypt };
