const CSS_VARIABLES = {
	PLAN_STYLE_WITH_REMARKS_BG: "--color-bg-plan-style-with-remarks",
} as const;

const PRINT_STYLE_TEMPLATE = `
	#print-container {
		background: var(${CSS_VARIABLES.PLAN_STYLE_WITH_REMARKS_BG}, #f7e9ce);
	}

	@media print {
		@page {
			background: var(${CSS_VARIABLES.PLAN_STYLE_WITH_REMARKS_BG}, #f7e9ce);
		}

		#print-container {
			position: static;
			inset: auto;
			display: block;
			place-items: unset;
			width: auto;
			min-height: auto;
			overflow: visible;
			padding: 25px;
		}

		#print-container .desktop-view {
			position: static;
			width: auto;
			height: auto;
			min-height: auto;
			margin: 0;
			transform: none;
		}
	}
`;

export { PRINT_STYLE_TEMPLATE };
