const PLAN_PDF_EXPORT_TIMEOUTS = {
	API_CALL: 2000,
	PAGE_LOAD: 3000,
	PDF_GENERATION: 30_000,
	SELECTOR: 5000,
} as const;

const PLAN_PDF_EXPORT_SELECTORS = {
	ALTERNATIVE: ["section", ".container"],
	PRINT_CONTAINER: "#print-container",
} as const;

const PLAN_PDF_EXPORT_NETWORK_IDLES = {
	IDLE_0: "networkidle0",
} as const;

const PLAN_PDF_EXPORT_ERRORS = {
	CONTAINER_NOT_FOUND:
		"Unable to find the plan content on the page. Please try again.",
	PDF_GENERATION: "Failed to generate PDF. Please try again later.",
} as const;

const PLAN_PDF_EXPORT_ROUTES = {
	PLAN_STYLE_PRINT: "/plan-style-print",
	ROOT: "/",
} as const;

const DEFAULT_IMAGE = {
	HEIGHT: 1080,
	SCALE: 1,
	WIDTH: 1920,
} as const;

export {
	DEFAULT_IMAGE,
	PLAN_PDF_EXPORT_ERRORS,
	PLAN_PDF_EXPORT_NETWORK_IDLES,
	PLAN_PDF_EXPORT_ROUTES,
	PLAN_PDF_EXPORT_SELECTORS,
	PLAN_PDF_EXPORT_TIMEOUTS,
};
