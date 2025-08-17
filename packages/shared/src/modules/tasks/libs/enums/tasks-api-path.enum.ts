const TasksApiPath = {
	TASK: "/:id",
	TASK_CREATE: "/",
	TASK_DELETE: "/:id",
	TASK_UPDATE: "/:id",
} as const;

export { TasksApiPath };
