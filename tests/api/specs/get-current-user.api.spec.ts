import { test } from "@tests/api/fixtures/base-fixtures.js";

import {
	expectSuccessfulGetCurrentUser,
	expectGetCurrentUserError,
	expectSuccessfulRegistration,
} from "@tests/api/helpers/auth-test-helpers.js";
import { generateUser } from "@test-helpers-api/generators.js";

let currentUser = {};
let currentToken = "";

test.beforeAll(async ({ api }) => {
	const newUser = generateUser();
	const { responseBody } = await expectSuccessfulRegistration(
		api,
		newUser.email,
		newUser.name,
		newUser.password,
	);
	currentUser = {
		...responseBody.user,
	};
	currentToken = responseBody.token;
});

test("[CHECKLY-58] Fetch authenticated user with a valid JWT token", async ({
	api,
}) => {
	await expectSuccessfulGetCurrentUser(api, currentToken, currentUser);
});

test.describe("[CHECKLY-57] Fetch authenticated user with an invalid JWT token", async () => {
	const invalidTokenTests = [
		{ name: "Invalid Token Format", value: "invalid-token-format" },
		{
			name: "Valid Format but Altered",
			value:
				"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc1Mzg4NzY1Dg3NjU1fQ.0xjdSQDySZYHxn9q-TZknKdC1_DJzQirzZPh8RHbWREvalid-but-altered",
		},
	];

	for (const testCase of invalidTokenTests) {
		test(testCase.name, async ({ api }) => {
			await expectGetCurrentUserError(api, testCase.value);
		});
	}
});

test("[CHECKLY-56] Fetch authenticated user without a JWT token", async ({
	api,
}) => {
	await expectGetCurrentUserError(api, "");
});
