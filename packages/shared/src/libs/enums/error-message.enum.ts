const ErrorMessage = {
	AUTHENTICATION_FAILED: "Authentication failed.",
	AUTHORIZATION_HEADER_MISSING: "Authorization header is missing or invalid.",
	AVATAR_UPDATE_FAILED: "Failed to update user avatar",
	FILE_MISSING: "No file uploaded",
	FILE_TOO_LARGE: "File too large (max 2MB)",
	FILE_TYPE_INVALID: "Invalid file type. Allowed: image/png, image/jpeg",
	FORBIDDEN: "Forbidden",
	ID_INVALID: "Invalid user id",
	MISSING_REQUEST: "Missing original request for multipart processing",
	UNAUTHORIZED_ACCESS: "Unauthorized access",
	USER_NOT_FOUND: "User not found.",
} as const;

export { ErrorMessage };
