import { Page, Locator, expect } from "@playwright/test";

export class SignInPage {
	readonly page: Page;
	readonly emailInput: Locator;
	readonly passwordInput: Locator;
	readonly submitButton: Locator;
	readonly linkToSignUp: Locator;

	constructor(page: Page) {
		this.page = page;
		this.emailInput = page.getByPlaceholder("Enter your email");
		this.passwordInput = page.getByPlaceholder("Enter your password");
		this.submitButton = page.getByRole("button", { name: /sign in/i });
		this.linkToSignUp = page.getByRole("link", { name: /create an account/i });
	}

	async goto() {
		await this.page.goto("/sign-in", { waitUntil: "domcontentloaded" });
		await expect(this.page).toHaveURL(/\/sign-in\/?$/);
		await expect(this.submitButton).toBeVisible();
	}

	get invalidInputs() {
		return this.page.locator("input:invalid");
	}
	get invalidCredentialsError() {
		return this.page.getByText(/invalid credentials/i);
	}
	get emailFormatError() {
		return this.page.getByText(/email is not in a valid format|invalid email/i);
	}
	get passwordPolicyError() {
		return this.page.getByText(
			/password should contain between 8 to 32 characters/i,
		);
	}

	async fillForm(email: string, password: string) {
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
	}

	async submit() {
		await this.submitButton.click();
	}
}
