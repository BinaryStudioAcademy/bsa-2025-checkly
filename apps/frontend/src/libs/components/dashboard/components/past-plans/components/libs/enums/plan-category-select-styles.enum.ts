import { type GroupBase, type StylesConfig } from "react-select";

import { type CategoryOption } from "../../../libs/types/types.js";

const planCategorySelectStyles: StylesConfig<
	CategoryOption,
	false,
	GroupBase<CategoryOption>
> = {
	control: (provided, state) => ({
		...provided,
		"&:hover": {
			borderColor: "var(--color-bg-dark)",
		},
		"@media (width >= 768px)": {
			padding: "calc(var(--space-xs) * 0.5) var(--space-xs)",
		},
		backgroundColor: "var(--color-bg-light)",
		border: "2px solid var(--color-bg-dark)",
		borderRadius: "var(--radius-s)",
		boxShadow: state.isFocused ? "0 0 0 4px var(--color-brand-muted)" : "none",
		cursor: "pointer",
		fontFamily: "inherit",
		fontSize: "inherit",
		fontWeight: "var(--font-weight-regular)",
		minHeight: "auto",
		padding: "0 var(--space-xs)",
		transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
		width: "100%",
	}),
	menu: (provided) => ({
		...provided,
		backgroundColor: "var(--color-bg-light)",
		border: "2px solid var(--color-bg-dark)",
		borderRadius: "var(--radius-s)",
	}),
	option: (provided, state) => {
		const getBackgroundColor = (): string => {
			if (state.isSelected) {
				return "var(--color-brand-muted)";
			} else if (state.isFocused) {
				return "var(--color-card-gray)";
			}

			return "transparent";
		};

		return {
			...provided,
			backgroundColor: getBackgroundColor(),
			color: "inherit",
			cursor: "pointer",
		};
	},
	singleValue: (provided) => ({
		...provided,
		color: "inherit",
	}),
};

export { planCategorySelectStyles };
