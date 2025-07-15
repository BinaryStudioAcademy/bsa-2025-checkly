import baseConfig from "../../lint-staged.config.js";

/** @type {import('lint-staged').Config} */
const config = {
	...baseConfig.default,
	"**/*.ts": [
		() => "npm run lint:js -w shared",
		() => "npm run lint:type -w shared",
	],
};

export default config;
