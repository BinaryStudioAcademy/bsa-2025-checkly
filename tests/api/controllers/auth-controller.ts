import { type APIRequestContext, type APIResponse } from "@playwright/test";

export class AuthController {
	constructor(private requestContext: APIRequestContext) {}

	async getCurrentUser(token: string): Promise<APIResponse> {
		const response = await this.requestContext.get("v1/auth/me", {
			headers: token
				? {
						Authorization: `Bearer ${token}`,
					}
				: {},
		});

		return response;
	}

	async login(email: string, password: string): Promise<APIResponse> {
		const response = await this.requestContext.post("v1/auth/login", {
			data: {
				email,
				password,
			},
		});

		return response;
	}

	async register(
		email: string,
		name: string,
		password: string,
	): Promise<APIResponse> {
		const response = await this.requestContext.post("v1/auth/register", {
			data: {
				email,
				name,
				password,
			},
		});

		return response;
	}
}
