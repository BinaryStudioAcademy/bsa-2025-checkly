const ErrorMessage = {
	AUTHENTICATION_FAILED: "Authentication failed.",
	AUTHORIZATION_HEADER_MISSING: "Authorization header is missing or invalid.",
	PLAN_NOT_FOUND: "Plan does not exist",
	PLAN_REGENERATION_FAILED: "Failed to regenerate plan",
	UNAUTHORIZED_ACCESS: "Unauthorized access",
	USER_NOT_FOUND: "User not found.",
} as const;

export { ErrorMessage };
