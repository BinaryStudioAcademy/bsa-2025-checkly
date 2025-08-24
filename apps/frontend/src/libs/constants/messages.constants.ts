const MESSAGES = {
	AUTH: {
		LOGOUT_FAILED: "Logout failed. Please try again.",
		NOT_AUTHENTICATED: "You must be signed in to download the plan.",
	},
	DOWNLOAD: {
		CLEANUP_FAILED: "Error restoring original state after download.",
		FAILED: "Download failed",
		NO_PLAN_FOUND: "No plan content found to download",
		NOT_AVAILABLE: "Download not available for",
		SUCCESS: "Download Successful",
	},
	FEATURE: {
		COMING_SOON: "Format will be available soon",
		NOT_IMPLEMENTED: "It will be implemented later",
	},
	NAVIGATION: {
		FAILED: "Navigation failed. Please try again.",
	},
} as const;

export { MESSAGES };
