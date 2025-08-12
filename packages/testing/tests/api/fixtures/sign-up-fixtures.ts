import { test as baseTest } from "./base-fixtures";
import { generateUser } from "@test-helpers-api/generators";

export const test = baseTest.extend<{
	validUser: ReturnType<typeof generateUser>;
}>({
	validUser: async ({}, use) => {
		await use(generateUser());
	},
});
