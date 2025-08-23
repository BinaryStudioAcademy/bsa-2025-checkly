// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";

function readEnv(file: string): Record<string, string> {
	try {
		const abs = path.resolve(__dirname, file);
		if (fs.existsSync(abs)) {
			return dotenv.parse(fs.readFileSync(abs));
		}
	} catch {}
	return {};
}
function ensureLeadingSlash(s: string) {
	if (!s) return "";
	return s.startsWith("/") ? s : `/${s}`;
}
function joinUrl(base: string, segment: string) {
	const b = base.replace(/\/+$/, "");
	const s = ensureLeadingSlash(segment);
	return `${b}${s}`;
}

const feEnv = readEnv("apps/frontend/.env"); // VITE_APP_API_ORIGIN_URL, VITE_APP_DEVELOPMENT_PORT
const beEnv = readEnv("apps/backend/.env"); // HOST, PORT

// Backend origin
const BE_HOST = beEnv["HOST"] || "localhost";
const BE_PORT = Number(beEnv["PORT"] || 3001);
const BACKEND_ORIGIN = `http://${BE_HOST}:${BE_PORT}`;

const API_PREFIX = ensureLeadingSlash(
	feEnv["VITE_APP_API_ORIGIN_URL"] || "/api/v1",
);

// Frontend origin
const FE_PORT = Number(feEnv["VITE_APP_DEVELOPMENT_PORT"] || 3000);
const FRONTEND_ORIGIN = `http://localhost:${FE_PORT}`;

const API_BASE_URL = joinUrl(BACKEND_ORIGIN, API_PREFIX);
const WEB_BASE_URL = FRONTEND_ORIGIN;

export default defineConfig({
	testDir: "./tests",

	fullyParallel: true,
	forbidOnly: false,
	retries: 0,
	workers: undefined,

	reporter: [["list"], ["html", { open: "never" }]],

	use: {
		trace: "on-first-retry",
		screenshot: "only-on-failure",
		video: "retain-on-failure",
	},

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
});
