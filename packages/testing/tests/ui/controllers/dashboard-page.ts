// ui/controllers/dashboard-page.ts
import { Page, Locator, expect } from "@playwright/test";

export class DashboardPage {
	constructor(private readonly page: Page) {}

	get nav(): Locator {
		return this.page.getByRole("navigation");
	}
	get linkDashboard(): Locator {
		return this.nav.getByRole("link", { name: /^Dashboard$/ });
	}
	get linkMyPlan(): Locator {
		return this.nav.getByRole("link", { name: /My plan/i });
	}

	async expectLoaded() {
		await expect(this.page).toHaveURL(/\/dashboard\/?$/);
		await expect(this.linkDashboard).toBeVisible();
		await expect(this.linkMyPlan).toBeVisible();
	}
}
