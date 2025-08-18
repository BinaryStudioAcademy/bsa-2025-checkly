const PlansApiPath = {
	$ID: "/:id",
	GENERATE: "/generate",
	REGENERATE: "/:id/regenerate",
	REGENERATE_DAY: "/:planId/regenerate-day",
	ROOT: "/",
} as const;

export { PlansApiPath };
