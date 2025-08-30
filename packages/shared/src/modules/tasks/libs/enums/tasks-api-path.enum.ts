const TasksApiPath = {
	TASK: "/:id",
	TASK_CREATE: "/",
	TASK_DELETE: "/:id",
	TASK_UPDATE: "/:id",
	TASKS_UPDATE: "/",
} as const;

export { TasksApiPath };
