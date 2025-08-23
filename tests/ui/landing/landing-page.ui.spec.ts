import { test } from "@ui/fixtures/landing-sections.fixture.js";
import { expect } from "@playwright/test";

test.describe("Page Title", async () => {
	test("Landing page has Checkly Title", async ({ page }) => {
		await expect(page).toHaveTitle("Checkly");
	});

	test("Landing page has a favicon", async ({ page }) => {
		const favicon = page.locator(
			'link[rel="icon"][type="image/x-icon"][href="/favicon.ico"]',
		);
		await expect(favicon).toHaveCount(1);
	});
});

test.describe("Header", async () => {
	test("header contains page name", async ({ header }) => {
		await expect(header.getByText("Checkly")).toBeVisible();
	});

	test("header contains page logo", async ({ header }) => {
		const headerLogo = header.locator("img");
		await expect(headerLogo).toBeVisible();
		await expect(headerLogo).toHaveAttribute(
			"alt",
			"Binary Checkly web-application logo",
		);
	});

	test("header Start Quiz and Sign in links", async ({ header }) => {
		await expect(
			header.getByRole("link", { name: "Start quiz" }),
		).toBeVisible();
		await expect(header.getByRole("link", { name: "Sign in" })).toBeVisible();
	});

	test("Sign in button navigates to the sign-in page", async ({ page }) => {
		await page.getByRole("link", { name: "Sign in" }).click();
		const heading = page.getByRole("heading", { name: "Sign In" });
		await expect(heading).toBeVisible();
	});

	test("Star Quiz button navigates to the sign-up page", async ({ page }) => {
		await page.getByRole("link", { name: "Sign in" }).click();
		const heading = page.getByRole("heading", { name: "Sign In" });
		await expect(heading).toBeVisible();
	});
});

test.describe("Hero", async () => {
	test("Hero section has heading", async ({ heroSection }) => {
		const heroHeading = heroSection.getByRole("heading", {
			name: "Create a personal development plan in 2 minutes",
		});
		await expect(heroHeading).toBeVisible();
	});

	test("Hero section has subtitle", async ({ heroSection }) => {
		const subtitle = heroSection.getByText(
			"AI-powered checklist generator for your goals — from fitness to creativity",
		);
		await expect(subtitle).toBeVisible();
	});

	test("Hero section has Start button", async ({ heroSection }) => {
		const startButton = heroSection.getByRole("link", { name: /^start$/i });
		await expect(startButton).toBeVisible();
		await expect(startButton).toHaveAttribute("href", "/test-page");
	});

	test("Hero section has decorative images", async ({ heroSection }) => {
		const images = heroSection.locator("img");
		await expect(images).toHaveCount(5);
	});

	test.skip("Start button redirects to Quiz page", async ({ heroSection }) => {
		await heroSection.getByRole("link", { name: "Start" }).click();
		const start = heroSection.getByRole("heading", {
			name: /^pick the field you'd like to improve$/i,
		});
		await expect(heroSection).toBeVisible();
	});
});

test.describe("How it Works", async () => {
	test("How it Works has a title", async ({ howItWorksSection }) => {
		const howHeading = howItWorksSection.getByRole("heading", {
			name: "How it works",
		});
		await expect(howHeading).toBeVisible();
	});

	test("How it Works has 3-step guide", async ({ howItWorksSection }) => {
		//Only works if they're in order in the html
		const stepsText = await howItWorksSection.textContent();
		expect(stepsText).toContain("1");
		expect(stepsText).toContain("Take the quiz");
		expect(stepsText).toContain("2");
		expect(stepsText).toContain("Get your plan");
		expect(stepsText).toContain("3");
		expect(stepsText).toContain("Download PDF or customize it");
	});

	test("How it Works has decorative images", async ({ howItWorksSection }) => {
		const croissantImg = howItWorksSection.locator('img[src*="croissant"]');
		const laptopImg = howItWorksSection.locator('img[src*="laptop"]');

		await expect(croissantImg).toBeVisible();
		await expect(laptopImg).toBeVisible();

		const arrows = howItWorksSection.locator('img[class*="arrow"]');
		const arrowCount = await arrows.count();
		expect(arrowCount).toBeGreaterThanOrEqual(2);
	});
});

