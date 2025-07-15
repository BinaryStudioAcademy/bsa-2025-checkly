import baseConfig from "../../lint-staged.config.js";

/** @type {import('lint-staged').Config} */
const config = {
	...baseConfig.default,
	"**/*.css": [() => "npm run lint:css -w frontend"],
	"**/*.{ts,tsx}": [
		() => "npm run lint:js -w frontend",
		() => "npm run lint:type -w frontend",
	],
};

export default config;
