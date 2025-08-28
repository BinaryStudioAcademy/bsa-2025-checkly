import { join } from "path";

/**
 * @type {import("puppeteer").Configuration}
 */

const __dirname = import.meta.dirname;

module.exports = {
	cacheDirectory: join(__dirname, ".cache", "puppeteer"),
};
