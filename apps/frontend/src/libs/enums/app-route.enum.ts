const AppRoute = {
	CHOOSE_STYLE: "/choose-style",
	DASHBOARD: "/dashboard",
	FORGOT_PASSWORD: "/forgot-password",
	LOGOUT: "/logout",
	NOT_FOUND: "*",
	OVERVIEW_PAGE: "/plan-style-overview",
	PLAN: "/plan",
	PLAN_GENERATION: "/plan/generation",
	PLAN_STYLE_PRINT: "/plan-style-print",
	PROFILE: "/dashboard/profile",
	QUIZ: "/quiz",
	QUIZ_QUESTIONS: "/quiz/questions",
	RESET_PASSWORD: "/reset-password",
	ROOT: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	TEST_PAGE: "/test-page",
} as const;

export { AppRoute };
