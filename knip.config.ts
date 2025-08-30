import { type KnipConfig } from "knip";

const config: KnipConfig = {
	ignore: [
		"apps/frontend/src/assets/img/shared/avatars/avatars.img.tsx",
		"apps/frontend/src/assets/img/shared/illustrations/categories/categories.img.tsx",
		"apps/frontend/src/assets/img/shared/illustrations/layouts/layouts.img.tsx",
		"apps/frontend/src/assets/img/shared/illustrations/illustrations.img.tsx",
		"apps/frontend/src/assets/img/shared/shapes/shapes.img.tsx",
		"apps/frontend/src/libs/modules/api/schema/generated.ts",
		"apps/backend/.puppeteerrc.js",
	],
	prettier: ["./prettier.config.js"],
	stylelint: ["./stylelint.config.js"],
	workspaces: {
		".": {
			entry: ["./dangerfile.ts"],
		},
		"apps/backend": {
			entry: ["src/db/migrations/*.ts", "src/db/seeds/*.ts", "knexfile.ts"],
			ignoreDependencies: ["pg"],
		},
		"apps/frontend": {
			entry: ["src/index.tsx"],
		},
		"packages/shared": {},
	},
};

export default config;
