import { test as base, expect as baseExpect } from "@playwright/test";
import { test, expect } from "@ui/fixtures/user.fixture.js";
import { SignInPage } from "@tests/ui/controllers/signin-page.js";
import { signUpUser } from "@ui/helpers/auth.js";
import { DashboardPage } from "@ui/controllers/dashboard-page.js";

test.describe("[Sign in - UI] Consolidated suite", () => {
	test.afterEach(async ({ page }) => {
		// Refresh between tests as requested
		await page.reload();
	});

	test("[Sign in - UI] All required fields are visible and properly configured", async ({
		page,
	}) => {
		const signInPage = new SignInPage(page);
		await signInPage.goto();

		await expect(signInPage.emailInput).toBeVisible();
		await expect(signInPage.emailInput).toHaveAttribute("type", "email");
		await expect(signInPage.emailInput).toHaveAttribute(
			"placeholder",
			"Enter your email",
		);

		await expect(signInPage.passwordInput).toBeVisible();
		await expect(signInPage.passwordInput).toHaveAttribute("type", "password");
		await expect(signInPage.passwordInput).toHaveAttribute(
			"placeholder",
			"Enter your password",
		);

		await expect(signInPage.submitButton).toBeVisible();
	});

	test.describe("[Sign In - UI] Form validation highlights required fields", () => {
		test.beforeEach(async ({ page }) => {
			const signInPage = new SignInPage(page);
			await signInPage.goto();
		});

		test("Should mark both email and password as invalid when both are empty", async ({
			page,
		}) => {
			const signInPage = new SignInPage(page);
			await signInPage.submit();

			const invalidInputs = signInPage.invalidInputs;
			await expect(invalidInputs).toHaveCount(2);
		});

		test("Should mark email as invalid when only password is filled", async ({
			page,
		}) => {
			const signInPage = new SignInPage(page);
			await signInPage.passwordInput.fill("SomePassword123");
			await signInPage.submit();

			const invalidInputs = signInPage.invalidInputs;
			await expect(invalidInputs).toHaveCount(1);
			await expect(invalidInputs.first()).toHaveAttribute("name", "email");
		});

		test("Should mark password as invalid when only email is filled", async ({
			page,
		}) => {
			const signInPage = new SignInPage(page);
			await signInPage.emailInput.fill("user@example.com");
			await signInPage.submit();

			const invalidInputs = signInPage.invalidInputs;
			await expect(invalidInputs).toHaveCount(1);
			await expect(invalidInputs.first()).toHaveAttribute("name", "password");
		});
	});

	test.describe("[Sign In - UI] Invalid email format blocks submission (backend validation)", () => {
		const invalidEmails = [
			"emoji😊@invalid-characters.com",
			"测试电子邮件@invalid-characters.com",
			"invalid-format.com",
			"missing-at-symbol.com",
			"missing-domain@",
			".startdot@test.com",
			"enddot.@test.com",
			"do..uble@test.com",
			"user@-domain.com",
			"user@domain-.com",
			"user@.domain.com",
			"user@domain.com.",
		];

		test.beforeEach(async ({ page }) => {
			const signInPage = new SignInPage(page);
			await signInPage.goto();
		});

		for (const email of invalidEmails) {
			test(`Displays error for invalid email format: "${email}"`, async ({
				page,
			}) => {
				const signInPage = new SignInPage(page);
				await signInPage.fillForm(email, "ValidPassword123");
				await signInPage.submit();

				// Retry-safe backend error validation
				await expect(signInPage.emailFormatError).toBeVisible({
					timeout: 10000,
				});

				// Assert user is still on Sign In page
				await expect(page).toHaveURL(/sign-in/);
			});
		}
	});

	test.describe("[Sign In - UI] Invalid password format blocks submission (backend validation)", () => {
		const invalidPasswords = [
			{ password: "Pa1", reason: "too short" },
			{ password: "password1", reason: "no uppercase" },
			{ password: "PASSWORD1", reason: "no lowercase" },
			{ password: "Password", reason: "no digits" },
			{
				password: "Password1234567891011121314151617181920",
				reason: "too long",
			},
			{ password: "Password 1", reason: "contains space" },
		];

		test.beforeEach(async ({ page }) => {
			const signInPage = new SignInPage(page);
			await signInPage.goto();
		});

		for (const { password, reason } of invalidPasswords) {
			test(`Displays error for invalid password: ${reason}`, async ({
				page,
			}) => {
				const signInPage = new SignInPage(page);
				await signInPage.fillForm("user@example.com", password);
				await signInPage.submit();

				await expect(signInPage.passwordPolicyError).toBeVisible();
			});
		}
	});

	test.describe("[Sign In - UI] Unsuccessful login - invalid credentials", () => {
		test.beforeEach(async ({ page }) => {
			const signInPage = new SignInPage(page);
			await signInPage.goto();
		});

		test("Displays error when credentials are invalid", async ({ page }) => {
			const signInPage = new SignInPage(page);
			await signInPage.fillForm("sadasdas@asdasd.com", "WrongPassword123");
			await signInPage.submit();

			await expect(signInPage.invalidCredentialsError).toBeVisible();
		});
	});

	test.describe("[Sign In - UI] Unsuccessful login - incorrect password", () => {
		test('Shows "Invalid credentials" when password is wrong', async ({
			page,
		}) => {
			const email = "test@email.com";
			const correctPassword = "CorrectPass123";
			const wrongPassword = "WrongPass123";

			// Arrange: create a valid user via API
			await signUpUser(email, correctPassword);

			// Act: attempt login with wrong password
			const signIn = new SignInPage(page);
			await signIn.goto();
			await signIn.fillForm(email, wrongPassword);
			await signIn.submit();

			// Assert: toast/banner should show the generic error
			await expect(signIn.invalidCredentialsError).toBeVisible();
		});
	});

	test.describe("[Sign in - UI] Successful login redirects to dashboard", () => {
		test("Redirects to dashboard on successful login", async ({
			page,
			testUser,
		}) => {
			// Arrange
			const signIn = new SignInPage(page);
			const dashboard = new DashboardPage(page);

			// Act
			await signIn.goto();
			await signIn.fillForm(testUser.email, testUser.password);
			await signIn.submit();

			// Assert #1: user is redirected to /dashboard
			await dashboard.expectLoaded();

			// Assert #2: dashboard-specific content is visible
			await expect(dashboard.linkDashboard).toBeVisible();
			await expect(dashboard.linkMyPlan).toBeVisible();

			// Assert #3 (optional): sign-in form is no longer present
			await expect(signIn.submitButton).toHaveCount(0);
		});
	});

	test.describe("[Sign In - UI] Redirect to intended route after login", () => {
		test("Navigates to protected route after successful login", async ({
			page,
			testUser,
		}) => {
			// Step 1: Visit a protected page without being signed in
			await page.goto("/dashboard");
			await expect(page).toHaveURL(/\/sign-in\/?$/);

			// Step 2: Sign in
			const signIn = new SignInPage(page);
			await signIn.fillForm(testUser.email, testUser.password);
			await signIn.submit();

			// Step 3: Validate user lands on intended protected route
			await expect(page).toHaveURL(/\/dashboard\/?$/);
		});
	});
});
