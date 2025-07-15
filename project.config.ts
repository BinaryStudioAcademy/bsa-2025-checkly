const ProjectPrefix = {
	APP: "cy",
	CHANGE_TYPES: [
		"build",
		"chore",
		"ci",
		"docs",
		"feat",
		"fix",
		"perf",
		"refactor",
		"revert",
		"style",
		"test",
	],
	ENVIRONMENT: "main",
	ISSUE_PREFIXES: ["cy", "release"],
	SCOPES: {
		APPS: ["frontend", "backend"],
		PACKAGES: ["main", "shared"],
	},
} as const;

export { ProjectPrefix };
