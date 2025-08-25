const PlansApiPath = {
	$ID: "/:id",
	GENERATE: "/generate",
	REGENERATE: "/:id/regenerate",
	ROOT: "/",
	SEARCH: "/search",
} as const;

export { PlansApiPath };
