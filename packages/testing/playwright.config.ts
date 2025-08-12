import { defineConfig, devices } from "@playwright/test";
import path from "node:path";
import fs from "node:fs";
import dotenv from "dotenv";
// --- Load .env from the package folder (works even if you don't use dotenv-cli)
const pkgDir = __dirname; // packages/testing
const nodeEnv = process.env["NODE_ENV"];
const envHint = nodeEnv === "production" ? ".env.production" : ".env.local";
const candidateEnvs = [
	path.resolve(pkgDir, envHint),
	path.resolve(pkgDir, ".env"), // fallback
];

for (const p of candidateEnvs) {
	if (fs.existsSync(p)) {
		dotenv.config({ path: p });
		break;
	}
}

// --- Helper to read env vars without TS warnings
const env = (k: string, fallback?: string) => process.env[k] ?? fallback;

// --- Required environment variables (with sane defaults for local dev)
const FRONTEND_URL = env("FRONTEND_URL", "http://localhost:3000/");
const API_URL = env("API_URL", "http://localhost:3001/api/v1/");
// Build the base config
const cfg: Parameters<typeof defineConfig>[0] = {
	testDir: ".",
	outputDir: "/test-results",
	reporter: [["list"], ["html", { open: "never" }]],

	timeout: 30_000,
	expect: { timeout: 5_000 },
	fullyParallel: true,
	forbidOnly: !!process.env["CI"],
	retries: process.env["CI"] ? 1 : 0,
	use: {
		baseURL: FRONTEND_URL,
		trace: "on-first-retry",
		screenshot: "only-on-failure",
		video: "retain-on-failure",
		actionTimeout: 10_000,
	},
	projects: [
		{
			name: "ui",
			testDir: path.resolve(pkgDir, "tests/ui"),
			use: {
				baseURL: FRONTEND_URL,
				...devices["Desktop Chrome"],
			},
		},
		{
			name: "api",
			testDir: path.resolve(pkgDir, "tests/api"),
			use: {
				baseURL: API_URL,
			},
		},
	],
};

// Add workers only in CI
if (process.env["CI"]) {
	(cfg as any).workers = 2;
}

export default defineConfig(cfg);
