const PlansApiPath = {
	PLAN: "/:id",
	PLAN_CREATE: "/",
	PLAN_GENERATE: "/generate",
	PLAN_STYLE: "/:id/style",
	ROOT: "/",
	SEARCH: "/search",
} as const;

export { PlansApiPath };
