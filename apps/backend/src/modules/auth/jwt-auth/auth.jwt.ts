import { SignJWT } from "jose";

const rawSecret = process.env["JWT_SECRET"];

if (!rawSecret) {
	throw new Error("Missing JWT_SECRET in .env file");
}

const secret = new TextEncoder().encode(rawSecret);

async function generateJWT(userId: string): Promise<string> {
	const token = await new SignJWT({})
		.setProtectedHeader({ alg: "HS256" })
		.setSubject(userId)
		.setIssuedAt()
		.setExpirationTime("1d")
		.sign(secret);

	return token;
}

export { generateJWT };
