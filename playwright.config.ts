// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import * as fs from "node:fs";
import * as path from "node:path";

function ensureLeadingSlash(s: string) {
	if (!s) {
		return "";
	}

	return s.startsWith("/") ? s : `/${s}`;
}

function joinUrl(base: string, segment: string) {
	const b = base.replace(/\/+$/, "");
	const s = ensureLeadingSlash(segment);

	return `${b}${s}`;
}

function readEnvironment(file: string): Record<string, string> {
	try {
		const abs = path.resolve(__dirname, file);

		if (fs.existsSync(abs)) {
			return dotenv.parse(fs.readFileSync(abs));
		}
	} catch {}

	return {};
}

const feEnvironment = readEnvironment("apps/frontend/.env"); // VITE_APP_API_ORIGIN_URL, VITE_APP_DEVELOPMENT_PORT
const beEnvironment = readEnvironment("apps/backend/.env"); // HOST, PORT

// Backend origin
const BE_HOST = beEnvironment["HOST"] || "localhost";
const BE_PORT = Number(beEnvironment["PORT"] || 3001);
const BACKEND_ORIGIN = `http://${BE_HOST}:${BE_PORT}`;

const API_PREFIX = ensureLeadingSlash(
	feEnvironment["VITE_APP_API_ORIGIN_URL"] || "/api/v1",
);

// Frontend origin
const FE_PORT = Number(feEnvironment["VITE_APP_DEVELOPMENT_PORT"] || 3000);
const FRONTEND_ORIGIN = `http://localhost:${FE_PORT}`;

const API_BASE_URL = joinUrl(BACKEND_ORIGIN, API_PREFIX);
const WEB_BASE_URL = FRONTEND_ORIGIN;

export default defineConfig({
	forbidOnly: false,

	fullyParallel: true,
	projects: [
		{
			name: "api",
			testMatch: /.*api\.spec\.ts$/,
			use: {
				baseURL: API_BASE_URL,
				extraHTTPHeaders: { "content-type": "application/json" },
			},
		},
		{
			name: "ui",
			testMatch: /.*ui\.spec\.ts$/,
			use: {
				...devices["Desktop Chrome"],
				baseURL: WEB_BASE_URL,
			},
		},
	],
	reporter: [["list"], ["html", { open: "never" }]],
	retries: 0,

	testDir: "./tests",

	use: {
		screenshot: "only-on-failure",
		trace: "on-first-retry",
		video: "retain-on-failure",
	},

	workers: undefined,
});
