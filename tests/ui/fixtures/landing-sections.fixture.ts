import { test as base, type Locator, type Page } from "@playwright/test";

//export Locators for each segment of the page. Using "sectionSection" format for segments that have the <section> tag
export const test = base.extend<{
	categoriesSection: Locator;
	footer: Locator;
	header: Locator;
	heroSection: Locator;
	howItWorksSection: Locator;
	layoutsSection: Locator;
	page: Page;
	testimonialsSection: Locator;
}>({
	categoriesSection: async ({ page }, use) => {
		const section = page.locator("section", { hasText: /^categories/i });
		await use(section);
	},

	footer: async ({ page }, use) => {
		const footer = page.locator("footer");
		await use(footer);
	},

	header: async ({ page }, use) => {
		const section = page.locator("header");
		await use(section);
	},

	heroSection: async ({ page }, use) => {
		const section = page.locator("section", {
			hasText: /^create a personal development plan/i,
		});
		await use(section);
	},

	howItWorksSection: async ({ page }, use) => {
		const section = page.locator("section", { hasText: /^how it works/i });
		await use(section);
	},

	layoutsSection: async ({ page }, use) => {
		const section = page.locator("section", {
			hasText: /^Sample visual layouts/i,
		});
		await use(section);
	},

	page: async ({ page }, use) => {
		await page.goto("/");
		await use(page);
	},

	testimonialsSection: async ({ page }, use) => {
		const section = page.locator("section", { hasText: /^testimonials/i });
		await use(section);
	},
});
