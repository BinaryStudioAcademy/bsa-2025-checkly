import { test as baseTest } from "@playwright/test";
import { ApiControllers } from "@tests/api/controllers/api-controllers.js";

export const test = baseTest.extend<{
	api: ApiControllers;
}>({
	api: async ({ request }, use) => {
		const api = new ApiControllers(request);
		await use(api);
	},
});
