// ui/controllers/dashboard-page.ts
import { expect, type Locator, type Page } from "@playwright/test";

export class DashboardPage {
	get linkDashboard(): Locator {
		return this.nav.getByRole("link", { name: /^Dashboard$/ });
	}

	get linkMyPlan(): Locator {
		return this.nav.getByRole("link", { name: /My plan/i });
	}
	get nav(): Locator {
		return this.page.getByRole("navigation");
	}
	constructor(private readonly page: Page) {}

	async expectLoaded() {
		await expect(this.page).toHaveURL(/\/dashboard\/?$/);
		await expect(this.linkDashboard).toBeVisible();
		await expect(this.linkMyPlan).toBeVisible();
	}
}
