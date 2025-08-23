import { expect } from "@playwright/test";

import { ApiControllers } from "@tests/api/controllers/api-controllers.js";
import {
	registerResponseSchema,
	loginResponseSchema,
	getCurrentUserSchema,
} from "@tests/api/schemas/auth-schemas.js";
import { errorSchema } from "@tests/api/schemas/error-schemas.js";
import { expectToMatchSchema } from "@test-helpers-api/schema-validator.js";
import { expectDataToMatch } from "@test-helpers-api/data-validator.js";

export async function expectSuccessfulRegistration(
	api: ApiControllers,
	email: string,
	name: string,
	password: string,
) {
	const response = await api.auth.register(email, name, password);
	const responseBody = await response.json();

	expect(response.status(), "Status Code should be 201").toBe(201);
	expectToMatchSchema(responseBody, registerResponseSchema);
	expectDataToMatch(responseBody.user, { email, name });

	return { response, responseBody };
}

export async function expectRegistrationError(
	api: ApiControllers,
	email: string,
	name: string,
	password: string,
	expectedStatus: number,
	expectedMessage?: string,
) {
	const response = await api.auth.register(email, name, password);
	const responseBody = await response.json();

	expect(response.status()).toBe(expectedStatus);
	expectToMatchSchema(responseBody, errorSchema);

	if (expectedMessage) {
		expect(responseBody.message).toBe(expectedMessage);
	}

	return { response, responseBody };
}

export async function expectSuccessfulLogin(
	api: ApiControllers,
	email: string,
	password: string,
) {
	const response = await api.auth.login(email, password);
	const responseBody = await response.json();

	expect(response.status(), "Status Code should be 200").toBe(200);
	expectToMatchSchema(responseBody, loginResponseSchema);
	expectDataToMatch(responseBody.user, { email });

	return { response, responseBody };
}

export async function expectLoginError(
	api: ApiControllers,
	email: string,
	password: string,
	expectedStatus: number,
	expectedMessage?: string,
) {
	const response = await api.auth.login(email, password);
	const responseBody = await response.json();

	expect(response.status()).toBe(expectedStatus);
	expectToMatchSchema(responseBody, errorSchema);

	if (expectedMessage) {
		expect(responseBody.message).toBe(expectedMessage);
	}

	return { response, responseBody };
}

export async function expectSuccessfulGetCurrentUser(
	api: ApiControllers,
	token: string,
	user: object,
) {
	const response = await api.auth.getCurrentUser(token);
	const responseBody = await response.json();

	expect(response.status(), "Status Code should be 200").toBe(200);
	expectToMatchSchema(responseBody, getCurrentUserSchema);
	expectDataToMatch(responseBody, user);

	return { response, responseBody };
}

export async function expectGetCurrentUserError(
	api: ApiControllers,
	token: string,
) {
	const response = await api.auth.getCurrentUser(token);
	const responseBody = await response.json();

	expect(response.status(), "Status Code should be 401").toBe(401);
	expectToMatchSchema(responseBody, errorSchema);
	expect(responseBody.message).toBe("Authentication failed.");

	return { response, responseBody };
}
