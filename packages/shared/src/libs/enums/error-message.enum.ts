const ErrorMessage = {
	AUTHENTICATION_FAILED: "Authentication failed.",
	AUTHORIZATION_HEADER_MISSING: "Authorization header is missing or invalid.",
	AVATAR_UPDATE_FAILED: "Failed to update user avatar",
	FAILED_TO_DELETE_PREVIOUS_AVATAR: "Failed to delete previous avatar",
	FAILED_TO_UPLOAD_AVATAR: "Failed to upload avatar to storage",
	FILE_MISSING: "No file uploaded",
	FILE_TOO_LARGE: "File too large (max 2MB)",
	FILE_TYPE_INVALID: "Invalid file type. Allowed: image/png, image/jpeg",
	FORBIDDEN: "Forbidden",
	ID_INVALID: "Invalid user id",
	MISSING_REQUEST: "Missing original request for multipart processing",
	PLAN_DAY_REGENERATION_FAILED: "Failed to regenerate plan day",
	PLAN_NOT_FOUND: "Plan does not exist",
	PLAN_REGENERATION_FAILED: "Failed to regenerate plan",
	TASK_REGENERATION_FAILED: "Failed to regenerate task",
	UNAUTHORIZED_ACCESS: "Unauthorized access",
	USER_NOT_FOUND: "User not found.",
} as const;

export { ErrorMessage };
