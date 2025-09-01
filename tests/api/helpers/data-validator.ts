import { expect } from "@playwright/test";

export function expectDataToMatch(responseBody: any, expectedData: object) {
	for (const [key, value] of Object.entries(expectedData)) {
		expect(responseBody[key]).toBe(value);
	}
}
