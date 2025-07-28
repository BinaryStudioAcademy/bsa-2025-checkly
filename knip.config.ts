import { type KnipConfig } from "knip";

const config: KnipConfig = {
	ignoreDependencies: ["dotenv"],
	prettier: ["./prettier.config.js"],
	stylelint: ["./stylelint.config.js"],
	workspaces: {
		".": {
			entry: ["./dangerfile.ts"],
		},
		"apps/backend": {
			entry: ["src/db/migrations/*.ts", "knexfile.ts"],
			ignoreDependencies: ["pg"],
		},
		"apps/frontend": {
			entry: ["src/index.tsx"],
		},
		"packages/shared": {},
	},
};

export default config;