test.describe("Categories", async () => {
	test("Categories has a title", async ({ categoriesSection }) => {
		const categoriesHeading = categoriesSection.getByRole("heading", {
			name: "Categories",
		});
		await expect(categoriesHeading).toBeVisible();
	});

	test("Categories has 6 buttons", async ({ categoriesSection }) => {
		const categoriesButtons = categoriesSection.locator("button");
		await expect(categoriesButtons).toHaveCount(6);
	});

	test("Each button has their corresponding name and an image", async ({
		categoriesSection,
	}) => {
		const categoriesButtons = categoriesSection.locator("button");
		const categoriesTitles = [
			"personal development",
			"spirituality",
			"sport",
			"money",
			"creativity",
			"hobby",
		];

		for (let i = 0; i < categoriesTitles.length; i++) {
			const button = categoriesButtons.nth(i);
			const h2 = button.locator("h3");
			const img = button.locator("img");

			const title = categoriesTitles[i]!;
			await expect(h2).toHaveText(title);
			await expect(img).toBeVisible();
			await expect(button).toHaveAttribute("aria-pressed", /true|false/); //Check if buttons are clickable
		}
	});
});

test.describe("Layouts", async () => {
	test("Layouts section has a title", async ({ layoutsSection }) => {
		const layoutsHeading = layoutsSection.getByRole("heading", {
			name: "Sample visual layouts",
		});
		await expect(layoutsHeading).toBeVisible();
	});

	test("Layouts has example cards", async ({ layoutsSection }) => {
		const layoutsCards = layoutsSection.locator("li");
		const count = await layoutsCards.count();
		expect(count).toBeGreaterThan(5);
	});

	test.skip("Each card has and image and a name", async ({
		layoutsSection,
	}) => {
		const layoutsCards = layoutsSection.locator("li");
		const count = await layoutsCards.count();
		for (let i = 0; i < count; i++) {
			const card = layoutsCards.nth(i);
			const img = card.locator("img");

			await expect(img).toBeVisible();
			await expect(card.locator("h5")).toBeVisible();
		}
	});
});

test.describe("Testimonials", async () => {
	test("Testimonials section has a title", async ({ testimonialsSection }) => {
		const testimonialsHeading = testimonialsSection.getByRole("heading", {
			name: "Testimonials",
		});
		await expect(testimonialsHeading).toBeVisible();
	});

	test("Testimonials has at least 3 cards", async ({ testimonialsSection }) => {
		const testimonialsCards = testimonialsSection.locator('[class*="card"]');
		const count = await testimonialsCards.count();
		expect(count).toBeGreaterThanOrEqual(3);
	});

	test("Each card has some feedback, an avatar and a username", async ({
		testimonialsSection,
	}) => {
		const testimonialsCards = testimonialsSection.locator('[class*="card"]');
		const count = await testimonialsCards.count();
		for (let i = 0; i < count; i++) {
			const card = testimonialsCards.nth(i);

			const text = card.locator("p");
			await expect(text).not.toHaveText("");

			const avatar = card.locator("img");
			await expect(avatar).toBeVisible();
			await expect(avatar).toHaveAttribute("alt", /Roy|Emma|Joan/);
			const userName = card.locator("span");
			await expect(userName).toBeVisible();
		}
	});
});

test.describe("Footer", async () => {
	test("Footer has Checkly logo and text", async ({ footer }) => {
		await expect(footer.getByText("Checkly")).toBeVisible();
		const footerLogo = footer.locator('img[alt*="Checkly"]');
		await expect(footerLogo).toBeVisible();
	});

	test("Footer has legal texts", async ({ footer }) => {
		await expect(footer.getByText("Terms of Service")).toBeVisible();
		await expect(footer.getByText("Privacy Policy")).toBeVisible();
		await expect(footer.getByText("Contact Us")).toBeVisible();
	});

	test("Footer has 3 visible social media icons", async ({ footer }) => {
		const socialIcons = footer.locator("svg");
		const count = await socialIcons.count();
		expect(count).toBe(3);
		for (let i = 0; i < count; i++) {
			await expect(socialIcons.nth(i)).toBeVisible();
		}
	});

	//Change for corresponding links once they're added
	test("Footer elements have corresponding links", async ({ footer }) => {
		const legalLinks = [
			{ name: "Terms of Service", href: "/" },
			{ name: "Privacy Policy", href: "/" },
			{ name: "Contact Us", href: "/" },
		];

		for (const { name, href } of legalLinks) {
			const link = footer.getByRole("link", { name });
			await expect(link, `${name} should be visible`).toBeVisible();
			await expect(link, `${name} should have correct href`).toHaveAttribute(
				"href",
				href,
			);
		}

		const socialLinks = footer.locator('nav[aria-label="Social links"] a');
		const count = await socialLinks.count();

		for (let i = 0; i < count; i++) {
			const link = socialLinks.nth(i);
			await expect(link).toBeVisible();
			await expect(link).toHaveAttribute("href", "/");
		}
	});
});
