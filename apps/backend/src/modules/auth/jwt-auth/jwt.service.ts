import { jwtVerify, SignJWT } from "jose";

import { type JwtPayload } from "../../../libs/types/types.js";

const rawSecret = process.env["JWT_SECRET"];

if (!rawSecret) {
	throw new Error("Missing JWT_SECRET in .env file");
}

const secret = new TextEncoder().encode(rawSecret);

class JWTService {
	async generateToken(userId: string): Promise<string> {
		return await new SignJWT({})
			.setProtectedHeader({ alg: "HS256" })
			.setSubject(userId)
			.setIssuedAt()
			.setExpirationTime("1d")
			.sign(secret);
	}

	async verifyToken(token: string): Promise<JwtPayload> {
		const { payload } = await jwtVerify(token, secret);

		return payload as JwtPayload;
	}
}

export { JWTService };
