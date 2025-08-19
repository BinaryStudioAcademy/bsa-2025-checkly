const PlansApiPath = {
	$ID: "/:id",
	$USER_ID: "/:userId",
	GENERATE: "/generate",
	REGENERATE: "/:id/regenerate",
	REGENERATE_DAY: "/:planId/days/:dayId/regenerate",
	REGENERATE_TASK: "/:planId/days/:dayId/tasks/:taskId/regenerate",
	ROOT: "/",
} as const;

export { PlansApiPath };
