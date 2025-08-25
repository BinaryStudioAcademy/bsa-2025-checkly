const PlansApiPath = {
	$ID: "/:id",
	GENERATE: "/generate",
	PLAN_STYLE: "/:id/style",
	REGENERATE: "/:id/regenerate",
	ROOT: "/",
	SEARCH: "/search",
} as const;

export { PlansApiPath };
