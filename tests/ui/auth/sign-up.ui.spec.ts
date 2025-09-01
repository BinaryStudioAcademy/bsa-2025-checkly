import { SignUpPage } from "@tests/ui/controllers/sign-up-page.js";
import {
	uniqueEmail,
	validName,
	validPassword,
} from "@tests/ui/helpers/user-data.js";
// tests/ui/auth/sign-up.ui.spec.ts
import { expect, test } from "@ui/fixtures/user.fixture.js";
import { signUpUser } from "@ui/helpers/auth.js";

test.describe("[Sign up - UI] Consolidated suite", () => {
	test.afterEach(async ({ page }) => {
		// Explicit refresh between tests (isolation already exists, but requested)
		await page.reload();
	});

	// 1) Required elements are visible and typed correctly
	test("[Sign up - UI] All required form elements are visible and properly configured", async ({
		page,
	}) => {
		const signUp = new SignUpPage(page);
		await signUp.goto();
		await signUp.validateRequiredFieldsVisibleAndTyped();
	});

	// 2) Required-field behavior (prevent submission with missing inputs)
	test.describe("[Sign up - UI] Fields are marked as required", () => {
		test.beforeEach(async ({ page }) => {
			const signUp = new SignUpPage(page);
			await signUp.goto();
		});

		test("Blocks submission when all fields are empty", async ({ page }) => {
			const signUp = new SignUpPage(page);
			await signUp.submit();
			await signUp.expectOnRegisterUrl();
			await expect(signUp.invalidInputs.first()).toBeVisible(); // <- POM locator
		});

		test("Blocks submission when only Name is filled", async ({ page }) => {
			const signUp = new SignUpPage(page);
			await signUp.fillName(validName());
			await signUp.submit();
			await signUp.expectOnRegisterUrl();
			await expect(signUp.invalidInputs.first()).toBeVisible(); // <- POM locator
		});

		test("Blocks submission when Email is filled but Password empty", async ({
			page,
		}) => {
			const signUp = new SignUpPage(page);
			await signUp.fillName(validName());
			await signUp.fillEmail(uniqueEmail());
			await signUp.submit();
			await signUp.expectOnRegisterUrl();
			await expect(signUp.invalidInputs.first()).toBeVisible(); // <- POM locator
		});

		test("Blocks submission when Password is filled but Confirm Password empty", async ({
			page,
		}) => {
			const signUp = new SignUpPage(page);
			await signUp.fillName(validName());
			await signUp.fillEmail(uniqueEmail());
			await signUp.fillPassword("Password123");
			await signUp.submit();
			await signUp.expectOnRegisterUrl();
			await expect(signUp.invalidInputs.first()).toBeVisible(); // <- POM locator
		});
	});

	// 3) Happy path – successful submission
	test.describe("[Sign up - UI] Successful form submission redirects or shows success message", () => {
		// Run multiple times to mimic parametrized data from the JSON using faker-backed helpers
		for (let index = 0; index < 6; index++) {
			test(`Succeeds with valid, faker-generated data #${index + 1}`, async ({
				page,
			}) => {
				const signUp = new SignUpPage(page);
				await signUp.goto();

				const name = validName();
				const email = uniqueEmail();
				const password = validPassword();

				await signUp.fillForm({
					confirmPassword: password,
					email,
					name,
					password,
				});
				await signUp.submit();
				await signUp.expectSuccessRedirect();
			});
		}
	});

	// 4) Already-registered email error
	test("[Sign up - UI] Attempt to register with an already registered email", async ({
		page,
	}) => {
		const email = uniqueEmail();
		const password = validPassword();
		const name = validName();

		// Pre-create the account through API; tolerate existing to keep test idempotent
		await signUpUser(email, password, name, { tolerateExisting: true });

		const signUp = new SignUpPage(page);
		await signUp.goto();
		await signUp.fillForm({ confirmPassword: password, email, name, password });
		await signUp.submit();

		await expect(signUp.emailInUseError).toBeVisible({ timeout: 10_000 });
		await signUp.expectOnRegisterUrl();
	});

	// 5) Mismatched password confirmation
	test("[Sign up - UI] Password and confirm password must match", async ({
		page,
	}) => {
		const signUp = new SignUpPage(page);
		await signUp.goto();

		await signUp.fillForm({
			confirmPassword: "Password456",
			email: uniqueEmail(),
			name: validName(),
			password: "Password123",
		});
		await signUp.submit();

		await signUp.expectOnRegisterUrl();
		await expect(signUp.passwordMismatchError).toBeVisible();
	});

	// 6) Invalid email format matrix (static negative samples are acceptable)
	test.describe("[Sign up - UI] Shows error when email format is invalid", () => {
		const invalidEmails = [
			"plainaddress",
			"@missinglocal.com",
			"user@",
			".user@domain.com",
			"user.@domain.com",
			"user@-domain.com",
			"user@domain-.com",
			"user@domain..com",
			"user@.domain.com",
			"user@domain_.com",
		];

		for (const [index, badEmail] of invalidEmails.entries()) {
			test(`Invalid email format #${index + 1}: ${badEmail}`, async ({
				page,
			}) => {
				const signUp = new SignUpPage(page);
				await signUp.goto();

				await signUp.fillForm({
					confirmPassword: "Password123",
					email: badEmail,
					name: validName(),
					password: "Password123",
				});
				await signUp.submit();

				await signUp.expectOnRegisterUrl();
				await expect(signUp.emailFormatError).toBeVisible({ timeout: 10_000 });
			});
		}
	});

	// 7) Weak/invalid password matrix (static negative samples accepted)
	test.describe("[Sign up - UI] Shows error when password is weak or invalid", () => {
		const weakPasswords = [
			"short1A", // too short
			"nouppercase123", // no uppercase
			"NOLOWERCASE123,", // no lowercase (includes comma)
			"NoDigitsHere!", // no digits
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1a", // > 32 chars
		];

		for (const [index, pwd] of weakPasswords.entries()) {
			test(`Weak/invalid password #${index + 1}`, async ({ page }) => {
				const signUp = new SignUpPage(page);
				await signUp.goto();

				await signUp.fillForm({
					confirmPassword: pwd,
					email: uniqueEmail(),
					name: validName(),
					password: pwd,
				});
				await signUp.submit();

				await signUp.expectOnRegisterUrl();
				await expect(signUp.passwordPolicyError).toBeVisible({
					timeout: 10_000,
				});
			});
		}
	});

	// 8) Invalid name length (static edge cases)
	test.describe("[Sign up - UI] Registration fails when name has invalid length", () => {
		const badNames = ["Vi", "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"]; // <3 and >32

		for (const [index, badName] of badNames.entries()) {
			test(`Invalid name length #${index + 1}`, async ({ page }) => {
				const signUp = new SignUpPage(page);
				await signUp.goto();

				await signUp.fillForm({
					confirmPassword: "Password123",
					email: uniqueEmail(),
					name: badName,
					password: "Password123",
				});
				await signUp.submit();

				await signUp.expectOnRegisterUrl();
				await expect(signUp.nameLengthError).toBeVisible({ timeout: 10_000 });
			});
		}
	});
});
