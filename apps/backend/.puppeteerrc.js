import { fileURLToPath } from "url";
import { dirname, join } from "path";

/**
 * @type {import("puppeteer").Configuration}
 */
const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
	cacheDirectory: join(__dirname, ".cache", "puppeteer"),
};
