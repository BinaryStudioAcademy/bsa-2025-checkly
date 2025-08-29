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

const PLAN_PDF_EXPORT_HTTP_HEADERS = {
	"Accept":
		"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
	"Accept-Encoding": "gzip, deflate, br",
	"Accept-Language": "en-US,en;q=0.9",
	"Connection": "keep-alive",
	"Sec-Fetch-Dest": "document",
	"Sec-Fetch-Mode": "navigate",
	"Sec-Fetch-Site": "none",
	"Sec-Fetch-User": "?1",
	"Upgrade-Insecure-Requests": "1",
	"User-Agent":
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
} as const;

const DEFAULT_IMAGE = {
	HEIGHT: 1080,
	SCALE: 1,
	WIDTH: 1920,
} as const;

export {
	DEFAULT_IMAGE,
	PLAN_PDF_EXPORT_ERRORS,
	PLAN_PDF_EXPORT_HTTP_HEADERS,
	PLAN_PDF_EXPORT_NETWORK_IDLES,
	PLAN_PDF_EXPORT_ROUTES,
	PLAN_PDF_EXPORT_SELECTORS,
	PLAN_PDF_EXPORT_TIMEOUTS,
};
