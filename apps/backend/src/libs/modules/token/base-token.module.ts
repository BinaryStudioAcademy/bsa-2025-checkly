import { jwtVerify, SignJWT } from "jose";

import { type JwtPayload } from "../../../libs/types/types.js";

type Constructor = {
	duration: string;
	encryption: string;
	secret: Uint8Array;
};

class BaseTokenModule {
	private readonly duration: string;
	private readonly encryption: string;
	private readonly secret: Uint8Array;

	constructor({ duration, encryption, secret }: Constructor) {
		this.duration = duration;
		this.encryption = encryption;
		this.secret = secret;
	}

	async generateToken(userId: number): Promise<string> {
		return await new SignJWT({})
			.setProtectedHeader({ alg: this.encryption })
			.setSubject(userId.toString())
			.setIssuedAt()
			.setExpirationTime(this.duration)
			.sign(this.secret);
	}

	async verifyToken(token: string): Promise<JwtPayload> {
		const { payload } = await jwtVerify(token, this.secret);

		return payload as JwtPayload;
	}
}

export { BaseTokenModule };
