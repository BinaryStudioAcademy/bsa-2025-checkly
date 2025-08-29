import { type GroupBase, type StylesConfig } from "react-select";
import { type ExecutionTimeTypeValue } from "shared";

type TimeOption = {
	label: string;
	value: ExecutionTimeTypeValue;
};

const timeSelectStyles: StylesConfig<
	TimeOption,
	false,
	GroupBase<TimeOption>
> = {
	control: (provided, state) => ({
		...provided,
		"&:hover": {
			borderColor: "var(--color-bg-dark)",
		},
		backgroundColor: "var(--color-bg-light)",
		border: "none",
		borderRadius: "var(--radius-s)",
		boxShadow: state.isFocused
			? "0 0 0 3px var(--color-text-secondary)"
			: "none",
		cursor: "pointer",
		fontFamily: "var(--font-family-onest)",
		fontSize: "var(--text-caption)",
		fontWeight: "var(--font-weight-semi-bold)",
		minHeight: "auto",
		minWidth: "7rem",
		transition: "all 0.15s ease",
	}),
	dropdownIndicator: (provided) => ({
		...provided,
		"&:hover": {
			color: "var(--color-text-primary)",
		},
		color: "var(--color-bg-dark)",
		padding: "0 var(--space-2xs)",
		width: "auto",
	}),
	indicatorSeparator: () => ({
		display: "none",
	}),
	menu: (provided) => ({
		...provided,
		backgroundColor: "var(--color-bg-light)",
		borderRadius: "var(--radius-s)",
		fontFamily: "var(--font-family-onest)",
		fontSize: "var(--text-caption)",
		fontWeight: "var(--font-weight-semi-bold)",
		marginTop: "-2px",
		zIndex: 1000,
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
			fontFamily: "var(--font-family-onest)",
			fontSize: "var(--text-caption)",
			fontWeight: "var(--font-weight-semi-bold)",
			padding: "var(--space-3xs) var(--space-xs)",
		};
	},
	singleValue: (provided) => ({
		...provided,
		color: "inherit",
		fontFamily: "var(--font-family-onest)",
		fontSize: "var(--text-caption)",
		fontWeight: "var(--font-weight-semi-bold)",
	}),
	valueContainer: (provided) => ({
		...provided,
		padding: "var(--space-3xs) var(--space-2xs)",
	}),
};

export { timeSelectStyles };
