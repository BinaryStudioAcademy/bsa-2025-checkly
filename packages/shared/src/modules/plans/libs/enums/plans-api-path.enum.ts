const PlansApiPath = {
	$ID: "/:id",
	$USER_ID: "/:userId",
	ACTIVE: "/active",
	GENERATE: "/generate",
	REGENERATE: "/:id/regenerate",
	REGENERATE_DAY: "/:planId/days/:dayId/regenerate",
	REGENERATE_TASK: "/:planId/days/:dayId/tasks/:taskId/regenerate",
	ROOT: "/",
	SEARCH: "/search",
} as const;

export { PlansApiPath };
