const PlansApiPath = {
	$ID: "/:id",
	GENERATE: "/generate",
	REGENERATE: "/:id/regenerate",
	REGENERATE_DAY: "/:planId/days/:dayId/regenerate",
	REGENERATE_TASK: "/:planId/days/:dayId/tasks/:taskId/regenerate",
	ROOT: "/",
} as const;

export { PlansApiPath };
