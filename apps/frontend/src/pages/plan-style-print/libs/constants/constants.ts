const CSS_VARIABLES = {
	PLAN_STYLE_WITH_REMARKS_BG: "--color-bg-plan-style-with-remarks",
} as const;

const PRINT_STYLE_TEMPLATE = `
	@media print {
		@page {
			background: var(${CSS_VARIABLES.PLAN_STYLE_WITH_REMARKS_BG}, #f7e9ce);
		}
	}
`;

export { CSS_VARIABLES, PRINT_STYLE_TEMPLATE };
