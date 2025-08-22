const AuthApiPath = {
	FORGOT_PASSWORD: "/forgot-password",
	ME: "/me",
	RESET_PASSWORD: "/reset-password",
	ROOT: "/",
	SIGN_IN: "/login",
	SIGN_UP: "/register",
	VERIFY_TOKEN: "/verify-token",
} as const;

export { AuthApiPath };
