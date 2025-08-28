const TaskNotificationMessage = {
	DELETE_ERROR: "Error deleting task. Please try again.",
	DELETE_SUCCESS: "Task deleted successfully",
	REGENERATE_ERROR: "Error regenerating task. Please try again.",
	REGENERATE_SUCCESS: "Task regenerated successfully",
	UPDATE_ERROR: "Failed to update task",
	UPDATE_SUCCESS: "Task updated successfully",
} as const;

export { TaskNotificationMessage };
